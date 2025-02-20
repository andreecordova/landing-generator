import { observer } from "mobx-react-lite";
import { PolotnoEditor } from "../components/PolotnoEditor";
import { usePostGeneratorHook } from "../hooks";

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
    <div className='flex flex-col gap-6 p-6 max-w-6xl'>
      <h1>Generador de post para redes sociales</h1>
      {posts?.length === 0 ? (
        <div>
          <input
            type='text'
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder='Ingresa el tema de tus posts'
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generando..." : "Generar posts"}
          </button>
        </div>
      ) : (
        <div>
          {posts?.map((post: any, index: any) => (
            <div
              key={index}
              onClick={() => openEditorForPost(post)}
            >
              <h3>{post?.title || `Post ${index + 1}`}</h3>
              {post.description && <p>{post.description}</p>}
            </div>
          ))}
        </div>
      )}
      {selectedPost && (
        <PolotnoEditor
          store={store}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
});

export default PostGenerator;
