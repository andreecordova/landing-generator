// Preview.tsx
import React from "react";
import { LandingOutput } from "../../components/LandingOutput";

interface Props {
  output: string;
  image: string;
  input: string;
  handleSaveLanding: () => void;
  handleExportHTML: () => void;
}

export const Preview: React.FC<Props> = ({
  output,
  image,
  input,
  handleSaveLanding,
  handleExportHTML,
}) => {
  return (
    <div className="w-full max-w-2xl bg-gray-100 p-6 shadow-md rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Previsualización
      </h2>
      <LandingOutput
        output={output}
        image={image}
        input={input}
        handleSaveLanding={handleSaveLanding}
        handleExportHTML={handleExportHTML}
      />
    </div>
  );
};
