/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /** The one accent color. Everything else is white or black. */
        primary: colors.emerald[600],
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
