import type { Config } from "tailwindcss";



const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(red, red)',
      }),
      backgroundSize: {
        'size-3px': '100% 3px',
      },
      colors: {
        primary: '#1DB954',
        background: '#121212',
        onBackground: '#1F2937'
      },
      grayscale: {
        '10': '10%',
        '20': '20%',
        '30': '30%',
        '40': '40%',
        '50': '50%',
        '60': '60%',
        '70': '70%',
        '80': '80%',
        '90': '90%',
      },
    },
  },
  plugins: [],
};
export default config;
