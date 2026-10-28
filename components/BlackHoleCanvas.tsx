"use client";

import { useEffect, useRef, useState } from "react";

// The step 6 shader from github.com/abzakir/blackhole (docs/demo), trimmed to the
// starfield sky and full redshift + Doppler colours. u_center moves the hole on screen.
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_center;
uniform vec3 u_camPos;
uniform vec3 u_camRight;
uniform vec3 u_camUp;
uniform vec3 u_camForward;
uniform float u_tanHalfFov;
uniform float u_time;

const float RS = 1.0;
const float ESCAPE_R = 1000.0;
const float STEP_SCALE = 0.05;
const int MAX_STEPS = 1000;

const float DISK_IN = 3.0;
const float DISK_OUT = 12.0;
const float DISK_PEAK_T = 4500.0;
const float EXPOSURE = 0.9;
const float TIME_SCALE = 4.0;

vec3 acceleration(vec3 x, float h2) {
    float r2 = dot(x, x);
    return -1.5 * RS * h2 * x / (r2 * r2 * sqrt(r2));
}

void rk4Step(inout vec3 x, inout vec3 v, float h2, float dt) {
    vec3 k1x = v;
    vec3 k1v = acceleration(x, h2);
    vec3 k2x = v + 0.5 * dt * k1v;
    vec3 k2v = acceleration(x + 0.5 * dt * k1x, h2);
    vec3 k3x = v + 0.5 * dt * k2v;
    vec3 k3v = acceleration(x + 0.5 * dt * k2x, h2);
    vec3 k4x = v + dt * k3v;
    vec3 k4v = acceleration(x + dt * k3x, h2);
    x += dt / 6.0 * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
    v += dt / 6.0 * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);
}

float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
                   mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
               mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
                   mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
}

float clouds(vec3 p) {
    float sum = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; ++i) {
        sum += amplitude * noise(p);
        p *= 2.03;
        amplitude *= 0.5;
    }
    return sum;
}

vec3 stars(vec3 dir) {
    vec3 color = vec3(0.0);
    for (int layer = 0; layer < 4; ++layer) {
        vec3 cell = floor(dir * (25.0 + 20.0 * float(layer)));
        vec3 seed = cell + 17.0 * float(layer);
        if (hash(seed) > 0.8) {
            vec3 star = cell + 0.5 + 0.5 * (vec3(hash(seed + 1.7), hash(seed + 4.3), hash(seed + 9.1)) - 0.5);
            float angle = length(dir - normalize(star));
            float brightness = 0.12 + 2.5 * pow(hash(seed + 7.7), 8.0);
            vec3 tint = mix(vec3(1.0, 0.78, 0.6), vec3(0.7, 0.82, 1.0), hash(seed + 3.1));
            color += tint * brightness * exp(-angle * angle * 3.0e5);
        }
    }
    return color;
}

vec3 galaxy(vec3 dir) {
    float height = dot(dir, normalize(vec3(0.0, 1.0, 0.45)));
    float glow = exp(-height * height / 0.02) * (0.3 + 0.9 * clouds(dir * 6.0));
    float dust = exp(-height * height / 0.002) * smoothstep(0.4, 0.7, clouds(dir * 12.0 + 3.0));
    return vec3(0.55, 0.5, 0.7) * 0.4 * glow * (1.0 - 0.85 * dust);
}

vec3 blackbody(float kelvin) {
    float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
    vec3 color;
    color.r = t <= 66.0 ? 1.0 : 1.2929 * pow(t - 60.0, -0.1332);
    color.g = t <= 66.0 ? 0.3901 * log(t) - 0.6318 : 1.1299 * pow(t - 60.0, -0.0755);
    color.b = t >= 66.0 ? 1.0 : (t <= 19.0 ? 0.0 : 0.5432 * log(t - 10.0) - 1.1963);
    return clamp(color, 0.0, 1.0);
}

float temperatureProfile(float r) {
    float x = DISK_IN / r;
    return pow(x, 0.75) * pow(1.0 - sqrt(x), 0.25) / 0.4878;
}

float frequencyShift(float r, float ell, float camF) {
    float uT = 1.0 / sqrt(1.0 - 1.5 * RS / r);
    float omega = sqrt(0.5 * RS / (r * r * r));
    return 1.0 / (sqrt(camF) * uT * (1.0 - omega * ell));
}

vec4 diskLight(vec3 p, float ell, float camF) {
    float r = length(p);
    if (r < DISK_IN || r > DISK_OUT) {
        return vec4(0.0);
    }
    float omega = sqrt(0.5 * RS / (r * r * r));
    float angle = atan(p.z, p.x) + omega * u_time * TIME_SCALE;
    float swirl = clouds(vec3(2.0 * cos(angle), 2.0 * sin(angle), 4.0 * r));

    float g = frequencyShift(r, ell, camF);
    float seenT = DISK_PEAK_T * temperatureProfile(r) * g;
    float brightness = pow(seenT / DISK_PEAK_T, 4.0) * (0.45 + 1.1 * swirl);
    vec3 light = blackbody(seenT) * brightness * EXPOSURE;

    float edges = smoothstep(DISK_IN, DISK_IN + 0.3, r) * smoothstep(DISK_OUT, DISK_OUT - 4.0, r);
    float opacity = edges * clamp(0.35 + 0.8 * swirl, 0.0, 1.0);
    return vec4(light * opacity, opacity);
}

vec3 toneMap(vec3 c) {
    return clamp(c * (2.51 * c + 0.03) / (c * (2.43 * c + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y - u_center;
    vec3 dir = normalize(u_camForward + u_tanHalfFov * (uv.x * u_camRight + uv.y * u_camUp));

    vec3 x = u_camPos;
    vec3 radial = normalize(x);
    float camF = 1.0 - RS / length(x);
    vec3 v = normalize(dir + (sqrt(camF) - 1.0) * dot(dir, radial) * radial);
    vec3 angular = cross(x, v);
    float h2 = dot(angular, angular);

    float vr = dot(v, radial);
    float energy = sqrt(vr * vr + camF * h2 / dot(x, x));
    float ell = -angular.y / energy;

    vec3 color = vec3(0.0);
    float transmittance = 1.0;
    bool escaped = false;
    for (int i = 0; i < MAX_STEPS; ++i) {
        float r = length(x);
        if (r < RS) {
            break;
        }
        if (r > ESCAPE_R && dot(x, v) > 0.0) {
            escaped = true;
            break;
        }
        vec3 before = x;
        rk4Step(x, v, h2, STEP_SCALE * r / length(v));

        if (before.y * x.y < 0.0) {
            vec3 hit = mix(before, x, before.y / (before.y - x.y));
            vec4 disk = diskLight(hit, ell, camF);
            color += transmittance * disk.rgb;
            transmittance *= 1.0 - disk.a;
            if (transmittance < 0.01) {
                break;
            }
        }
    }

    if (escaped) {
        vec3 skyDir = normalize(v);
        color += transmittance * (galaxy(skyDir) + stars(skyDir));
    }
    gl_FragColor = vec4(toneMap(color), 1.0);
}
`;

const VERTEX = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FOV_Y = (60 * Math.PI) / 180;

function clamp(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value));
}

function normalize(v: number[]) {
  const length = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / length, v[1] / length, v[2] / length];
}

function cross(a: number[], b: number[]) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

type Props = {
  className?: string;
  // 0 at the top of the page, 1 once the hero has scrolled away. The camera falls in as it grows.
  progress?: { get(): number };
};

export default function BlackHoleCanvas({ className = "", progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        throw new Error(gl!.getShaderInfoLog(shader) || "shader compile failed");
      }
      return shader;
    }

    const program = gl.createProgram()!;
    try {
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "link failed");
      }
    } catch (error) {
      console.warn("Black hole shader unavailable:", error);
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    // One triangle that covers the whole screen.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      resolution: u("u_resolution"),
      center: u("u_center"),
      camPos: u("u_camPos"),
      camRight: u("u_camRight"),
      camUp: u("u_camUp"),
      camForward: u("u_camForward"),
      tanHalfFov: u("u_tanHalfFov"),
      time: u("u_time"),
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const camera = { azimuth: 0.6, elevation: 0.12 };
    const look = { x: 0, y: 0, tx: 0, ty: 0 };
    let simTime = 8;
    let dirty = true;
    let dragging = false;

    const maxPixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    let renderScale = finePointer ? 0.65 : 0.45;
    let wide = true;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      wide = rect.width / Math.max(rect.height, 1) > 1.1;
      const width = Math.max(1, Math.round(rect.width * maxPixelRatio * renderScale));
      const height = Math.max(1, Math.round(rect.height * maxPixelRatio * renderScale));
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }
      dirty = true;
    }

    function draw() {
      const p = progress ? clamp(progress.get(), 0, 1) : 0;
      const eased = p * p * (3 - 2 * p);
      const distance = 21 - 9 * eased;
      const azimuth = camera.azimuth + look.x * 0.22;
      const elevation = clamp(camera.elevation + look.y * 0.1 + eased * 0.18, -1.4, 1.4);

      const position = [
        distance * Math.cos(elevation) * Math.cos(azimuth),
        distance * Math.sin(elevation),
        distance * Math.cos(elevation) * Math.sin(azimuth),
      ];
      const forward = normalize([-position[0], -position[1], -position[2]]);
      const right = normalize(cross(forward, [0, 1, 0]));
      const up = cross(right, forward);

      const aspect = canvas!.width / canvas!.height;
      const center = wide ? [aspect * 0.4, 0.2] : [0, 0.3];

      gl!.uniform2f(uniforms.resolution, canvas!.width, canvas!.height);
      gl!.uniform2f(uniforms.center, center[0], center[1]);
      gl!.uniform3fv(uniforms.camPos, position);
      gl!.uniform3fv(uniforms.camRight, right);
      gl!.uniform3fv(uniforms.camUp, up);
      gl!.uniform3fv(uniforms.camForward, forward);
      gl!.uniform1f(uniforms.tanHalfFov, Math.tan(FOV_Y / 2));
      gl!.uniform1f(uniforms.time, simTime);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let raf = 0;
    let running = false;
    let lastTime: number | null = null;
    let lastProgress = -1;
    let windowStart: number | null = null;
    let windowFrames = 0;
    let fastWindows = 0;
    let firstFrame = true;

    function frame(now: number) {
      if (!running) return;
      const dt = lastTime === null ? 0 : Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (!reduceMotion) {
        simTime += dt;
        if (!dragging) camera.azimuth += dt * 0.035;
        look.x += (look.tx - look.x) * Math.min(1, dt * 3);
        look.y += (look.ty - look.y) * Math.min(1, dt * 3);
        dirty = true;
      }
      const p = progress ? progress.get() : 0;
      if (p !== lastProgress) {
        lastProgress = p;
        dirty = true;
      }

      if (dirty) {
        draw();
        dirty = false;
        if (firstFrame) {
          firstFrame = false;
          setReady(true);
        }
      }

      // Every half second, trade resolution for frame rate (same idea as the demo).
      windowFrames++;
      if (windowStart === null) {
        windowStart = now;
      } else if (now - windowStart >= 500 && !reduceMotion) {
        const fps = (windowFrames * 1000) / (now - windowStart);
        windowStart = now;
        windowFrames = 0;
        if (fps < 40 && renderScale > 0.3) {
          renderScale = Math.max(0.3, renderScale * 0.8);
          fastWindows = 0;
          resize();
        } else if (fps > 57 && renderScale < 0.9) {
          if (++fastWindows >= 4) {
            renderScale = Math.min(0.9, renderScale * 1.1);
            fastWindows = 0;
            resize();
          }
        } else {
          fastWindows = 0;
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      lastTime = null;
      windowStart = null;
      windowFrames = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    observer.observe(canvas);

    function onVisibility() {
      if (document.hidden) stop();
      else if (visible) start();
    }
    document.addEventListener("visibilitychange", onVisibility);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Drag to orbit. Vertical touch drags stay page scrolls (touch-action: pan-y).
    let lastX = 0;
    let lastY = 0;
    function onDown(event: PointerEvent) {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas!.setPointerCapture(event.pointerId);
      canvas!.dataset.dragging = "true";
    }
    function onMove(event: PointerEvent) {
      if (!dragging) return;
      camera.azimuth += 0.005 * (event.clientX - lastX);
      camera.elevation = clamp(camera.elevation + 0.004 * (event.clientY - lastY), -1.2, 1.2);
      lastX = event.clientX;
      lastY = event.clientY;
      dirty = true;
    }
    function onUp() {
      dragging = false;
      delete canvas!.dataset.dragging;
    }
    function onWindowMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      look.tx = event.clientX / window.innerWidth - 0.5;
      look.ty = event.clientY / window.innerHeight - 0.5;
    }
    function onContextLost(event: Event) {
      event.preventDefault();
      stop();
      setFailed(true);
    }

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("webglcontextlost", onContextLost);
    if (finePointer && !reduceMotion) window.addEventListener("pointermove", onWindowMove);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("pointermove", onWindowMove);
    };
  }, [progress]);

  if (failed) {
    return (
      <div className={`${className} overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/blackhole/step6.png"
          alt="A black hole with a glowing accretion disk, rendered by my ray tracer"
          className="h-full w-full object-cover object-[50%_60%] opacity-80"
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-label="A black hole with an accretion disk, ray-traced live. Drag to orbit."
      role="img"
      className={`${className} cursor-grab touch-pan-y transition-[opacity,transform,filter] duration-[1800ms] ease-out data-[dragging=true]:cursor-grabbing ${
        ready ? "scale-100 opacity-100 blur-0" : "scale-[1.06] opacity-0 blur-md"
      }`}
    />
  );
}
