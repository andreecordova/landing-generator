export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "min-h-screen",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "bg-gray-100",
    "p-6",
    "text-3xl",
    "font-bold",
    "mb-6",
    "space-x-4",
  ], // 🔹 Asegura que estas clases no sean eliminadas
};
