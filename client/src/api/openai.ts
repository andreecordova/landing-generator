import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Necesario si se usa en frontend
});

export const generateLandingContent = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // O usa "gpt-4-turbo" si prefieres, pero este es de pago
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    return (
      response?.choices?.[0]?.message?.content?.trim() ||
      "No se generó contenido."
    );
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error al generar contenido.";
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data[0].url ?? "";
  } catch (error) {
    console.error("Error generating image:", error);
    return "";
  }
};
