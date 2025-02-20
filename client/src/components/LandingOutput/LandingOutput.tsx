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
  if (!output) {
    return (
      <p className="text-gray-500 text-center text-lg">
        El contenido generado aparecerá aquí...
      </p>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
      {/* Imagen generada */}
      {image && (
        <div className="w-full overflow-hidden rounded-md">
          <img
            src={image}
            alt="Generated"
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Contenido generado */}
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold text-blue-600">{input}</h1>
        <p className="mt-2 text-gray-700 leading-relaxed">{output}</p>
      </div>

      {/* Botón de acción principal */}
      <div className="mt-4 flex justify-center">
        <a
          href="#"
          className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Más Información
        </a>
      </div>

      {/* Acciones secundarias */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handleSaveLanding}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
        >
          Guardar
        </button>
        <button
          onClick={handleExportHTML}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          Exportar HTML
        </button>
      </div>
    </div>
  );
};
