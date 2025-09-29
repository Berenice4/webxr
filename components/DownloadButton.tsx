
import React from 'react';
import { DownloadIcon } from './Icon';

interface DownloadButtonProps {
    imageUrl: string;
}

export function DownloadButton({ imageUrl }: DownloadButtonProps): React.ReactElement {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'arredamento-virtuale.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Scarica Immagine
        </button>
    );
}
