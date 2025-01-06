"use client";

import Image from "next/image";
import { useState } from "react";

const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative" onMouseUp={handleMouseUp}>
      <div
        className="relative w-full max-w-[900px] h-[600px] m-auto overflow-hidden select-none rounded-2xl shadow-lg"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        {/* After Image */}
        <Image
          alt="After Image"
          fill
          draggable={false}
          priority
          src="/after.png"
          className="rounded-xl"
        />

        {/* Before Image with Clipping */}
        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[900px] h-[600px] aspect-[16/9] m-auto overflow-hidden select-none rounded-xl"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            fill
            priority
            draggable={false}
            alt="Before Image"
            src="/before.png"
            className="rounded-xl"
          />
        </div>

        {/* Slider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-4 w-4 -left-2 top-[calc(50%-8px)]" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
