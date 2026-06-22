// @vitest-environment node
import { describe, test, expect } from 'vitest'
import { 
  getPosts, 
  getPostBySlug, 
  getDocs, 
  getDocBySlug, 
  getBlogAuthor, 
  getPortfolioCaseStudy,
  getKbRelatedArticles
} from '../../lib/content'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

describe('Content Engine & Query Helpers', () => {
  test('should parse and load blog posts for both locales', async () => {
    const enPosts = await getPosts('en')
    const bnPosts = await getPosts('bn')

    expect(enPosts.length).toBeGreaterThan(0)
    expect(bnPosts.length).toBeGreaterThan(0)

    expect(enPosts[0].locale).toBe('en')
    expect(bnPosts[0].locale).toBe('bn')
    
    expect(enPosts[0].readingTime).toBeDefined()
    expect(typeof enPosts[0].readingTime).toBe('number')
  })

  test('should parse and load docs and compute prev/next links', () => {
    const enDocs = getDocs('en')
    expect(enDocs.length).toBeGreaterThan(0)

    const introDoc = enDocs.find(d => d.slug === 'introduction')
    const configDoc = enDocs.find(d => d.slug === 'configuration')

    expect(introDoc).toBeDefined()
    expect(configDoc).toBeDefined()

    expect(introDoc?.next?.slug).toBe('installation')
    expect(configDoc?.prev?.slug).toBe('installation')
  })

  test('should fallback to English when Bengali translation is missing', () => {
    // 'installation' is missing in 'bn'
    const doc = getDocBySlug('bn', 'installation')
    expect(doc).not.toBeNull()
    expect(doc?.locale).toBe('en')
    expect(doc?.untranslated).toBe(true)

    // 'introduction' exists in 'bn'
    const docIntro = getDocBySlug('bn', 'introduction')
    expect(docIntro).not.toBeNull()
    expect(docIntro?.locale).toBe('bn')
    expect(docIntro?.untranslated).toBe(false)
  })

  test('should resolve reference relations correctly', async () => {
    const posts = await getPosts('en')
    const post = posts.find(p => p.slug === 'scaling-nextjs')
    expect(post).toBeDefined()

    const author = await getBlogAuthor(post!)
    expect(author).not.toBeNull()
    expect(author?.name).toBe('John Doe')
  })

  test('should fail build loudly on invalid frontmatter', () => {
    // Create a temporary invalid markdown file
    const tempDir = path.join(__dirname, '../../content/en/blog')
    const tempFilePath = path.join(tempDir, 'invalid-temp-post.md')
    
    // Write a file missing required 'title', 'excerpt', etc.
    fs.writeFileSync(tempFilePath, `---
date: 2026-06-15
author: john-doe
---
Invalid frontmatter.
`)

    try {
      // Running velite build should throw / fail build with status !== 0
      expect(() => {
        execSync('npx velite build --strict', { stdio: 'pipe' })
      }).toThrow()
    } finally {
      // Clean up temporary invalid file
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath)
      }
      // Rebuild to restore clean state
      execSync('npx velite build --strict', { stdio: 'pipe' })
    }
  }, 30000)
})
