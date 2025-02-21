import {   useRef, useState } from "react";
import { generatePostsForIG } from "../api/openai";
import { createStore } from "polotno/model/store";
import { unprotect } from "mobx-state-tree";
// import { api } from "../api/api";

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
  // const savePostInfo = async() =>{ 
    
  //   const json = store.toJSON();
  //   const jsonString = JSON.stringify(json); 
  //   console.log(jsonString, 'jsonString');
  //   try {
  //     const res = await api.post("/posts", { json });
  //     console.log(res,'res')
  //   } catch (error) {
  //     console.log("Error al guardar la landing:", error);
  //   }
  // }
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newPosts = await generatePostsForIG(userPrompt);
      console.log(newPosts,'newposts')
      setPosts(newPosts);
      
    } catch (error) {
      console.error("Error generando posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // const getDataPost = async() => {
  //   try {
  //     const res = await api.get("/");
  //     console.log(res,'res')
  //   } catch (error) {
  //     console.log("Error al guardar la landing:", error);
  //   }
  // }
  // useEffect(() => {
  //   getDataPost()
  // }, [])
  // Función para abrir el editor con un post seleccionado
  const openEditorForPost = (post: any) => {
    console.log("Abriendo editor...");
    console.log(post)
    store.pages.replace([]);
    const canvasWidth = store.width;
    const canvasHeight = store.height;
    console.log({canvasWidth,canvasHeight});
    
    post.pages.forEach((pageData: any) => {
      
      store.addPage();
      const currentPage = store.activePage;
      const widthTitle = parseInt(pageData?.design?.textWidth)
      console.log({widthTitle});
      
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
      post.shapes.forEach((shape: any) => {
        console.log({shape},'test')
        const posX = parseInt(shape?.position?.x, 10)
        const posY = parseInt(shape?.position?.y, 10)
        const height = parseInt(shape?.size?.height, 10)
        const width = parseInt(shape?.size?.width, 10)

        currentPage.addElement({
          type: "figure",
          subType: shape?.type,
          x: posX,
          y: posY,
          width: width,
          height: height,
          selectable: false,
        });
      });
      const titleText = pageData.title || "Título por defecto";
      currentPage.addElement({
        type: "text",
        text: titleText,
        x: (canvasWidth - widthTitle)/2 ,
        y: 200,
        fontSize: 48,
        fill: pageData.design?.textColor || "#000",
        width: widthTitle,
        align:"center"
      });

      const content = pageData.content || "Título por defecto";
      currentPage.addElement({
        type: "text",
        text: content,
        x: (canvasWidth - widthTitle)/2 ,
        y: 350,
        fontSize: 30,
        fill: pageData.design?.textColor || "#000",
        width: widthTitle,
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
