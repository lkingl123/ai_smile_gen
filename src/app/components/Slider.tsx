"use client";

import Image from "next/image";
import { useState } from "react";

const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

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

  const handleMouseEnter = () => {
    if (!isDragging) {
      setTimeout(() => {
        if (!isSliderHovered) {
          setIsHovered(true);
        }
      }, 50); // Delay to avoid flickering
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setTimeout(() => {
        if (!isSliderHovered) {
          setIsHovered(false);
        }
      }, 50); // Delay to avoid flickering
    }
  };

  return (
    <div
      className="w-full relative"
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full max-w-[1000px] aspect-[4/3] m-auto overflow-hidden select-none rounded-xl shadow-lg"
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
          className="rounded-xl object-cover object-[50%_25%]"
        />

        {/* Before Image with Clipping */}
        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[1000px] aspect-[4/3] m-auto overflow-hidden select-none rounded-xl"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            fill
            priority
            draggable={false}
            alt="Before Image"
            src="/before.png"
            className="rounded-xl object-cover object-[50%_25%]"
          />
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-between px-4 text-white transition-opacity duration-500 ${
            isHovered && !isSliderHovered && !isDragging
              ? "bg-black bg-opacity-50 opacity-100"
              : "bg-black bg-opacity-0 opacity-0"
          }`}
        >
          <span className="text-lg font-bold">Before</span>
          <span className="text-lg font-bold">After</span>
        </div>

        {/* Slider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
          onMouseEnter={() => {
            setIsSliderHovered(true);
            setIsHovered(false); // Immediately hide overlay when slider is hovered
          }}
          onMouseLeave={() => {
            setIsSliderHovered(false);
            if (!isDragging) {
              setIsHovered(true); // Restore overlay after leaving slider
            }
          }}
        >
          <div className="bg-white absolute rounded-full h-4 w-4 -left-2 top-[calc(50%-8px)]" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
