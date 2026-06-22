import { defineConfig, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'

const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  // count words, supporting English and Bengali (word boundaries can be standard spaces/punctuation)
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

const getLocale = (path: string) => {
  const normalized = path.replace(/\\/g, '/');
  return /\bbn\b/.test(normalized) ? 'bn' : 'en';
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0980-\u09FFa-z0-9_-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash].[ext]',
    clean: true
  },
  strict: true,
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypeShiki as any,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          }
        }
      ]
    ]
  },
  collections: {
    blog: {
      name: 'Blog',
      pattern: '**/blog/**/*.md',
      schema: s.object({
        title: s.string().max(100),
        slug: s.string().optional(),
        excerpt: s.string(),
        date: s.isodate(),
        updated: s.isodate().optional(),
        author: s.string(), // slug reference to team
        categories: s.array(s.string()).default([]),
        tags: s.array(s.string()).default([]),
        featuredImage: s.string().optional(),
        draft: s.boolean().default(false),
        seo: s.object({
          title: s.string().optional(),
          description: s.string().optional(),
          ogImage: s.string().optional()
        }).optional(),
        content: s.markdown()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        const resolvedSlug = slugify(data.slug || data.title);
        return {
          ...data,
          slug: resolvedSlug,
          locale,
          readingTime: getReadingTime(data.content)
        };
      })
    },
    docs: {
      name: 'Doc',
      pattern: '**/docs/**/*.md',
      schema: s.object({
        title: s.string(),
        slug: s.string().optional(),
        order: s.number().default(0),
        group: s.string(),
        version: s.string(),
        content: s.markdown(),
        toc: s.toc(),
        prev: s.object({ title: s.string(), slug: s.string() }).nullable().optional(),
        next: s.object({ title: s.string(), slug: s.string() }).nullable().optional()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        const resolvedSlug = slugify(data.slug || data.title);
        return {
          ...data,
          slug: resolvedSlug,
          locale
        };
      })
    },
    kb: {
      name: 'Kb',
      pattern: '**/kb/**/*.md',
      schema: s.object({
        title: s.string(),
        slug: s.string().optional(),
        category: s.string(),
        related: s.array(s.string()).default([]), // slugs
        helpfulId: s.string(),
        content: s.markdown()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        const resolvedSlug = slugify(data.slug || data.title);
        return {
          ...data,
          slug: resolvedSlug,
          locale
        };
      })
    },
    changelog: {
      name: 'Changelog',
      pattern: '**/changelog/**/*.md',
      schema: s.object({
        version: s.string(), // semver
        date: s.isodate(),
        type: s.enum(['added', 'changed', 'fixed', 'removed', 'security']),
        title: s.string(),
        content: s.markdown()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        return {
          ...data,
          locale
        };
      })
    },
    team: {
      name: 'Team',
      pattern: '**/team/**/*.md',
      schema: s.object({
        name: s.string(),
        role: s.string(),
        slug: s.string().optional(),
        avatar: s.string(),
        bio: s.string(),
        skills: s.array(s.string()).default([]),
        socials: s.record(s.string()).default({}),
        content: s.markdown()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        const resolvedSlug = slugify(data.slug || data.name);
        return {
          ...data,
          slug: resolvedSlug,
          locale
        };
      })
    },
    testimonials: {
      name: 'Testimonial',
      pattern: '**/testimonials/**/*.md',
      schema: s.object({
        author: s.string(),
        company: s.string(),
        logo: s.string().optional(),
        avatar: s.string().optional(),
        quote: s.string(),
        rating: s.number().optional(),
        videoUrl: s.string().optional(),
        content: s.markdown()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        return {
          ...data,
          locale
        };
      })
    },
    portfolio: {
      name: 'Portfolio',
      pattern: '**/portfolio/**/*.md',
      schema: s.object({
        title: s.string(),
        slug: s.string().optional(),
        category: s.string(),
        cover: s.string(),
        gallery: s.array(s.string()).default([]),
        caseStudy: s.string().optional(), // slug
        content: s.markdown()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        const resolvedSlug = slugify(data.slug || data.title);
        return {
          ...data,
          slug: resolvedSlug,
          locale
        };
      })
    },
    caseStudies: {
      name: 'CaseStudy',
      pattern: '**/case-studies/**/*.md',
      schema: s.object({
        title: s.string(),
        slug: s.string().optional(),
        client: s.string(),
        industry: s.string(),
        challenge: s.string(),
        solution: s.string(),
        results: s.array(s.string()).default([]),
        metrics: s.record(s.union([s.string(), s.number()])).default({}),
        content: s.markdown()
      }).transform((data, { meta }) => {
        const locale = getLocale(meta.path);
        const resolvedSlug = slugify(data.slug || data.title);
        return {
          ...data,
          slug: resolvedSlug,
          locale
        };
      })
    }
  },
  prepare: (collections) => {
    const { docs } = collections;
    
    // Group docs by locale, then by group, then sort by order
    const docsByLocaleAndGroup: Record<string, Record<string, typeof docs>> = {};
    for (const doc of docs) {
      const locale = doc.locale;
      const group = doc.group;
      if (!docsByLocaleAndGroup[locale]) {
        docsByLocaleAndGroup[locale] = {};
      }
      if (!docsByLocaleAndGroup[locale][group]) {
        docsByLocaleAndGroup[locale][group] = [];
      }
      docsByLocaleAndGroup[locale][group].push(doc);
    }

    for (const locale in docsByLocaleAndGroup) {
      for (const group in docsByLocaleAndGroup[locale]) {
        const sortedDocs = docsByLocaleAndGroup[locale][group].sort((a, b) => a.order - b.order);
        for (let i = 0; i < sortedDocs.length; i++) {
          const doc = sortedDocs[i];
          const prevDoc = sortedDocs[i - 1];
          const nextDoc = sortedDocs[i + 1];
          
          doc.prev = prevDoc ? { title: prevDoc.title, slug: prevDoc.slug } : null;
          doc.next = nextDoc ? { title: nextDoc.title, slug: nextDoc.slug } : null;
        }
      }
    }
  }
})
