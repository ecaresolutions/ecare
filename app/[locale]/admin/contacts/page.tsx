"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Trash2, CheckCircle, MailOpen, AlertTriangle } from "lucide-react";

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  product?: string;
  supportType?: string;
  orderId?: string;
  status: "unread" | "read";
  date: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      if (res.ok) {
        setContacts(data.data);
      } else {
        throw new Error(data.error || "Failed to load messages");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: "read" | "unread") => {
    const nextStatus = currentStatus === "read" ? "unread" : "read";
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setContacts(contacts.map((c) => (c._id === id ? { ...c, status: nextStatus } : c)));
      } else {
        throw new Error(data.error || "Failed to update status");
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Message deleted successfully!");
        setContacts(contacts.filter((c) => c._id !== id));
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error(data.error || "Deletion failed");
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Contacts Inbox</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Review dynamic feedback messages and customer support form entries.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Messages List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <Mail className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            No contact submissions received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Sender</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Subject & Message</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Metadata</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {contacts.map((c) => (
                  <tr key={c._id} className={`hover:bg-slate-50/30 dark:hover:bg-slate-800/20 ${c.status === "unread" ? "bg-red-500/3 dark:bg-red-500/1 font-semibold" : ""}`}>
                    <td className="p-4 shrink-0">
                      <div className="font-bold text-slate-800 dark:text-white">{c.name}</div>
                      <a href={`mailto:${c.email}`} className="text-xs text-red-600 hover:underline">{c.email}</a>
                    </td>
                    <td className="p-4 max-w-sm">
                      <div className="font-bold text-slate-800 dark:text-white line-clamp-1">{c.subject}</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3 whitespace-pre-line">{c.message}</p>
                    </td>
                    <td className="p-4 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      {c.supportType && <div><span className="font-bold text-slate-400">Type:</span> {c.supportType}</div>}
                      {c.product && <div><span className="font-bold text-slate-400">Product:</span> {c.product}</div>}
                      {c.orderId && <div><span className="font-bold text-slate-400">Order ID:</span> {c.orderId}</div>}
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-medium">
                      {new Date(c.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4 text-right shrink-0">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(c._id, c.status)}
                          title={c.status === "unread" ? "Mark as Read" : "Mark as Unread"}
                          className="h-8 w-8 p-0 cursor-pointer"
                        >
                          {c.status === "unread" ? (
                            <MailOpen className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Mail className="w-4 h-4 text-slate-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(c._id)}
                          className="h-8 w-8 p-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
