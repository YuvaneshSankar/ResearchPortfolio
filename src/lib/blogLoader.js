// Blog loader utility for MDX files
// Each .mdx file is compiled by @mdx-js/rollup and exports:
//   - default: the MDX React component
//   - frontmatter: { title, description, date, readTime, tags } via remark-mdx-frontmatter

const blogModules = import.meta.glob('/src/content/blogs/*.mdx', {
  eager: true,
});

/**
 * Get all blogs with their metadata + component
 */
export function getAllBlogs() {
  const blogs = [];

  for (const [path, mod] of Object.entries(blogModules)) {
    const slug = path.replace('/src/content/blogs/', '').replace('.mdx', '');
    const fm = mod.frontmatter || {};

    blogs.push({
      id: slug,
      slug,
      title: fm.title || 'Untitled',
      description: fm.description || '',
      date: fm.date || new Date().toISOString(),
      readTime: fm.readTime || '5 min read',
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      Component: mod.default,
    });
  }

  // Sort by date (newest first)
  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single blog by slug
 */
export function getBlogBySlug(slug) {
  return getAllBlogs().find(blog => blog.slug === slug);
}

/**
 * Get blog metadata only (without Component) for listing pages
 */
export function getBlogsMeta() {
  return getAllBlogs().map(({ Component, ...meta }) => meta);
}

export default { getAllBlogs, getBlogBySlug, getBlogsMeta };
