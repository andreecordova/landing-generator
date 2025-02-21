import OpenAI from "openai";
import { defaultPrompt } from "../constants/postsPrompt";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Necesario si se usa en frontend
});

export const generateLandingContent = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // O usa "gpt-3.5-turbo" si prefieres, pero este es de pago
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

export const generatePostsForIG = async (userPrompt: string) => {
  const prompt = userPrompt.trim() || defaultPrompt;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: defaultPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    // Verificar que hay respuestas y que content no es null o undefined
    const messageContent = response.choices?.[0]?.message?.content?.trim();
    if (!messageContent) {
      throw new Error("No se generó contenido válido desde OpenAI.");
    }

    return parseOpenAIResponse(messageContent);
  } catch (error) {
    console.error("Error generando los posts:", error);
    throw error;
  }
};

function parseOpenAIResponse(generatedText: string) {
  try {
    let jsonString = generatedText.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.replace(/^```json|```$/g, "").trim();
    }
    const jsonResponse = JSON.parse(jsonString);
    return jsonResponse.posts ?? [{ text: generatedText }];
  } catch (error) {
    console.error("Error parseando JSON:", error);
    return [{ text: generatedText }];
  }
}
