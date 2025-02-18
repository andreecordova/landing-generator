import { useState } from "react";
import { generateLandingContent, generateImage } from "../api/openai";

interface Landing {
  title: string;
  content: string;
  image: string;
}

const LandingGenerator = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [savedLandings, setSavedLandings] = useState<Landing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);

    const content = await generateLandingContent(
      `Genera una landing page con el tema: ${input}`
    );

    setOutput(content || "No se pudo generar contenido.");

    const imgUrl = await generateImage(
      `Imagen atractiva para una landing page sobre ${input}`
    );

    setImage(imgUrl);

    setLoading(false);
  };

  const handleSaveLanding = () => {
    const newLanding = { title: input, content: output, image };
    setSavedLandings([...savedLandings, newLanding]);
  };

  const handleExportHTML = () => {
    const htmlContent = `<!DOCTYPE html>
      <html lang='es'>
      <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <title>${input}</title>
      <meta name='description' content='${output.substring(0, 150)}'>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { max-width: 800px; margin: auto; text-align: center; }
        img { width: 100%; max-height: 400px; object-fit: cover; }
      </style>
      </head>
      <body>
      <div class='container'>
        <h1>${input}</h1>
        ${image ? `<img src='${image}' alt='Landing Image'>` : ""}
        <p>${output}</p>
        <a href='#' style='display:inline-block; padding:10px 20px; background-color:blue; color:white; text-decoration:none; border-radius:5px;'>Más Información</a>
      </div>
      </body>
      </html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "landing_page.html";
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      <div className="md:w-1/3 bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-2">Generador de Landing Pages</h1>
        <input
          type="text"
          className="w-full p-8 border rounded"
          placeholder="Tema de la landing..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="mt-2 ml-4 w-full bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generando..." : "Generar"}
        </button>
      </div>

      <div className="md:w-2/3 bg-gray-100 p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Previsualización</h2>
        {output ? (
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
          <p className="text-gray-500">
            El contenido generado aparecerá aquí...
          </p>
        )}
      </div>
    </div>
  );
};

export default LandingGenerator;
