import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Bienvenido al Generador de Landings
      </h1>

      <nav className="space-x-4">
        <NavLink
          to="/generator"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`
          }
        >
          Generador de Landings
        </NavLink>
        <NavLink
          to="/post-generator"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`
          }
        >
          Generador de Posts para redes sociales
        </NavLink>
      </nav>
    </div>
  );
};

export default Home;
