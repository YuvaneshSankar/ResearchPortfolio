import React, { useState } from 'react';

export function ZoomableImage({ src, alt, className, ...props }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt || ''}
        className={`cursor-zoom-in ${className || ''}`}
        onClick={() => setZoomed(true)}
        {...props}
      />
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <img
            src={src}
            alt={alt || ''}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
}
