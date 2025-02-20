// LandingGenerator.tsx
import { useLandingGeneratorHook } from "../hooks";
import { Generator } from "../sections/Generator";
import { Preview } from "../sections/Preview";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Generator
        input={input}
        loading={loading}
        setInput={setInput}
        handleGenerate={handleGenerate}
      />
      {output && (
        <Preview
          output={output}
          image={image}
          input={input}
          handleSaveLanding={handleSaveLanding}
          handleExportHTML={handleExportHTML}
        />
      )}
    </div>
  );
};

export default LandingGenerator;
