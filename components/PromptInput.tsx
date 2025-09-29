
import React from 'react';
import { SparklesIcon } from './Icon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const promptExamples = [
    "Sostituisci il divano con un divano angolare in pelle bianca in stile moderno.",
    "Trasforma questo soggiorno in uno stile scandinavo, con mobili in legno chiaro e colori neutri.",
    "Aggiungi un tappeto persiano sotto il tavolino.",
    "Rimuovi tutti i mobili per mostrare la stanza vuota.",
];

export function PromptInput({ prompt, setPrompt, onGenerate, isLoading }: PromptInputProps): React.ReactElement {
  
  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };
  
  return (
    <div className="space-y-4">
       <div>
        <label htmlFor="prompt" className="block text-lg font-semibold text-gray-700 mb-2">2. Descrivi le modifiche</label>
        <textarea
            id="prompt"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            placeholder="Es: Cambia il tavolo con uno in vetro per 8 persone e aggiungi un lampadario moderno..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
        />
       </div>

       <div className="text-sm text-gray-600">
            <p className="font-medium mb-2">Qualche idea:</p>
            <div className="flex flex-wrap gap-2">
                {promptExamples.map((example, index) => (
                    <button 
                        key={index}
                        onClick={() => handleExampleClick(example)}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors text-xs"
                        disabled={isLoading}
                    >
                        {example.substring(0, 40)}...
                    </button>
                ))}
            </div>
       </div>

        <button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
        >
            {isLoading ? 'Generazione in corso...' : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Genera
              </>
            )}
        </button>
    </div>
  );
}
