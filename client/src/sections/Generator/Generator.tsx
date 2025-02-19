import React from "react";
import { Link } from "react-router-dom";

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
    <div className="w-full bg-white p-4 shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-2 justify-items-center mb-8">
        <h1 className="text-xl font-bold mb-2">Generador de Landing Pages </h1>
        <Link
          to="/"
          className="text-sm mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Volver al Inicio
        </Link>
      </div>

      <input
        type="text"
        className="p-2 border rounded"
        placeholder="Tema de la landing..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar"}
      </button>
    </div>
  );
};
