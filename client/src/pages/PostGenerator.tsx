import { observer } from "mobx-react-lite";
import { PolotnoEditor } from "../components/PolotnoEditor";
import { usePostGeneratorHook } from "../hooks";
import styles from "./styles/PostGenerator.module.css";
import { Link } from "react-router-dom";
const PostGenerator = observer(() => {
  const {
    posts,
    userPrompt,
    setUserPrompt,
    loading,
    setSelectedPost,
    selectedPost,
    handleGenerate,
    store,
    openEditorForPost,
  } = usePostGeneratorHook();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-lg bg-white p-6 shadow-lg rounded-lg'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
            Generador de post para redes sociales
          </h1>
          

          {posts?.length === 0 ? (
            <div className='flex flex-col gap-3'>
              <input
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                type='text'
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder='Ingresa el tema de tus posts'
              />
              <button
                onClick={handleGenerate}
                className={`w-full p-3 rounded-lg text-white transition-all ${styles.content_generator_button_generator} ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? "Generando..." : "Generar posts"}
              </button>
            </div>
          ) : (
            <div>
              {posts?.map((post: any, index: any) => {
                console.log({ post });
                return (
                  <div
                    key={index}
                    className={styles.card}
                    onClick={() => openEditorForPost(post)}
                  >
                    <h3 className={styles.title}>{post?.pages[0]?.title}</h3>
                    <p className={styles.description}>
                      {post?.pages[0]?.description}
                    </p>
                    <div>
                    <button
                      className={`${styles.content_generator_button_save} w-full p-3 rounded-lg text-white transition-all`}
                      disabled={loading}
                    >
                      Editar post
                    </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {selectedPost && (
            <PolotnoEditor
              store={store}
              onClose={() => setSelectedPost(null)}
            />
          )}

          <div className='flex mt-4'>
            <Link
              to='/'
              className={`${styles.content_generator_button_goback} px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all`}
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostGenerator;
