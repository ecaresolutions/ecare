"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Edit2, Trash2, Globe, Users, Check, AlertTriangle } from "lucide-react";
import ImageUploader from "@/components/blocks/image-uploader";

interface TeamItem {
  _id: string;
  name: string;
  role: string;
  slug: string;
  avatar: string;
  bio: string;
  skills: string[];
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  locale: "en" | "bn";
  translationGroupId?: string;
}

interface TeamGroup {
  id: string; // translationGroupId or _id (if standalone)
  en?: TeamItem;
  bn?: TeamItem;
  avatar: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Active tab for localized fields
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");

  // Shared Fields
  const [avatar, setAvatar] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  // English Fields
  const [nameEn, setNameEn] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [slugEn, setSlugEn] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [skillsEnStr, setSkillsEnStr] = useState("");

  // Bengali Fields
  const [nameBn, setNameBn] = useState("");
  const [roleBn, setRoleBn] = useState("");
  const [slugBn, setSlugBn] = useState("");
  const [bioBn, setBioBn] = useState("");
  const [skillsBnStr, setSkillsBnStr] = useState("");

  const [saving, setSaving] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (res.ok) {
        setTeam(data.data);
      } else {
        throw new Error(data.error || "Failed to load team");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const getGroupedTeam = (): TeamGroup[] => {
    const groups: TeamGroup[] = [];
    const visitedIds = new Set<string>();

    team.forEach((member) => {
      if (visitedIds.has(member._id)) return;

      if (member.translationGroupId) {
        const related = team.filter((t) => t.translationGroupId === member.translationGroupId);
        const en = related.find((t) => t.locale === "en");
        const bn = related.find((t) => t.locale === "bn");

        related.forEach((t) => visitedIds.add(t._id));

        groups.push({
          id: member.translationGroupId,
          en,
          bn,
          avatar: en?.avatar || bn?.avatar || "",
          socials: en?.socials || bn?.socials || {},
        });
      } else {
        visitedIds.add(member._id);
        groups.push({
          id: member._id,
          en: member.locale === "en" ? member : undefined,
          bn: member.locale === "bn" ? member : undefined,
          avatar: member.avatar,
          socials: member.socials || {},
        });
      }
    });

    return groups;
  };

  const groupedTeam = getGroupedTeam();

  const resetForm = () => {
    // English Reset
    setNameEn("");
    setRoleEn("");
    setSlugEn("");
    setBioEn("");
    setSkillsEnStr("");

    // Bengali Reset
    setNameBn("");
    setRoleBn("");
    setSlugBn("");
    setBioBn("");
    setSkillsBnStr("");

    // Shared Reset
    setAvatar("");
    setTwitter("");
    setLinkedin("");
    setGithub("");
    setWebsite("");

    setEditingId(null);
    setFormOpen(false);
    setActiveTab("en");
  };

  const handleEdit = (group: TeamGroup) => {
    setEditingId(group.id);

    // English Populate
    if (group.en) {
      setNameEn(group.en.name);
      setRoleEn(group.en.role);
      setSlugEn(group.en.slug);
      setBioEn(group.en.bio);
      setSkillsEnStr(group.en.skills.join(", "));
    } else {
      setNameEn("");
      setRoleEn("");
      setSlugEn("");
      setBioEn("");
      setSkillsEnStr("");
    }

    // Bengali Populate
    if (group.bn) {
      setNameBn(group.bn.name);
      setRoleBn(group.bn.role);
      setSlugBn(group.bn.slug);
      setBioBn(group.bn.bio);
      setSkillsBnStr(group.bn.skills.join(", "));
    } else {
      setNameBn("");
      setRoleBn("");
      setSlugBn("");
      setBioBn("");
      setSkillsBnStr("");
    }

    // Shared Populate
    setAvatar(group.avatar);
    setTwitter(group.socials?.twitter || "");
    setLinkedin(group.socials?.linkedin || "");
    setGithub(group.socials?.github || "");
    setWebsite(group.socials?.website || "");

    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member translation group?")) return;

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Team member deleted successfully!");
        fetchTeam();
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

    const payload: any = {
      avatar,
      socials: {
        twitter,
        linkedin,
        github,
        website,
      },
      en: null,
      bn: null,
    };

    if (nameEn) {
      payload.en = {
        name: nameEn,
        role: roleEn,
        slug: slugEn,
        bio: bioEn,
        skills: skillsEnStr.split(",").map((s) => s.trim()).filter(Boolean),
      };
    }

    if (nameBn) {
      payload.bn = {
        name: nameBn,
        role: roleBn,
        slug: slugBn,
        bio: bioBn,
        skills: skillsBnStr.split(",").map((s) => s.trim()).filter(Boolean),
      };
    }

    try {
      const url = editingId ? `/api/admin/team/${editingId}` : "/api/admin/team";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save team member");
      }

      setSuccess(editingId ? "Team member updated successfully!" : "Team member created successfully!");
      resetForm();
      fetchTeam();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Generate English slug dynamically
  useEffect(() => {
    if (!editingId && nameEn) {
      setSlugEn(
        nameEn
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  }, [nameEn, editingId]);

  // Generate Bengali slug dynamically
  useEffect(() => {
    if (!editingId && nameBn) {
      setSlugBn(
        nameBn
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  }, [nameBn, editingId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Team Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Create, update, and manage your dynamic bilingual team profiles.
          </p>
        </div>
        <Button
          onClick={() => { resetForm(); setFormOpen(true); }}
          className="bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
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
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            {editingId ? "Edit Multilingual Team Profile" : "Create New Multilingual Team Profile"}
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Shared Fields */}
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-border/40 p-5 rounded-2xl">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">Shared Metadata</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Avatar Image</label>
                  <div className="flex gap-2 items-center">
                    <Input
                      required
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="Avatar image URL"
                      className="flex-1"
                    />
                    <ImageUploader value={avatar} onChange={setAvatar} />
                  </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Twitter URL</label>
                    <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://twitter.com/..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">LinkedIn URL</label>
                    <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">GitHub URL</label>
                    <Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Website/Portfolio</label>
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
                  </div>
                </div>
              </div>
            </div>

            {/* Language Tab Selector */}
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
                English Version {nameEn ? "✓" : ""}
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
                Bengali Version {nameBn ? "✓" : ""}
              </button>
            </div>

            {/* English Tabs */}
            {activeTab === "en" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Name</label>
                    <Input
                      required={!!nameEn || (!nameEn && !nameBn)}
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Role</label>
                    <Input
                      required={!!nameEn}
                      value={roleEn}
                      onChange={(e) => setRoleEn(e.target.value)}
                      placeholder="e.g. Senior Tech Lead"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Slug (URL)</label>
                    <Input
                      required={!!nameEn}
                      value={slugEn}
                      onChange={(e) => setSlugEn(e.target.value)}
                      placeholder="e.g. john-doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Bio</label>
                  <textarea
                    required={!!nameEn}
                    rows={4}
                    value={bioEn}
                    onChange={(e) => setBioEn(e.target.value)}
                    placeholder="Short professional bio..."
                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">English Skills (Comma-separated)</label>
                  <Input
                    value={skillsEnStr}
                    onChange={(e) => setSkillsEnStr(e.target.value)}
                    placeholder="e.g. React, Next.js, Node.js, Mongoose"
                  />
                </div>
              </div>
            )}

            {/* Bengali Tabs */}
            {activeTab === "bn" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Name</label>
                    <Input
                      value={nameBn}
                      onChange={(e) => setNameBn(e.target.value)}
                      placeholder="যেমনঃ জন ডো"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Role</label>
                    <Input
                      required={!!nameBn}
                      value={roleBn}
                      onChange={(e) => setRoleBn(e.target.value)}
                      placeholder="যেমনঃ সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Slug (URL)</label>
                    <Input
                      required={!!nameBn}
                      value={slugBn}
                      onChange={(e) => setSlugBn(e.target.value)}
                      placeholder="যেমনঃ john-doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Bio</label>
                  <textarea
                    required={!!nameBn}
                    rows={4}
                    value={bioBn}
                    onChange={(e) => setBioBn(e.target.value)}
                    placeholder="পেশাগত সংক্ষিপ্ত বিবরণ বাংলায়..."
                    className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Bengali Skills (Comma-separated)</label>
                  <Input
                    value={skillsBnStr}
                    onChange={(e) => setSkillsBnStr(e.target.value)}
                    placeholder="যেমনঃ রিঅ্যাক্ট, নোড জেএস, মঙ্গোডিবি"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end border-t border-slate-200 dark:border-slate-800 pt-4">
              <Button type="button" variant="outline" onClick={resetForm} className="cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#e8000e] hover:bg-[#e8000e]/90 text-white font-bold cursor-pointer">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile Group"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grouped Team List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : groupedTeam.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <Users className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            No team members found. Click "Add Team Member" or seed the database on the Dashboard!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Avatar</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Team Member</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Role / Slug</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Languages</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {groupedTeam.map((group) => {
                  const hasEn = !!group.en;
                  const hasBn = !!group.bn;

                  return (
                    <tr key={group.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20">
                      <td className="p-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border/40">
                          {group.avatar ? (
                            <img src={group.avatar} alt="Avatar" className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold uppercase text-lg">
                              {(group.en?.name || group.bn?.name || "?").substring(0, 1)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {group.en && (
                          <div className="font-bold text-slate-800 dark:text-white">{group.en.name}</div>
                        )}
                        {group.bn && (
                          <div className={`text-slate-700 dark:text-slate-300 text-sm ${group.en ? "mt-1 italic font-medium" : "font-bold"}`}>
                            {group.bn.name}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {group.en && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{group.en.role} <span className="font-mono text-slate-400">({group.en.slug})</span></div>
                        )}
                        {group.bn && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{group.bn.role} <span className="font-mono text-slate-400">({group.bn.slug})</span></div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {hasEn && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                              <Globe className="w-3 h-3" />
                              EN
                            </span>
                          )}
                          {hasBn && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-900/40">
                              <Globe className="w-3 h-3" />
                              BN
                            </span>
                          )}
                        </div>
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
