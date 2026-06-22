import dbConnect from "@/lib/db";
import { 
  Blog as BlogModel, 
  Team as TeamModel, 
  Testimonial as TestimonialModel, 
  Portfolio as PortfolioModel,
  Page as PageModel
} from "@/lib/models";

import { 
  blog as rawBlogs, 
  docs as rawDocs, 
  kb as rawKbs, 
  changelog as rawChangelogs, 
  team as rawTeams, 
  testimonials as rawTestimonials, 
  portfolio as rawPortfolios, 
  caseStudies as rawCaseStudies 
} from '#content'

export type Blog = typeof rawBlogs[number]
export type Doc = typeof rawDocs[number]
export type Kb = typeof rawKbs[number]
export type Changelog = typeof rawChangelogs[number]
export type Team = typeof rawTeams[number]
export type Testimonial = typeof rawTestimonials[number]
export type Portfolio = typeof rawPortfolios[number]
export type CaseStudy = typeof rawCaseStudies[number]

// Blog Query Helpers
export const getPosts = async (locale: string): Promise<any[]> => {
  try {
    await dbConnect();
    const posts = await BlogModel.find({ locale: locale as "en" | "bn", draft: false }).sort({ date: -1 }).lean();
    if (posts && posts.length > 0) {
      return posts.map(p => ({ ...p, _id: p._id.toString() }));
    }
  } catch (e) {
    console.error("DB getPosts failed, using Velite fallback:", e);
  }
  return rawBlogs.filter(post => post.locale === locale && !post.draft);
}

export const getPostBySlug = async (locale: string, slug: string): Promise<any | null> => {
  try {
    await dbConnect();
    const post: any = await BlogModel.findOne({ locale: locale as "en" | "bn", slug, draft: false }).lean();
    if (post) {
      return { ...post, _id: post._id.toString() };
    }
  } catch (e) {
    console.error("DB getPostBySlug failed, using Velite fallback:", e);
  }
  return rawBlogs.find(post => post.locale === locale && post.slug === slug && !post.draft) || null;
}

// Docs Query Helpers (Stay static since they are docs, but keep structure)
export const getDocs = (locale: string): Doc[] => {
  return rawDocs.filter(doc => doc.locale === locale);
}

export const getDocBySlug = (locale: string, slug: string): (Doc & { untranslated?: boolean }) | null => {
  const doc = rawDocs.find(d => d.locale === locale && d.slug === slug);
  if (doc) {
    return { ...doc, untranslated: false };
  }
  
  if (locale === 'bn') {
    const fallbackDoc = rawDocs.find(d => d.locale === 'en' && d.slug === slug);
    if (fallbackDoc) {
      return { ...fallbackDoc, untranslated: true };
    }
  }
  
  return null;
}

// KB Query Helpers
export const getKbs = (locale: string): Kb[] => {
  return rawKbs.filter(kb => kb.locale === locale);
}

export const getKbBySlug = (locale: string, slug: string): Kb | null => {
  return rawKbs.find(kb => kb.locale === locale && kb.slug === slug) || null;
}

// Changelog Query Helpers
export const getChangelogs = (locale: string): Changelog[] => {
  return rawChangelogs.filter(c => c.locale === locale);
}

// Team Query Helpers
export const getTeams = async (locale: string): Promise<any[]> => {
  try {
    await dbConnect();
    const team = await TeamModel.find({ locale: locale as "en" | "bn" }).sort({ createdAt: 1 }).lean();
    if (team && team.length > 0) {
      return team.map(t => ({ ...t, _id: t._id.toString() }));
    }
  } catch (e) {
    console.error("DB getTeams failed, using Velite fallback:", e);
  }
  return rawTeams.filter(t => t.locale === locale);
}

export const getTeamMember = async (locale: string, slug: string): Promise<any | null> => {
  try {
    await dbConnect();
    const member: any = await TeamModel.findOne({ locale: locale as "en" | "bn", slug }).lean();
    if (member) {
      return { ...member, _id: member._id.toString() };
    }
  } catch (e) {
    console.error("DB getTeamMember failed, using Velite fallback:", e);
  }
  return rawTeams.find(t => t.locale === locale && t.slug === slug) || null;
}

// Testimonials Query Helpers
export const getTestimonials = async (locale: string): Promise<any[]> => {
  try {
    await dbConnect();
    const testimonials = await TestimonialModel.find({ locale: locale as "en" | "bn" }).sort({ createdAt: 1 }).lean();
    if (testimonials && testimonials.length > 0) {
      return testimonials.map(t => ({ ...t, _id: t._id.toString() }));
    }
  } catch (e) {
    console.error("DB getTestimonials failed, using Velite fallback:", e);
  }
  return rawTestimonials.filter(t => t.locale === locale);
}

// Portfolio Query Helpers
export const getPortfolios = async (locale: string): Promise<any[]> => {
  try {
    await dbConnect();
    const portfolios = await PortfolioModel.find({ locale: locale as "en" | "bn" }).sort({ createdAt: 1 }).lean();
    if (portfolios && portfolios.length > 0) {
      return portfolios.map(p => ({ ...p, _id: p._id.toString() }));
    }
  } catch (e) {
    console.error("DB getPortfolios failed, using Velite fallback:", e);
  }
  return rawPortfolios.filter(p => p.locale === locale);
}

export const getPortfolioBySlug = async (locale: string, slug: string): Promise<any | null> => {
  try {
    await dbConnect();
    const project: any = await PortfolioModel.findOne({ locale: locale as "en" | "bn", slug }).lean();
    if (project) {
      return { ...project, _id: project._id.toString() };
    }
  } catch (e) {
    console.error("DB getPortfolioBySlug failed, using Velite fallback:", e);
  }
  return rawPortfolios.find(p => p.locale === locale && p.slug === slug) || null;
}

// Case Studies Query Helpers
export const getCaseStudies = (locale: string): CaseStudy[] => {
  return rawCaseStudies.filter(c => c.locale === locale);
}

export const getCaseStudyBySlug = (locale: string, slug: string): CaseStudy | null => {
  return rawCaseStudies.find(c => c.slug === slug && c.locale === locale) || null;
}

// Page Settings (Dynamic About/Privacy/Terms Editor)
export const getPageContent = async (key: string, locale: string): Promise<string> => {
  try {
    await dbConnect();
    const page: any = await PageModel.findOne({ key }).lean();
    if (page && page.content) {
      return page.content[locale] || page.content.en || "";
    }
  } catch (e) {
    console.error(`DB getPageContent for ${key} failed:`, e);
  }
  return "";
}

// Reference Resolution Helpers
export const getBlogAuthor = async (post: any): Promise<any | null> => {
  try {
    await dbConnect();
    const member: any = await TeamModel.findOne({ slug: post.author, locale: post.locale as "en" | "bn" }).lean();
    if (member) return { ...member, _id: member._id.toString() };
  } catch (e) {}
  return rawTeams.find(t => t.slug === post.author && t.locale === post.locale) || null;
}

export const getPortfolioCaseStudy = (portfolio: any): CaseStudy | null => {
  if (!portfolio.caseStudy) return null;
  return rawCaseStudies.find(c => c.slug === portfolio.caseStudy && c.locale === portfolio.locale) || null;
}

export const getKbRelatedArticles = (kb: Kb): Kb[] => {
  if (!kb.related || kb.related.length === 0) return [];
  return rawKbs.filter(k => kb.related.includes(k.slug) && k.locale === kb.locale);
}

// Contact Info Query Helper
export const getContactInfo = async (locale: string): Promise<any> => {
  try {
    await dbConnect();
    const page: any = await PageModel.findOne({ key: "contact_info" }).lean();
    if (page && page.content) {
      try {
        const rawContent = page.content[locale] || page.content.en || "{}";
        return JSON.parse(rawContent);
      } catch (err) {
        console.error("Failed to parse dynamic contact info JSON:", err);
      }
    }
  } catch (e) {
    console.error("DB getContactInfo failed:", e);
  }
  return null;
}
