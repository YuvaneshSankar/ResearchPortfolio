import React from 'react';

export function VideoPlayer({ src, title, poster }) {
  // Support YouTube / Vimeo embeds
  const isYouTube = src?.includes('youtube.com') || src?.includes('youtu.be');
  const isVimeo = src?.includes('vimeo.com');

  if (isYouTube || isVimeo) {
    let embedUrl = src;
    if (isYouTube) {
      const match = src.match(/(?:v=|youtu\.be\/)([\w-]+)/);
      if (match) embedUrl = `https://www.youtube.com/embed/${match[1]}`;
    }
    if (isVimeo) {
      const match = src.match(/vimeo\.com\/(\d+)/);
      if (match) embedUrl = `https://player.vimeo.com/video/${match[1]}`;
    }

    return (
      <div className="my-6 aspect-video rounded-lg overflow-hidden border border-border">
        <iframe
          src={embedUrl}
          title={title || 'Video'}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border">
      <video
        src={src}
        poster={poster}
        controls
        className="w-full"
      >
        {title && <track kind="captions" label={title} />}
      </video>
    </div>
  );
}
