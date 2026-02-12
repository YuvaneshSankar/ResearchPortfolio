import { CodeBlock } from "@/components/ui/CodeBlock";
import { Mermaid } from "@/components/ui/Mermaid";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Callout } from "@/components/ui/Callout";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

export const mdxComponents = {
  h1: (props) => <h1 className="text-3xl font-bold mt-12 mb-8 text-foreground" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-10 mb-6 text-foreground" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground" {...props} />,
  h4: (props) => <h4 className="text-lg font-semibold mt-6 mb-3 text-foreground" {...props} />,
  p: (props) => <p className="my-4 leading-relaxed text-muted-foreground" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  a: (props) => <a className="text-primary no-underline hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  img: (props) => (
    <ZoomableImage
      className="rounded-lg my-6 max-w-full h-auto border border-border"
      alt={props.alt || ""}
      {...props}
    />
  ),
  pre: (props) => {
    const code = props.children?.props?.children;
    const language = props.children?.props?.className?.replace('language-', '');

    if (language === 'mermaid' && typeof code === 'string') {
      return <Mermaid chart={code} />;
    }

    return <CodeBlock className={props.children?.props?.className}>{props.children}</CodeBlock>;
  },
  code: (props) => {
    const { className, children } = props;
    if (className === 'language-mermaid' && typeof children === 'string') {
      return <Mermaid chart={children} />;
    }
    // Inline code
    if (!className) {
      return <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props} />;
    }
    return <code {...props} />;
  },
  ul: (props) => <ul className="list-disc space-y-2 my-4 ml-6" {...props} />,
  ol: (props) => <ol className="list-decimal space-y-2 my-4 ml-6" {...props} />,
  li: (props) => <li className="my-2" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground" {...props} />,
  hr: (props) => <hr className="border-border my-8" {...props} />,
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-muted" {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-border" {...props} />,
  th: (props) => <th className="border border-border px-4 py-2 bg-muted font-semibold text-foreground" {...props} />,
  td: (props) => <td className="border border-border px-4 py-2" {...props} />,
  // Custom components
  Callout: Callout,
  VideoPlayer: VideoPlayer,
};