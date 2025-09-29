
import React from 'react';

export function Header(): React.ReactElement {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-5 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Generatore di Arredamento Virtuale
        </h1>
        <p className="mt-2 text-md text-gray-600">
          Carica una foto, descrivi le modifiche e visualizza il potenziale del tuo immobile.
        </p>
      </div>
    </header>
  );
}
