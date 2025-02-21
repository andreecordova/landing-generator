// LandingGenerator.tsx
import { useLandingGeneratorHook } from "../hooks";
import { Generator } from "../sections/Generator";
import { Preview } from "../sections/Preview";

const LandingGenerator = () => {
  const {
    input,
    loading,
    setInput,
    handleGenerate,
    handleSaveLanding,
    handleExportHTML,
    savedLandings,
  } = useLandingGeneratorHook();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
      <Generator
        input={input}
        loading={loading}
        setInput={setInput}
        handleGenerate={handleGenerate}
      />

      <Preview
        handleSaveLanding={handleSaveLanding}
        savedLandings={savedLandings}
        handleExportHTML={handleExportHTML}
      />
    </div>
  );
};

export default LandingGenerator;
