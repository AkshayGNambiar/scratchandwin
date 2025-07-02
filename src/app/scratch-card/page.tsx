'use client';

import ScratchCardCanvas from '../components/ScratchCradCanvas';
import { useState } from 'react';

export default function ScratchCardPage() {
  const [scratched, setScratched] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Scratch to Reveal Your Gift!</h1>
        <ScratchCardCanvas
          width={320}
          height={200}
          prizeText="🎁 You Won ₹500!"
          onComplete={() => setScratched(true)}
        />
        {scratched && <p className="mt-4 text-green-600 font-semibold">Congratulations!</p>}
      </div>
    </div>
  );
}
