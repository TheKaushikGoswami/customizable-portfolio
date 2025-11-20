import { defineCollection, defineConfig, s } from 'velite'

// Helper transform to match Contentlayer's body structure
const transformBody = (data: any, { meta }: any) => {
  // Safety: Use data.slug if available, otherwise fallback to meta.path
  const rawPath = data.slug || meta.path || '';
  
  // Remove the .mdx extension to get a clean slug
  const cleanPath = rawPath.replace(/\.mdx?$/, '');

  // Create slugAsParams by removing the top-level directory (e.g., "projects/" or "profile/")
  // "projects/my-project" -> "my-project"
  const parts = cleanPath.split('/');
  const slugAsParams = parts.length > 1 ? parts.slice(1).join('/') : cleanPath;

  return {
    ...data,
    slug: cleanPath, // Ensure the main slug is also clean
    slugAsParams,
    body: { 
      code: data.body,   // The compiled MDX string
      raw: meta.content  // The raw Markdown content
    }
  }
}

// 1. Projects Collection
const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      github: s.string().url().optional(),
      liveUrl: s.string().url().optional(),
      featured: s.boolean().default(false),
      technologies: s.array(s.string()).default([]),
      body: s.mdx(),
    })
    .transform(transformBody),
})

// 2. Profile Collection
const profiles = defineCollection({
  name: 'Profile',
  pattern: 'profile/**/*.mdx',
  schema: s
    .object({
      username: s.string(),
      fullName: s.string(),
      headline: s.string(),
      blogHeadline: s.string(),
      role: s.string(),
      company: s.string(),
      formalImage: s.string().url(),
      profileImage: s.string().url(),
      links: s.array(
        s.object({
          platform: s.string(),
          url: s.string().url(),
          alias: s.string(),
        })
      ),
      body: s.mdx(),
    })
    .transform(transformBody),
})

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { projects, profiles },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
})