/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_theme: "#111218",
        secondary_theme: "#fff",
        tertiary_color: "#278AE0",
        quaternary_color: "#1777cb",
        txt_light_color: "#7d8ba1"
      },
      screens: {
        "3xl": "1700px",
        "1.5xl": "1450px",
        "extra-sm": "500px",
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
    },
  },
  plugins: [],
};
