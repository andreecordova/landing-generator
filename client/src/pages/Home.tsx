import { NavLink } from "react-router-dom";
import styles from "./styles/Home.module.css";
import logo from "../assets/logo-asap.svg";
import gifHome from "../assets/gif-asap-template-.gif";

const Home = () => {
  return (
    <div className={`${styles.container_home}`}>
      <div className={`${styles.container_home_left} min-h-screen flex flex-col items-center justify-center p-6`}>
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Bienvenido a
        <img src={logo} alt="logo de asap template" />
      </h1>

      <p className="text-lg font-bold text-gray-600">
        Plantillas rápidas, impacto inmediato.
      </p>

      <h4 className="text-lg font-bold text-gray-600">
        Genera landing de contenido y post para redes sociales de manera rápida y automatizada.
      </h4>

        <nav className="space-x-4 mt-4">
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
            Genera tu Landing
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
            Genera tu Post para redes
          </NavLink>
        </nav>
      </div>
      <div className={`${styles.container_home_rigth}`}>
          <img src={gifHome} alt="gif interactivo de asap template" />
      </div>
    </div>
  );
};

export default Home;
