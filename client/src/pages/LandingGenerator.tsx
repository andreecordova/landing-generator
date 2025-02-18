// Custom Hooks
import { useLandingGeneratorHook } from "../hooks";
// Sections
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
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      <Generator
        input={input}
        loading={loading}
        setInput={setInput}
        handleGenerate={handleGenerate}
      />

      {!!output ? (
        <Preview
          output={output}
          image={image}
          input={input}
          handleSaveLanding={handleSaveLanding}
          handleExportHTML={handleExportHTML}
        />
      ) : null}
    </div>
  );
};

export default LandingGenerator;
