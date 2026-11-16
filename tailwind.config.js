/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: "#EFCBBD",
        cream: "#FCF5F1",
        ink: "#222222",
        term: {
          bg: "#0B0B0C",
          chrome: "#2A2A2C",
          text: "#E6E6E6",
          muted: "#8A8A8E",
          red: "#E5534B",
          green: "#57C454",
          cyan: "#56D4DD",
          purple: "#A68BF4",
          salmon: "#F08D78",
          yellow: "#F2D25C",
          link: "#4FA3C4",
        },
      },
      backgroundImage: {
        "gio-smile-large": "url('/gio-smile-591x734.png')",
      },
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        titillium: ["Titillium Web", "sans-serif"],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "scroll-cue": "scroll-cue 2s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "translate-z": (value) => ({
            "--tw-translate-z": value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme("translate"), supportsNegativeValues: true },
      );
    }),
  ],
};
