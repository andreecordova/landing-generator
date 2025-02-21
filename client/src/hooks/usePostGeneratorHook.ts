import { useRef, useState } from "react";
import { generatePostsForIG } from "../api/openai";
import { createStore } from "polotno/model/store";
import { unprotect } from "mobx-state-tree";

export const usePostGeneratorHook = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Creación del store con Polotno
  const storeRef = useRef(
    (() => {
      const store = createStore({
        key: import.meta.env.STORE_KEY,
        showCredit: true,
      });
      unprotect(store);
      return store;
    })()
  );

  const store = storeRef.current;

  // Manejar la generación de posts
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newPosts = await generatePostsForIG(userPrompt);
      setPosts(newPosts);
    } catch (error) {
      console.error("Error generando posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para abrir el editor con un post seleccionado
  const openEditorForPost = (post: any) => {
    console.log("Abriendo editor...");
    store.pages.replace([]);

    post.pages.forEach((pageData: any) => {
      store.addPage();
      const currentPage = store.activePage;

      if (pageData.design?.backgroundColor) {
        currentPage.addElement({
          type: "figure",
          subType: "rect",
          x: 0,
          y: 0,
          width: 1080,
          height: 1080,
          fill: pageData.design.backgroundColor,
          selectable: false,
        });
      }

      const titleText = pageData.title || "Título por defecto";
      currentPage.addElement({
        type: "text",
        text: titleText,
        x: 200,
        y: 200,
        fontSize: 48,
        fill: pageData.design?.textColor || "#000",
        width: 800,
      });
    });

    setSelectedPost(post);
  };

  return {
    store,
    loading,
    posts,
    handleGenerate,
    userPrompt,
    setUserPrompt,
    selectedPost,
    setSelectedPost,
    openEditorForPost,
  };
};
