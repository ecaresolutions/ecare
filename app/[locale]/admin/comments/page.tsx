"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MessageCircle, Trash2, CheckCircle, AlertTriangle, Send, CornerDownRight } from "lucide-react";

interface ReplyItem {
  _id: string;
  name: string;
  email: string;
  content: string;
  locale: "en" | "bn";
  isAdminReply: boolean;
  createdAt: string;
}

interface CommentItem {
  _id: string;
  productSlug: string;
  name: string;
  email: string;
  content: string;
  locale: "en" | "bn";
  isAdminReply: boolean;
  replies: ReplyItem[];
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Track open reply forms by comment ID
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/comments");
      const data = await res.json();
      if (res.ok) {
        setComments(data.data);
      } else {
        throw new Error(data.error || "Failed to load comments");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment and all its replies?")) return;

    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Comment deleted successfully!");
        setComments(comments.filter((c) => c._id !== id));
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error(data.error || "Deletion failed");
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    if (!replyText.trim()) return;
    setSubmittingReply(true);

    try {
      const res = await fetch(`/api/admin/comments/${commentId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Reply posted successfully!");
        // Update comments local state
        setComments(
          comments.map((c) => {
            if (c._id === commentId) {
              return {
                ...c,
                replies: [...c.replies, data.data],
              };
            }
            return c;
          })
        );
        setReplyText("");
        setReplyingTo(null);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error(data.error || "Failed to post reply");
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    } finally {
      setSubmittingReply(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Product Comments</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Moderate user questions and comments from product details tabs.
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

      {loading ? (
        <div className="p-12 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-12 text-center text-slate-500 dark:text-slate-400">
          <MessageCircle className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
          No comments received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-white">{comment.name}</span>
                    <span className="text-xs text-slate-400">({comment.email})</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                    <span className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {comment.productSlug}
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">
                      {comment.locale === "bn" ? "Bengali (BN)" : "English (EN)"}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {new Date(comment.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(comment._id)}
                  className="hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  Delete
                </Button>
              </div>

              {/* Comment Content */}
              <div className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed mb-4">
                {comment.content}
              </div>

              {/* Replies Section */}
              {comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-4 mb-4">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="flex gap-2">
                      <CornerDownRight className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                      <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-bold text-xs ${
                                reply.isAdminReply
                                  ? "bg-red-600 text-white px-2 py-0.5 rounded-md"
                                  : "text-slate-800 dark:text-white"
                              }`}
                            >
                              {reply.name}
                            </span>
                            {reply.isAdminReply && (
                              <span className="text-[10px] text-red-500 font-bold tracking-wider uppercase">
                                Staff
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 font-medium">({reply.email})</span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(reply.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply trigger / input */}
              <div className="pt-2">
                {replyingTo === comment._id ? (
                  <div className="space-y-3">
                    <textarea
                      placeholder="Write your official response..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full min-h-[100px] text-sm p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-transparent dark:text-white"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText("");
                        }}
                        className="cursor-pointer"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={submittingReply || !replyText.trim()}
                        onClick={() => handleReplySubmit(comment._id)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer"
                      >
                        {submittingReply ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                        ) : (
                          <Send className="w-4 h-4 mr-1.5" />
                        )}
                        Send Reply
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(comment._id);
                      setReplyText("");
                    }}
                    className="border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    Reply as Ecare Team
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
