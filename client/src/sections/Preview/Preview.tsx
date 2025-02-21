// Preview.tsx
import React from "react";
import { LandingOutput } from "../../components/LandingOutput";

interface Props {
  handleSaveLanding: () => void;
  handleExportHTML: () => void;
  savedLandings: any;
}

export const Preview: React.FC<Props> = ({
  handleSaveLanding,
  handleExportHTML,
  savedLandings,
}) => {
  return (
    <div className='w-full max-w-2xl bg-gray-100 p-6 shadow-md rounded-lg mt-6'>
      <h2 className='text-lg font-semibold mb-4 text-center'>
        Previsualización
      </h2>
      {savedLandings?.map(({ content, image, title }: any) => (
        <LandingOutput
          output={content}
          image={image}
          input={title}
          handleSaveLanding={handleSaveLanding}
          handleExportHTML={handleExportHTML}
        />
      ))}
    </div>
  );
};
