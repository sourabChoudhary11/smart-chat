//  @type {import('tailwindcss').Config} 
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens:{
      xs: "380px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      '2xl': "1536px",
    },

    extend: {
      border: {
        "border-1": "1px"
      },
      boxShadow: {
        '3xl': '0 10px 20px 0px rgb(115, 124, 129)',
      }
    },
  },
  plugins: [],
};
