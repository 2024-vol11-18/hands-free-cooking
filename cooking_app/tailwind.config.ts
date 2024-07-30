import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js',
  ],
  safelist: [{ pattern: /^border-/ }, { pattern: /^bg-/ }, { pattern: /^text-/ }],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        primary: colors.blue,
        secondary: colors.slate,
        green: colors.green,
        red: colors.red,
        blue: colors.blue,
        gray: colors.gray,
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
export default config;
