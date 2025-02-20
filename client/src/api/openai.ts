import OpenAI from "openai";
import { defaultPrompt } from "../constants/postsPrompt";

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


export const generatePostsForIG = async (userPrompt: string, setPosts: any, setLoading: any) => {
  const prompt = userPrompt.trim() !== "" ? userPrompt : defaultPrompt;
  setLoading(true);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "user", content: defaultPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log(data, "data");

    if (!response.ok) throw new Error(data.error?.message || "Error en OpenAI");

    if (data.choices && data.choices.length > 0) {
      const generatedText = data.choices[0].message.content;
      let jsonResponse;

      try {
        let jsonString = generatedText.trim();
        if (jsonString.startsWith("```json")) {
          jsonString = jsonString.substring("```json".length).trim();
          if (jsonString.endsWith("```")) {
            jsonString = jsonString.substring(0, jsonString.length - 3).trim();
          }
        }
        jsonResponse = JSON.parse(jsonString);
      } catch (e) {
        console.error("Error parseando JSON:", e);
        jsonResponse = { posts: [{ text: generatedText }] };
      }

      if (jsonResponse.posts && jsonResponse.posts.length > 0) {
        setPosts(jsonResponse.posts);
      }
    }
  } catch (error) {
    console.error("Error generando los posts:", error);
  } finally {
    setLoading(false);
  }
};
