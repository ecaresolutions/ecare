"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Edit2, Trash2, Check, AlertTriangle } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown";

interface CategoryItem {
  _id: string;
  name: string;
  type: "blog" | "product";
  locale: "en" | "bn";
  translationGroupId?: string;
}

interface CategoryGroup {
  id: string;
  en?: CategoryItem;
  bn?: CategoryItem;
  type: "blog" | "product";
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Active form values
  const [type, setType] = useState<"blog" | "product">("blog");
  const [nameEn, setNameEn] = useState("");
  const [nameBn, setNameBn] = useState("");

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data.data);
      } else {
        throw new Error(data.error || "Failed to load categories");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getGroupedCategories = (): CategoryGroup[] => {
    const groups: CategoryGroup[] = [];
    const visitedIds = new Set<string>();

    categories.forEach((cat) => {
      if (visitedIds.has(cat._id)) return;

      if (cat.translationGroupId) {
        const related = categories.filter((c) => c.translationGroupId === cat.translationGroupId);
        const en = related.find((c) => c.locale === "en");
        const bn = related.find((c) => c.locale === "bn");

        related.forEach((c) => visitedIds.add(c._id));

        groups.push({
          id: cat.translationGroupId,
          en,
          bn,
          type: cat.type,
        });
      } else {
        visitedIds.add(cat._id);
        groups.push({
          id: cat._id,
          en: cat.locale === "en" ? cat : undefined,
          bn: cat.locale === "bn" ? cat : undefined,
          type: cat.type,
        });
      }
    });

    return groups;
  };

  const resetForm = () => {
    setNameEn("");
    setNameBn("");
    setType("blog");
    setEditingId(null);
    setFormOpen(false);
    setActiveTab("en");
  };

  const handleEdit = (group: CategoryGroup) => {
    setEditingId(group.id);
    setType(group.type);
    setNameEn(group.en?.name || "");
    setNameBn(group.bn?.name || "");
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category translation group?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Category group deleted successfully!");
        fetchCategories();
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

    const payload = {
      type,
      en: nameEn ? { name: nameEn } : null,
      bn: nameBn ? { name: nameBn } : null,
    };

    try {
      const url = editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save category");
      }

      setSuccess(editingId ? "Category updated successfully!" : "Category created successfully!");
      resetForm();
      fetchCategories();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const grouped = getGroupedCategories();
  const blogCats = grouped.filter((c) => c.type === "blog");
  const productCats = grouped.filter((c) => c.type === "product");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Categories Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage bilingual categories for Blog Articles and Products.
          </p>
        </div>
        <Button
          onClick={() => { resetForm(); setFormOpen(true); }}
          className="bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Category
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

      {formOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-md animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            {editingId ? "Edit Category Translation Group" : "Create New Bilingual Category"}
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Dropdown
                label="Category Type"
                value={type}
                onChange={(val) => setType(val as "blog" | "product")}
              >
                <option value="blog">Blog Category</option>
                <option value="product">Product Category</option>
              </Dropdown>

              <div className="md:col-span-2 space-y-4">
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab("en")}
                    className={`py-2 px-4 font-semibold text-xs border-b-2 transition-colors cursor-pointer ${
                      activeTab === "en"
                        ? "border-red-600 text-red-600 dark:text-red-500"
                        : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    English Version
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("bn")}
                    className={`py-2 px-4 font-semibold text-xs border-b-2 transition-colors cursor-pointer ${
                      activeTab === "bn"
                        ? "border-red-600 text-red-600 dark:text-red-500"
                        : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    Bengali Version
                  </button>
                </div>

                {activeTab === "en" ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Name</label>
                    <Input
                      required={!nameBn}
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      placeholder="e.g. Development, SaaS, Plugins"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Name</label>
                    <Input
                      required={!nameEn}
                      value={nameBn}
                      onChange={(e) => setNameBn(e.target.value)}
                      placeholder="যেমনঃ ডেভেলপমেন্ট, প্লাগিনস"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={resetForm} className="cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer">
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Save Category
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Blog Categories list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            Blog Categories
          </h2>
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
          ) : blogCats.length === 0 ? (
            <p className="text-slate-400 text-sm py-4">No blog categories created yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {blogCats.map((group) => (
                <div key={group.id} className="py-3.5 flex justify-between items-center group">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">{group.en?.name || "—"}</div>
                    <div className="text-xs text-slate-400 mt-0.5 Bengali">{group.bn?.name || "অনূদিত নয়"}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(group)}
                      className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Categories list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            Product Categories
          </h2>
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
          ) : productCats.length === 0 ? (
            <p className="text-slate-400 text-sm py-4">No product categories created yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {productCats.map((group) => (
                <div key={group.id} className="py-3.5 flex justify-between items-center group">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">{group.en?.name || "—"}</div>
                    <div className="text-xs text-slate-400 mt-0.5 Bengali">{group.bn?.name || "অনূদিত নয়"}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(group)}
                      className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
