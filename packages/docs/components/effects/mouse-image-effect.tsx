"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

const images = Array(16).fill("/logo.svg");

export default function MouseImageEffect() {
  const [imagePositions, setImagePositions] = useState<
    { src: string; x: number; y: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top } = containerRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    if (imagePositions.length < images.length) {
      setImagePositions((prev) => [
        ...prev,
        { src: images[prev.length], x, y },
      ]);
    } else {
      setImagePositions((prev) => [
        ...prev.slice(1),
        { src: images[prev.length % images.length], x, y },
      ]);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-white dark:bg-black"
    >
      <div className="text-center z-10 font-Inter text-black dark:text-white">
        <h1 className="text-xl font-bold mb-4 md:text-6xl">
          react-notion-custom
        </h1>
        <p className="text-sm md:text-xl">
          Create Your Custom Blog with Notion
        </p>
      </div>

      {imagePositions.map((image, index) => (
        <img
          key={`${index}-${image.src}`}
          src={image.src}
          alt={`Image ${index + 1}`}
          className="absolute w-12 h-12 transition-all duration-500 ease-out"
          style={{
            left: `${image.x}px`,
            top: `${image.y}px`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}
