/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Taken from the accretion disk render: warm black, bone white, ember and galaxy dust.
        ink: {
          DEFAULT: 'var(--ink)',
          raised: 'var(--ink-raised)',
          line: 'var(--ink-line)',
        },
        bone: {
          DEFAULT: 'var(--bone)',
          muted: 'var(--bone-muted)',
          dim: 'var(--bone-dim)',
        },
        ember: {
          DEFAULT: 'var(--ember)',
          soft: 'var(--ember-soft)',
        },
        dust: 'var(--dust)',
        wa: {
          bg: '#0B141A',
          bubble: '#202C33',
          out: '#005C4B',
          green: '#25D366',
        },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
