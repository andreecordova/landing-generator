import { useState } from "react";
import { generateLandingContent, generateImage } from "../api/openai";

interface Landing {
  title: string;
  content: string;
  image: string;
}

export const useLandingGeneratorHook = () => {
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

  return {
    input,
    output,
    image,
    savedLandings,
    loading,

    setInput,
    handleGenerate,
    handleSaveLanding,
    handleExportHTML,
  };
};
