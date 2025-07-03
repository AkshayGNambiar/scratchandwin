'use client';

import { useState, useEffect } from 'react';
import ScratchCardCanvas from "./components/ScratchCradCanvas"; // make sure this is correctly named and implemented
import {  formSchema } from './lib/validation/validationSchema';

export default function Home() {
    const [showScratch, setShowScratch] = useState(false);
    const [isScratched, setIsScratched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prize, setPrize] = useState('');

    useEffect(() => {
        const savedPrize = localStorage.getItem('prize');
        const savedId = localStorage.getItem('submissionId');
        if (savedPrize && savedId) {
            setPrize(savedPrize);
            setShowScratch(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);
  const raw = Object.fromEntries(formData.entries());
  console.log(raw);
  // ✅ Validate using Zod schema
  const result = formSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.errors.map(err => `${err.path[0]}: ${err.message}`);
    alert(errors.join('\n'));
    setLoading(false);
    return;
  }

  // ✅ Validated and typed data


 try {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  });

  const response = await res.json();

  if (res.ok && !response.played) {
    setPrize(response.prize);
    localStorage.setItem('submissionId', response.id);
    localStorage.setItem('prize', response.prize);
    setShowScratch(true);
  } else if (response.played) {
    setPrize(response.prize);
    localStorage.setItem('prize', response.prize);
    setShowScratch(true);
    setIsScratched(true);
    alert("You have already played. Here's your previous prize.");
  } else {
    alert('Submission failed.');
  }
} catch (error) {
  console.error(error);
  alert('An error occurred.');
} finally {
  setLoading(false);
}
    }
    const handleScratchComplete = async () => {
       // setIsScratched(true);
        const id = localStorage.getItem('submissionId');
        //const prize = localStorage.getItem('prize');
        if (id) {
            await fetch('/api/markScratched', {
                method: 'POST',
                body: JSON.stringify({ id })
            });
        }
       setTimeout(function() {
       reset();
      }, 3000);
    };

    const reset = () => {
        localStorage.clear();
        setShowScratch(false);
        setIsScratched(false);
        setPrize('');

    };

    return (
        <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
    style={{
      backgroundImage: 'url("/bg.gif")',
    }}
  >
            {!showScratch ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                    {/* Left side image (hidden on mobile) */}
                    
                       

                    {/* Right side form */}
                    <div
  className="w-full md:w-full p-6 flex flex-col justify-center rounded-xl bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/bg.gif')" }} // or '/card3.png'
>
  <h2 className="text-2xl  md:text-4xl font-extrabold text-white text-center mb-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm shadow-lg border border-white/30 animate-pulse"
   style={{ color: 'oklch(62.7% 0.265 303.9)' }}
  >
    Enter Details to Play
  </h2>

   <form className="space-y-4" onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Name"
      className="w-full rounded-full p-2 text-white placeholder-white bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      className="w-full rounded-full p-2 text-white placeholder-white bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
    <input
      type="text"
      name="address"
      placeholder="Address"
      className="w-full rounded-full p-2 text-white placeholder-white bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      className="w-full rounded-full p-2 text-white placeholder-white bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
    <input
      type="text"
      name="city"
      placeholder="City"
      className="w-full rounded-full p-2 text-white placeholder-white bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      required
    />
    <button
  type="submit"
  className="w-full text-white py-2 rounded-full hover:opacity-90 transition disabled:opacity-50"
  style={{ backgroundColor: 'oklch(44.4% 0.011 73.639)' }}
  disabled={loading}
>
  {loading ? "Submitting..." : "Submit"}
</button>
  </form>
</div>

                </div>
            ) : (
                <div className="text-center space-y-4">
                    <ScratchCardCanvas
                        width={300}
                        height={200}
                        prizeText={`🎁 ${prize}`}
                        onComplete={handleScratchComplete}
                    />
                    {isScratched && (
                        <button
                            onClick={reset}
                            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                        >
                            Play Again
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
