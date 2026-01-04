"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import { ImageProps } from "next/image";

interface ClientImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

const ClientImage: React.FC<ClientImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null); // Unused

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Queue for BFS (Flood Fill) - visual trick: start from 4 corners
      // Check if corners are black, if so, treat as background
      const queue: [number, number][] = [];
      const visited = new Set<string>();

      // Threshold for "black" - increase allowance for compression artifacts
      const threshold = 50; 

      const isBlack = (r: number, g: number, b: number) => {
        return r < threshold && g < threshold && b < threshold;
      };

      const addIfBlack = (x: number, y: number) => {
         if (x < 0 || x >= width || y < 0 || y >= height) return;
         const key = `${x},${y}`;
         if (visited.has(key)) return;
         
         const idx = (y * width + x) * 4;
         const r = data[idx];
         const g = data[idx + 1];
         const b = data[idx + 2];
         
         if (isBlack(r, g, b)) {
            queue.push([x, y]);
            visited.add(key);
         }
      };

      // Seed from corners
      addIfBlack(0, 0);
      addIfBlack(width - 1, 0);
      addIfBlack(0, height - 1);
      addIfBlack(width - 1, height - 1);

      // BFS to remove connected black background
      while (queue.length > 0) {
        const [x, y] = queue.shift()!;
        const idx = (y * width + x) * 4;

        // Make transparent
        data[idx + 3] = 0;

        // Check neighbors
        addIfBlack(x + 1, y);
        addIfBlack(x - 1, y);
        addIfBlack(x, y + 1);
        addIfBlack(x, y - 1);
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src]);

  if (!processedSrc) {
    // Optionally return nothing or a placeholder while processing
    // Returning transparent div to avoid layout shift if size is known, or just null
    return <div className={className} style={{ width: '100%', height: '100%' }} />; 
  }

  // We use a regular img tag for the data URL as next/image features are less relevant for blob/data URLs
  // but we try to match the props structure. If fill is used, we style it.
  if (props.fill) {
      return (
          <img 
            src={processedSrc} 
            alt={alt} 
            className={className}
            style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }}
          />
      )
  }

  return (
    <img
      src={processedSrc}
      alt={alt}
      className={className}
      width={props.width}
      height={props.height}
    />
  );
};

export default ClientImage;
