import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          900: '#1F120C',
          800: '#2C1A11',
          700: '#3D2518',
          600: '#4E3222',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#D9BC86',
          dark: '#A07D3D',
        },
        teal: {
          DEFAULT: '#1E3A4C',
          dark: '#132833',
          light: '#2A5066',
        },
        cream: {
          DEFAULT: '#F5F0E6',
          dark: '#E6DCC8',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wood-pattern': "url('data:image/svg+xml,%3Csvg width=\\'200\\' height=\\'200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.6\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noise)\\' opacity=\\'0.08\\'/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}

export default config
