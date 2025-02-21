import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface Props {
  input: string;
  loading: boolean;
  setInput: (value: React.SetStateAction<string>) => void;
  handleGenerate: () => Promise<void>;
}

export const Generator: React.FC<Props> = ({
  input,
  loading,
  setInput,
  handleGenerate,
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Generador de Landing Pages
        </h1>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tema de la landing..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className={styles.content_generator_buttons}>
            <div className="flex justify-center">
              <Link
                to="/"
                className={`${styles.content_generator_button_goback} px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all`}
              >

                Volver al Inicio
              </Link>
            </div>

            <button
              onClick={handleGenerate}
              className={`${styles.content_generator_button_save} w-full p-3 rounded-lg text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Generando..." : "Generar"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
