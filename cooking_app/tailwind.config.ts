import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        babypowder: '#FCFBF5',
        cornsilk: '#FDF8E1',
        peach: '#FFE5BA',     // xanthousの薄いやつ
        xanthous: '#FFC971',
        xanthoussaturated: '#FFBA4A',   // xanthousの濃いやつ
        selectiveyellow: '#FFB600',
        harverstgold: '#E8A600',
        princetonorange: '#FF9505',
        orangewheel: '#FF7E05',  // princetonorangeの濃いやつ
        smokyblack: '#211400'
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
export default config;
