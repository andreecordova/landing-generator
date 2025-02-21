import { useEffect, useState } from "react";
import { generateLandingContent, generateImage } from "../api/openai";
import { api } from "../api/api";

interface Landing {
  _id: string;
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

  const fetchLandings = async () => {
    try {
      const res = await api.get("/landings");
      console.log({
        res,
      });

      setSavedLandings(res.data); // Guardar en el estado
    } catch (error) {
      console.error("Error al obtener las landings:", error);
    }
  };

  // Cargar landings al montar el componente
  useEffect(() => {
    fetchLandings();
  }, []);

  console.log(savedLandings, "savedLandings");

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

    const newLanding = {
      _id: Date.now().toString(),
      title: input,
      content: content || "No se pudo generar contenido.",
      image: imgUrl,
    };

    setSavedLandings((prevLandings) => [newLanding, ...prevLandings]);

    console.log(imgUrl, "imgurl");
    setImage(imgUrl);

    setLoading(false);
  };

  // Ahora usarla es más limpio y corto:
  const handleSaveLanding = async () => {
    try {
      const res = await api.post("/landings", {
        prompt: input,
        content: output,
        image,
      });
      console.log(res, "res");
    } catch (error) {
      console.log("Error al guardar la landing:", error);
    }
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
