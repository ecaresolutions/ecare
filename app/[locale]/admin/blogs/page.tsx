"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Edit2, Trash2, Globe, FileText, Check, AlertTriangle } from "lucide-react";
import ImageUploader from "@/components/blocks/image-uploader";
import { Dropdown } from "@/components/ui/dropdown";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  featuredImage: string;
  locale: "en" | "bn";
  draft: boolean;
  categories?: string[];
  date?: string;
  seo?: {
    title: string;
    description: string;
    ogImage: string;
  };
  translationGroupId?: string;
}

interface BlogGroup {
  id: string; // translationGroupId or _id (if standalone)
  en?: BlogItem;
  bn?: BlogItem;
  author: string;
  draft: boolean;
  date?: string;
  categories?: string[];
  featuredImage: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Active Tab for localized fields
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");

  // Shared Form Fields
  const [author, setAuthor] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [draft, setDraft] = useState(false);
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories?type=blog");
      const data = await res.json();
      if (res.ok) {
        const groups: Record<string, { en: string; bn: string }> = {};
        data.data.forEach((cat: any) => {
          const groupId = cat.translationGroupId || cat._id;
          if (!groups[groupId]) {
            groups[groupId] = { en: "", bn: "" };
          }
          if (cat.locale === "en") groups[groupId].en = cat.name;
          if (cat.locale === "bn") groups[groupId].bn = cat.name;
        });
        const list = Object.entries(groups).map(([id, val]) => ({
          id,
          en: val.en || val.bn || "Untitled",
          bn: val.bn || val.en || "Untitled",
        }));
        setDbCategories(list);
      }
    } catch (err) {}
  };

  // English Version Fields
  const [titleEn, setTitleEn] = useState("");
  const [slugEn, setSlugEn] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [seoTitleEn, setSeoTitleEn] = useState("");
  const [seoDescEn, setSeoDescEn] = useState("");
  const [seoOgImageEn, setSeoOgImageEn] = useState("");

  // Bengali Version Fields
  const [titleBn, setTitleBn] = useState("");
  const [slugBn, setSlugBn] = useState("");
  const [contentBn, setContentBn] = useState("");
  const [excerptBn, setExcerptBn] = useState("");
  const [seoTitleBn, setSeoTitleBn] = useState("");
  const [seoDescBn, setSeoDescBn] = useState("");
  const [seoOgImageBn, setSeoOgImageBn] = useState("");

  const [saving, setSaving] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.data);
      } else {
        throw new Error(data.error || "Failed to load blogs");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCookie = (name: string): string => {
    if (typeof document === "undefined") return "";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
    return "";
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
    const username = getCookie("admin_username") || "admin";
    setAuthor(username);
  }, []);

  // Client-side grouping by translationGroupId
  const getGroupedBlogs = (): BlogGroup[] => {
    const groups: BlogGroup[] = [];
    const visitedIds = new Set<string>();

    blogs.forEach((blog) => {
      if (visitedIds.has(blog._id)) return;

      if (blog.translationGroupId) {
        const related = blogs.filter((b) => b.translationGroupId === blog.translationGroupId);
        const en = related.find((b) => b.locale === "en");
        const bn = related.find((b) => b.locale === "bn");

        related.forEach((b) => visitedIds.add(b._id));

        groups.push({
          id: blog.translationGroupId,
          en,
          bn,
          author: en?.author || bn?.author || "",
          draft: en ? en.draft : (bn ? bn.draft : false),
          date: en?.date || bn?.date,
          categories: en?.categories || bn?.categories || [],
          featuredImage: en?.featuredImage || bn?.featuredImage || "",
        });
      } else {
        visitedIds.add(blog._id);
        groups.push({
          id: blog._id,
          en: blog.locale === "en" ? blog : undefined,
          bn: blog.locale === "bn" ? blog : undefined,
          author: blog.author,
          draft: blog.draft,
          categories: blog.categories || [],
          date: blog.date,
          featuredImage: blog.featuredImage,
        });
      }
    });

    return groups;
  };

  const groupedBlogs = getGroupedBlogs();

  const resetForm = () => {
    // English Version Reset
    setTitleEn("");
    setSlugEn("");
    setContentEn("");
    setExcerptEn("");
    setSeoTitleEn("");
    setSeoDescEn("");
    setSeoOgImageEn("");

    // Bengali Version Reset
    setTitleBn("");
    setSlugBn("");
    setContentBn("");
    setExcerptBn("");
    setSeoTitleBn("");
    setSeoDescBn("");
    setSeoOgImageBn("");

    // Shared Fields Reset
    const username = getCookie("admin_username") || "admin";
    setAuthor(username);
    setFeaturedImage("");
    setDraft(false);
    setDate("");
    setSelectedCategory("");

    setEditingId(null);
    setFormOpen(false);
    setActiveTab("en");
  };

  const handleEdit = (group: BlogGroup) => {
    setEditingId(group.id);

    // English Populate
    if (group.en) {
      setTitleEn(group.en.title);
      setSlugEn(group.en.slug);
      setContentEn(group.en.content);
      setExcerptEn(group.en.excerpt);
      setSeoTitleEn(group.en.seo?.title || "");
      setSeoDescEn(group.en.seo?.description || "");
      setSeoOgImageEn(group.en.seo?.ogImage || "");
    } else {
      setTitleEn("");
      setSlugEn("");
      setContentEn("");
      setExcerptEn("");
      setSeoTitleEn("");
      setSeoDescEn("");
      setSeoOgImageEn("");
    }

    // Bengali Populate
    if (group.bn) {
      setTitleBn(group.bn.title);
      setSlugBn(group.bn.slug);
      setContentBn(group.bn.content);
      setExcerptBn(group.bn.excerpt);
      setSeoTitleBn(group.bn.seo?.title || "");
      setSeoDescBn(group.bn.seo?.description || "");
      setSeoOgImageBn(group.bn.seo?.ogImage || "");
    } else {
      setTitleBn("");
      setSlugBn("");
      setContentBn("");
      setExcerptBn("");
      setSeoTitleBn("");
      setSeoDescBn("");
      setSeoOgImageBn("");
    }

    // Shared Populate
    const baseObj = group.en || group.bn;
    if (baseObj) {
      setAuthor(baseObj.author);
      setFeaturedImage(baseObj.featuredImage);
      setDraft(baseObj.draft);
      setSelectedCategory(baseObj.categories && baseObj.categories.length > 0 ? baseObj.categories[0] : "");
      if (baseObj.date) {
        setDate(new Date(baseObj.date).toISOString().split("T")[0]);
      } else {
        setDate("");
      }
    }

    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post translation group?")) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Blog deleted successfully!");
        fetchBlogs();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error(data.error || "Deletion failed");
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    // Prepare unified payload
    const payload: any = {
      author,
      featuredImage,
      draft,
      date: date ? new Date(date) : new Date(),
      categories: selectedCategory ? [selectedCategory] : [],
      en: null,
      bn: null,
    };

    if (titleEn) {
      payload.en = {
        title: titleEn,
        slug: slugEn,
        content: contentEn,
        excerpt: excerptEn,
        seo: {
          title: seoTitleEn,
          description: seoDescEn,
          ogImage: seoOgImageEn,
        },
      };
    }

    if (titleBn) {
      payload.bn = {
        title: titleBn,
        slug: slugBn,
        content: contentBn,
        excerpt: excerptBn,
        seo: {
          title: seoTitleBn,
          description: seoDescBn,
          ogImage: seoOgImageBn,
        },
      };
    }

    try {
      const url = editingId ? `/api/admin/blogs/${editingId}` : "/api/admin/blogs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save blog");
      }

      setSuccess(editingId ? "Blog group updated successfully!" : "Blog group created successfully!");
      resetForm();
      fetchBlogs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Generate English slug dynamically from title if creating
  useEffect(() => {
    if (!editingId && titleEn) {
      setSlugEn(
        titleEn
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  }, [titleEn, editingId]);

  // Generate Bengali slug dynamically from title if creating
  useEffect(() => {
    if (!editingId && titleBn) {
      setSlugBn(
        titleBn
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  }, [titleBn, editingId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Blogs Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Create, update, and manage your dynamic multilingual blog posts in one screen.
          </p>
        </div>
        <Button
          onClick={() => { resetForm(); setFormOpen(true); }}
          className="bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Blog
        </Button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Editor Form Modal/Section */}
      {formOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            {editingId ? "Edit Multilingual Blog Post" : "Create New Multilingual Blog Post"}
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Shared Fields Section */}
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-border/40 p-5 rounded-2xl">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">Shared Metadata</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Author */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Author</label>
                  <div className="flex h-10 w-full rounded-md border border-border bg-slate-100 dark:bg-slate-800/80 px-3 py-2 text-sm text-slate-500 font-semibold select-none items-center">
                    {author}
                  </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Featured Image</label>
                  <div className="flex gap-2 items-center">
                    <Input
                      required
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      placeholder="Image URL or upload"
                      className="flex-1"
                    />
                    <ImageUploader value={featuredImage} onChange={setFeaturedImage} />
                  </div>
                </div>

                {/* Category Dropdown */}
                <Dropdown
                  label="Category"
                  value={selectedCategory}
                  onChange={(val) => setSelectedCategory(val)}
                >
                  <option value="">Select Category...</option>
                  {dbCategories.map((cat: any) => (
                    <option key={cat.id} value={cat.en}>
                      {activeTab === "en" ? cat.en : cat.bn}
                    </option>
                  ))}
                  {dbCategories.length === 0 && (
                    <>
                      <option value="Hosting">Hosting</option>
                      <option value="WordPress">WordPress</option>
                      <option value="SaaS">SaaS</option>
                    </>
                  )}
                </Dropdown>

                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Publish Date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Draft Status */}
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="draft"
                  checked={draft}
                  onChange={(e) => setDraft(e.target.checked)}
                  className="w-4.5 h-4.5 accent-red-600 rounded"
                />
                <label htmlFor="draft" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Save as Draft (hidden from public site)
                </label>
              </div>
            </div>

            {/* Language Tab Selection */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`py-2.5 px-5 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
                  activeTab === "en"
                    ? "border-red-600 text-red-600 dark:text-red-500"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                English Version {titleEn ? "✓" : ""}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bn")}
                className={`py-2.5 px-5 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
                  activeTab === "bn"
                    ? "border-red-600 text-red-600 dark:text-red-500"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Bengali Version {titleBn ? "✓" : ""}
              </button>
            </div>

            {/* English Version Fields */}
            {activeTab === "en" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Title</label>
                    <Input
                      required={!!titleEn || (!titleEn && !titleBn)} // required if En starts, or both empty
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Next-Gen Headless Web Stack"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Slug (URL)</label>
                    <Input
                      required={!!titleEn}
                      value={slugEn}
                      onChange={(e) => setSlugEn(e.target.value)}
                      placeholder="e.g. next-gen-headless-web-stack"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Excerpt / Description</label>
                  <Input
                    required={!!titleEn}
                    value={excerptEn}
                    onChange={(e) => setExcerptEn(e.target.value)}
                    placeholder="Short description of this article..."
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Content Body (Markdown)</label>
                  <textarea
                    required={!!titleEn}
                    rows={10}
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                    placeholder="Write your article content here in Markdown..."
                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y font-mono"
                  />
                </div>

                {/* SEO Accordion */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-4">English SEO Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">SEO Title</label>
                      <Input value={seoTitleEn} onChange={(e) => setSeoTitleEn(e.target.value)} placeholder="Meta Title" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">SEO Description</label>
                      <Input value={seoDescEn} onChange={(e) => setSeoDescEn(e.target.value)} placeholder="Meta Description" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">SEO OG Image URL</label>
                      <Input value={seoOgImageEn} onChange={(e) => setSeoOgImageEn(e.target.value)} placeholder="Social share image" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bengali Version Fields */}
            {activeTab === "bn" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Title</label>
                    <Input
                      value={titleBn}
                      onChange={(e) => setTitleBn(e.target.value)}
                      placeholder="যেমনঃ নোড জেএস অ্যাপস হোস্ট করার নিয়ম"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Slug (URL)</label>
                    <Input
                      required={!!titleBn}
                      value={slugBn}
                      onChange={(e) => setSlugBn(e.target.value)}
                      placeholder="যেমনঃ nodejs-apps-host-cpanel"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Excerpt / Description</label>
                  <Input
                    required={!!titleBn}
                    value={excerptBn}
                    onChange={(e) => setExcerptBn(e.target.value)}
                    placeholder="আর্টিকেলের ছোট বিবরণ..."
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Content Body (Markdown)</label>
                  <textarea
                    required={!!titleBn}
                    rows={10}
                    value={contentBn}
                    onChange={(e) => setContentBn(e.target.value)}
                    placeholder="এখানে বাংলায় আর্টিকেলের বিষয়বস্তু লিখুন..."
                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y font-mono"
                  />
                </div>

                {/* SEO Accordion */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-4">Bengali SEO Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">SEO Title</label>
                      <Input value={seoTitleBn} onChange={(e) => setSeoTitleBn(e.target.value)} placeholder="মেটা শিরোনাম" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">SEO Description</label>
                      <Input value={seoDescBn} onChange={(e) => setSeoDescBn(e.target.value)} placeholder="মেটা বিবরণ" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">SEO OG Image URL</label>
                      <Input value={seoOgImageBn} onChange={(e) => setSeoOgImageBn(e.target.value)} placeholder="Social share image" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end border-t border-slate-200 dark:border-slate-800 pt-4">
              <Button type="button" variant="outline" onClick={resetForm} className="cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold cursor-pointer">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Article Group"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs Grouped List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : groupedBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <FileText className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            No articles found. Click "Add New Blog" or seed the database on the Dashboard!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Article Title</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Slug / Link</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Available Languages</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {groupedBlogs.map((group) => {
                  const hasEn = !!group.en;
                  const hasBn = !!group.bn;

                  return (
                    <tr key={group.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20">
                      <td className="p-4">
                        {group.en && (
                          <div className="font-bold text-slate-800 dark:text-white line-clamp-1">{group.en.title}</div>
                        )}
                        {group.bn && (
                          <div className={`text-slate-700 dark:text-slate-300 line-clamp-1 text-sm ${group.en ? "mt-1 italic font-medium" : "font-bold"}`}>
                            {group.bn.title}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                          Author: {group.author}
                        </div>
                      </td>
                      <td className="p-4 space-y-1 font-mono text-[10px] text-slate-500">
                        {group.en && <div><span className="font-semibold text-slate-400">EN:</span> {group.en.slug}</div>}
                        {group.bn && <div><span className="font-semibold text-slate-400">BN:</span> {group.bn.slug}</div>}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {hasEn && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                              <Globe className="w-3 h-3" />
                              English
                            </span>
                          )}
                          {hasBn && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-900/40">
                              <Globe className="w-3 h-3" />
                              Bengali
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${group.draft ? "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"}`}>
                          {group.draft ? "Draft" : "Published"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(group)} className="h-8 w-8 p-0 cursor-pointer">
                            <Edit2 className="w-4 h-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(group.id)} className="h-8 w-8 p-0 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
