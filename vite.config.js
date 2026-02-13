// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import path from 'path';

export default defineConfig({
  plugins: [
    // MDX must come before react so .mdx files are compiled to JSX first
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        remarkMath,
      ],
      rehypePlugins: [
        [rehypeHighlight, { ignoreMissing: true, languages: {}, subset: false, plainText: ['mermaid'] }],
        rehypeKatex,
      ],
      providerImportSource: '@mdx-js/react',
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
