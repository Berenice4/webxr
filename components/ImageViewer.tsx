import React from 'react';
import { Spinner } from './Spinner';
import { DownloadButton } from './DownloadButton';
import { LightbulbIcon, RetryIcon } from './Icon';

interface ImageViewerProps {
  originalImage: string | null;
  generatedImage: string | null;
  generatedText: string | null;
  isLoading: boolean;
  isSuggesting: boolean;
  onRegenerate: () => void;
  onSuggestPrompt: () => void;
}

const Placeholder = ({ text }: { text: string }) => (
    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">{text}</p>
    </div>
);


export function ImageViewer({ 
    originalImage, 
    generatedImage, 
    generatedText, 
    isLoading, 
    isSuggesting,
    onRegenerate,
    onSuggestPrompt
}: ImageViewerProps): React.ReactElement {
    if (!originalImage) {
        return <Placeholder text="Carica un'immagine per iniziare" />;
    }

    return (
        <div className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Originale</h3>
                    <img src={originalImage} alt="Original" className="rounded-lg shadow-md aspect-video object-cover" />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Generata</h3>
                    <div className="relative w-full aspect-video bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
                        {isLoading && <Spinner />}
                        {generatedImage && !isLoading && (
                            <img src={generatedImage} alt="Generated" className="rounded-lg object-cover w-full h-full" />
                        )}
                        {!generatedImage && !isLoading && (
                            <p className="text-gray-500 p-4">L'immagine modificata apparirà qui</p>
                        )}
                    </div>
                </div>
            </div>

            {generatedText && !isLoading && (
                <div className="text-left">
                    <h4 className="font-semibold text-gray-700 mb-2">Risposta testuale dell'IA:</h4>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{generatedText}</p>
                    </div>
                </div>
            )}
            
            {generatedImage && !isLoading && (
                <div className="border-t border-gray-200 mt-4 pt-4 text-center space-y-3">
                    <p className="text-sm text-gray-600">Non sei soddisfatto del risultato?</p>
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        <DownloadButton imageUrl={generatedImage} />
                        <button
                            onClick={onRegenerate}
                            className="inline-flex items-center justify-center bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            <RetryIcon className="w-5 h-5 mr-2" />
                            Rigenera
                        </button>
                        <button
                            onClick={onSuggestPrompt}
                            disabled={isSuggesting}
                            className="inline-flex items-center justify-center bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:bg-purple-300 disabled:cursor-not-allowed"
                        >
                            {isSuggesting ? (
                                <>
                                    <Spinner className="h-5 w-5 mr-2 text-white" />
                                    Suggerendo...
                                </>
                            ) : (
                                <>
                                    <LightbulbIcon className="w-5 h-5 mr-2" />
                                    Migliora prompt
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}