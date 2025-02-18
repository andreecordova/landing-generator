import React from "react";

interface Props {
  input: string;
  loading: boolean;
  setInput: (value: React.SetStateAction<string>) => void;
  handleGenerate: () => Promise<void>;
}

export const Generator: React.FC<Props> = ({
  input,
  loading,
  setInput,
  handleGenerate,
}) => {
  return (
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
  );
};
