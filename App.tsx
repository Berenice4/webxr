import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ImageViewer } from './components/ImageViewer';
import { editImage, suggestPrompt } from './services/geminiService';
import type { ImageFile } from './types';
import { RetryIcon } from './components/Icon';

export default function App(): React.ReactElement {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: ImageFile) => {
    setOriginalImage(file);
    setGeneratedImage(null);
    setGeneratedText(null);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setGeneratedText(null);

    try {
      // The base64 string from FileReader includes the data URL prefix,
      // which needs to be removed before sending to the API.
      const base64Data = originalImage.dataUrl.split(',')[1];
      const result = await editImage(base64Data, originalImage.file.type, prompt);
      
      if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        setGeneratedText(result.text);
      } else {
        // The API responded, but didn't generate an image.
        // We can show the text response to the user for more context.
        const errorMessage = result.text 
          ? `L'IA ha risposto con del testo: "${result.text}". Prova a riformulare la richiesta.`
          : "Nessuna immagine generata nella risposta. L'IA potrebbe aver risposto solo con testo. Prova a riformulare la tua richiesta.";
        setError(errorMessage);
      }

    } catch (e) {
      console.error("Error calling Gemini API:", e);
      if (e instanceof Error) {
        setError(`Si è verificato un errore di rete o API: ${e.message}. Riprova.`);
      } else {
        setError('Si è verificato un errore sconosciuto durante la generazione. Riprova.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const handleSuggestPrompt = useCallback(async () => {
    if (!prompt) return;
    
    setIsSuggesting(true);
    setError(null);
    try {
      const suggested = await suggestPrompt(prompt);
      setPrompt(suggested);
    } catch (e) {
      console.error("Error suggesting prompt:", e);
      if (e instanceof Error) {
        setError(`Errore nel suggerire il prompt: ${e.message}.`);
      } else {
        setError('Errore sconosciuto durante il suggerimento del prompt.');
      }
    } finally {
      setIsSuggesting(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Controls */}
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} />
            {originalImage && (
              <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Right Column: Image Display */}
          <div className="bg-white p-6 rounded-xl shadow-lg min-h-[400px] flex items-center justify-center">
            <ImageViewer
              originalImage={originalImage?.dataUrl ?? null}
              generatedImage={generatedImage}
              generatedText={generatedText}
              isLoading={isLoading}
              isSuggesting={isSuggesting}
              onRegenerate={handleGenerate}
              onSuggestPrompt={handleSuggestPrompt}
            />
          </div>
        </div>
        {error && (
            <div className="mt-6 text-center p-4 bg-red-100 text-red-700 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-4 shadow">
                <span className="font-medium">{error}</span>
                <button
                    onClick={handleGenerate}
                    className="inline-flex items-center justify-center bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    <RetryIcon className="w-5 h-5 mr-2" />
                    {isLoading ? 'Riprovo...' : 'Riprova'}
                </button>
            </div>
        )}
      </main>
       <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
}