'use client';

import { useEffect, useRef, useState } from 'react';

type ScratchCardCanvasProps = {
  width?: number;
  height?: number;
  onComplete?: () => void;
  prizeText: string;
  scratchRadius?: number;
  completionThreshold?: number; // percentage (0-100)
};

export default function ScratchCardCanvas({
  width = 300,
  height = 200,
  onComplete,
  prizeText,
  scratchRadius = 20,
  completionThreshold = 35,
}: ScratchCardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const [completed, setCompleted] = useState(false);
  const lastCheckTime = useRef(0);

  useEffect(() => {
    const baseCanvas = canvasRef.current;
    const overlayCanvas = overlayRef.current;
    if (!baseCanvas || !overlayCanvas) return;

    const baseCtx = baseCanvas.getContext('2d');
    const overlayCtx = overlayCanvas.getContext('2d');
    if (!baseCtx || !overlayCtx) return;

    // Step 1: Draw base layer (prize)
    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    baseCtx.fillStyle = '#FFF8E1'; // Background
    baseCtx.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
    baseCtx.fillStyle = '#FF5722';
    baseCtx.font = 'bold 24px Arial';
    baseCtx.textAlign = 'center';
    baseCtx.textBaseline = 'middle';
    baseCtx.fillText(prizeText, baseCanvas.width / 2, baseCanvas.height / 2);

    // Step 2: Draw overlay layer (scratch surface)
    overlayCtx.globalCompositeOperation = 'source-over';
    overlayCtx.fillStyle = '#CCCCCC'; // Scratch layer color
    overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    overlayCtx.globalCompositeOperation = 'destination-out';

    let isDrawing = false;

    const getPosition = (e: MouseEvent | TouchEvent) => {
      const rect = overlayCanvas.getBoundingClientRect();
      const x =
        'touches' in e
          ? e.touches[0].clientX - rect.left
          : (e as MouseEvent).clientX - rect.left;
      const y =
        'touches' in e
          ? e.touches[0].clientY - rect.top
          : (e as MouseEvent).clientY - rect.top;
      return { x, y };
    };

    const draw = (x: number, y: number) => {
      overlayCtx.beginPath();
      overlayCtx.arc(x, y, scratchRadius, 0, Math.PI * 2);
      overlayCtx.fill();
    };

    const checkCompletion = () => {
      const now = Date.now();
      if (now - lastCheckTime.current < 500) return false;
      lastCheckTime.current = now;

      const imageData = overlayCtx.getImageData(0, 0, overlayCanvas.width, overlayCanvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] < 128) transparentPixels++;
      }

      const percent = (transparentPixels / (pixels.length / 16)) * 100;
      return percent >= completionThreshold;
    };

    const handleComplete = () => {
      setCompleted(true);
      onComplete?.();
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { x, y } = getPosition(e);
      draw(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getPosition(e);
      draw(x, y);

      if (!completed && checkCompletion()) {
        handleComplete();
      }
    };

    const handleEnd = () => {
      if (!isDrawing) return;
      isDrawing = false;

      if (!completed && checkCompletion()) {
        handleComplete();
      }
    };

    overlayCanvas.addEventListener('mousedown', handleStart);
    overlayCanvas.addEventListener('mousemove', handleMove);
    overlayCanvas.addEventListener('mouseup', handleEnd);
    overlayCanvas.addEventListener('mouseleave', handleEnd);
    overlayCanvas.addEventListener('touchstart', handleStart, { passive: false });
    overlayCanvas.addEventListener('touchmove', handleMove, { passive: false });
    overlayCanvas.addEventListener('touchend', handleEnd);

    return () => {
      overlayCanvas.removeEventListener('mousedown', handleStart);
      overlayCanvas.removeEventListener('mousemove', handleMove);
      overlayCanvas.removeEventListener('mouseup', handleEnd);
      overlayCanvas.removeEventListener('mouseleave', handleEnd);
      overlayCanvas.removeEventListener('touchstart', handleStart);
      overlayCanvas.removeEventListener('touchmove', handleMove);
      overlayCanvas.removeEventListener('touchend', handleEnd);
    };
  }, [completed, onComplete, prizeText, scratchRadius, completionThreshold]);

  return (
    <div className="relative" style={{ width, height }}>
      {/* Base prize layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 z-0"
      />
      {/* Scratchable overlay */}
      <canvas
        ref={overlayRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 z-10 touch-none"
      />
    </div>
  );
}
