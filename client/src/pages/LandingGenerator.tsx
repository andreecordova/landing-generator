// Custom Hooks
import { useLandingGeneratorHook } from "../hooks";
// Components
import { LandingOutput } from "../components/LandingOutput";

const LandingGenerator = () => {
  const {
    input,
    output,
    image,
    loading,
    setInput,
    handleGenerate,
    handleSaveLanding,
    handleExportHTML,
  } = useLandingGeneratorHook();

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

        <LandingOutput
          output={output}
          image={image}
          input={input}
          handleSaveLanding={handleSaveLanding}
          handleExportHTML={handleExportHTML}
        />
      </div>
    </div>
  );
};

export default LandingGenerator;
