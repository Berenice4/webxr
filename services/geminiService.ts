import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface EditImageResult {
  imageUrl: string | null;
  text: string | null;
}

export async function editImage(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditImageResult> {
  // Aggiunge istruzioni al prompt per ottenere le dimensioni,
  // dato che Function Calling non è supportato da questo modello.
  const finalPrompt = `${prompt}\n\nSe la richiesta include una domanda sulle dimensioni di un oggetto, per favore fornisci una stima delle dimensioni in centimetri (es. larghezza, profondità, altezza) nella tua risposta testuale.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: finalPrompt,
        },
      ],
    },
    config: {
        // Both IMAGE and TEXT modalities are required for this model.
        responseModalities: [Modality.IMAGE, Modality.TEXT],
        // Rimosso 'tools' che causava l'errore perché non supportato
    },
  });

  const parts = response.candidates?.[0]?.content?.parts || [];
  const result: EditImageResult = { imageUrl: null, text: null };

  for (const part of parts) {
    if (part.inlineData) {
      result.imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    } else if (part.text) {
      result.text = (result.text || '') + part.text; // Concatenate in case of multiple text parts
    }
  }

  // La logica per functionCalls è stata rimossa.
  
  return result;
}

export async function suggestPrompt(currentPrompt: string): Promise<string> {
  if (!currentPrompt.trim()) {
    return "";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Come esperto di interior design, migliora il seguente prompt per un'IA generativa di immagini. Rendilo più descrittivo, specifico e dettagliato per ottenere un risultato fotorealistico, senza aggiungere saluti o testo introduttivo. Fornisci solo il nuovo prompt.\n\nPrompt originale: "${currentPrompt}"`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error suggesting prompt:", error);
    // Restituisce il prompt originale in caso di errore per non interrompere l'esperienza utente
    return currentPrompt;
  }
}