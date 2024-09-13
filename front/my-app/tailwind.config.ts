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
        'custom-radial': 'radial-gradient(circle at 5% 5%, #FFED00, transparent 40%), radial-gradient(circle at 100% 110%, #FFED00, transparent 40%)',
        'custom-image': "url('../../public/images/background.jpg')",
        'custom-ratiant': 'linear-gradient(to left, #f7a90e, #fbba02, #feca00, #ffdc00, #ffed00);',
        'gradient-to-bottom': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(14, 14, 14, 0))',
      },
      colors: {
        'yellowinti': '#ffed00',
        'lightorangeinti': '#f7a90e',
        'orangeinti': '#e18104',
        'yellowcustom': '#F7A90E',
        'nose': '#F4F2EE',
      },
      backgroundSize: {
        'size-200': '120%',
        'size-400': '400%',
      },
      boxShadow: {
        'custom': '0px 10px 35px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;
