import React from "react";

interface Props {
  output: string;
  image: string;
  input: string;
  handleSaveLanding: () => void;
  handleExportHTML: () => void;
}

export const LandingOutput: React.FC<Props> = ({
  output,
  image,
  input,
  handleSaveLanding,
  handleExportHTML,
}) => {
  return output ? (
    <div className="border p-4 bg-white rounded shadow-lg">
      {image && (
        <img
          src={image}
          alt="Generated"
          className="w-full h-64 object-cover rounded-md"
        />
      )}
      <div className="p-4">
        <h1 className="text-3xl font-bold text-blue-600">{input}</h1>
        <p className="mt-2 text-gray-700">{output}</p>
        <a
          href="#"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full inline-block text-lg shadow-md hover:bg-blue-600"
        >
          Más Información
        </a>
      </div>
      <button
        onClick={handleSaveLanding}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
      <button
        onClick={handleExportHTML}
        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded ml-2"
      >
        Exportar HTML
      </button>
    </div>
  ) : (
    <p className="text-gray-500">El contenido generado aparecerá aquí...</p>
  );
};
