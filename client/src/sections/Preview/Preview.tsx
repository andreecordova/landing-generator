// Libraries and Hooks
import React from "react";
// Components
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
  );
};
