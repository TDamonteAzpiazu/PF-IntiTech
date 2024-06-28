import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'custom-radial': 'radial-gradient(circle at 5% 5%, #FFED00, transparent 40%), radial-gradient(circle at 100% 110%, #FFED00, transparent 40%)'
      },
      colors: {
        'yellowinti':'#ffed00',
        'lightorangeinti':'#f7a90e',
        'orangeinti':'#e18104',
        'yellowcustom': '#F7A90E',
      },
      backgroundSize: {
        'size-200': '115%',
      },
    },
  },
  plugins: [],
};
export default config;
