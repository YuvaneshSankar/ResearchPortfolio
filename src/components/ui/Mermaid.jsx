import React, { useEffect, useRef, useState } from 'react';

export function Mermaid({ chart }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
        });
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <pre className="p-4 my-6 rounded-lg bg-red-950/30 text-red-400 text-sm overflow-auto border border-red-800">
        Mermaid error: {error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
