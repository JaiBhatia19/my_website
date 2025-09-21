'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';

interface FallbackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function FallbackImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality = 90,
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted rounded-full ${className}`}
        style={{ width, height }}
      >
        <User className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
      onError={() => setHasError(true)}
      onLoad={() => setHasError(false)}
    />
  );
}
