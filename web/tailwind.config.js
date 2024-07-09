/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-background": "#FFF",
        "primary-main": "#3A3888",
        "primary-action-light": "#ECEBFF",
        "primary-light": "#DAD9FF",
        "selected-gray": "#F8F8F8",
        "black-text": "#2A2A2A",
        "gray-text": "#414141",
        "gray-600": "#AFAFAF",

        "dusty-white": "#F8F8F8",
        "light-dusty-white": "#FCFCFC",
        "hover-gray": "#F1F1F1",

        white: "#FFF",
        "tag-light-blue": "#D4EAFF",
        "tag-dark-blue": "#21588B",
        "tag-light-pink": "#FDD5F7",
        "tag-dark-pink": "#9C1C87",
        "tag-light-orange": "#FFE0D6",
        "tag-dark-orange": "#C06614",
        "tag-light-yellow": "#FFF4CD",
        "tag-dark-yellow": "#996E00",
      },
      borderColor: {
        DEFAULT: "#E2E2E2",
      },
      borderWidth: {
        DEFAULT: 0.5,
        1: 1,
      },
      flex: {
        fit: 1,
      },
    },
  },
  plugins: [],
};
