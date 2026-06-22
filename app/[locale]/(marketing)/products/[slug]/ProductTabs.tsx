"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Image as ImageIcon, Video, Star, MessageSquare, Send, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductTabsProps {
  content: string;
  cover: string;
  title: string;
  demoUrl: string;
  videoUrl: string;
  overviewLabel: string;
  locale: string;
  slug: string;
  children: React.ReactNode; // Right column layout
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  badge: string;
}

export default function ProductTabs({
  content,
  cover,
  title,
  demoUrl,
  videoUrl,
  overviewLabel,
  locale,
  slug,
  children
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "comments" | "support">("details");

  // Mock Reviews
  const [reviews] = useState<Review[]>([]);

  // Dynamic Comments state
  const [comments, setComments] = useState<any[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const hasSession = document.cookie.split(";").some(
      (c) => c.trim().startsWith("admin_session=") || c.trim().startsWith("user_session=")
    );
    setIsUserLoggedIn(hasSession);
  }, []);

  useEffect(() => {
    if (!slug) return;
    const loadComments = async () => {
      setLoadingComments(true);
      try {
        const res = await fetch(`/api/products/${slug}/comments?locale=${locale}`);
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setComments(data.data || []);
        } else {
          console.warn("Expected JSON, but received non-JSON response from comments API");
        }
      } catch (err) {
        console.error("Failed to load comments", err);
      } finally {
        setLoadingComments(false);
      }
    };
    loadComments();
  }, [slug, locale]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      setPostError(locale === "bn" ? "দয়া করে সবগুলো ঘর পূরণ করুন।" : "Please fill in all fields.");
      return;
    }

    setPostError("");
    setPostSuccess(false);

    try {
      const res = await fetch(`/api/products/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: authorName.trim(),
          email: authorEmail.trim(),
          content: newComment.trim(),
          locale: locale || "en",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPostSuccess(true);
        setNewComment("");
        setAuthorName("");
        setAuthorEmail("");
        setComments([{ ...data.data, replies: [] }, ...comments]);
        setTimeout(() => setPostSuccess(false), 3000);
      } else {
        throw new Error(data.error || "Failed to post comment");
      }
    } catch (err: any) {
      setPostError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full">
      {/* Tabs Bar (Full Width across the screen container) */}
      <div className="border-b border-[#e1e4e6] dark:border-slate-800/60 bg-white dark:bg-[#070b13] text-sm sticky top-[64px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto select-none no-scrollbar">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 border-b-2 font-bold cursor-pointer transition-all whitespace-nowrap ${
                activeTab === "details"
                  ? "border-[#E8000E] text-slate-800 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              {locale === "bn" ? "আইটেম ডিটেইলস" : "Item Details"}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 border-b-2 font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1 ${
                activeTab === "reviews"
                  ? "border-[#E8000E] text-slate-800 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              {locale === "bn" ? "রিভিউসমূহ" : "Reviews"} <span className="text-xs text-amber-500">★★★★★</span>
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`py-4 border-b-2 font-bold cursor-pointer transition-all whitespace-nowrap ${
                activeTab === "comments"
                  ? "border-[#E8000E] text-slate-800 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              {locale === "bn" ? `মন্তব্য (${comments.length})` : `Comments (${comments.length})`}
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`py-4 border-b-2 font-bold cursor-pointer transition-all whitespace-nowrap ${
                activeTab === "support"
                  ? "border-[#E8000E] text-slate-800 dark:text-white"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              {locale === "bn" ? "সাপোর্ট" : "Support"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Switched Panels */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Product Cover Card */}
                <div className="bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-4 shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
                  <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden border border-border bg-muted">
                    <Image
                      src={cover}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                  </div>

                  {/* Cover actions */}
                  <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                    <Button variant="outline" className="text-xs font-semibold h-10 border-[#e1e4e6] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white gap-1 cursor-pointer" asChild>
                      <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 text-[#007cf5]" />
                        Live Preview
                      </a>
                    </Button>
                    <Button variant="outline" className="text-xs font-semibold h-10 border-[#e1e4e6] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white gap-1 cursor-pointer">
                      <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                      Screenshots
                    </Button>
                    <Button variant="outline" className="text-xs font-semibold h-10 border-[#e1e4e6] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white gap-1 cursor-pointer" asChild>
                      <a href={videoUrl || "#"} target="_blank" rel="noopener noreferrer">
                        <Video className="w-3.5 h-3.5 text-slate-500" />
                        Video Preview
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Item Description Overview Card */}
                <div className="bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-8 shadow-[0_2px_4px_rgba(0,0,0,0.01)] space-y-6">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-border pb-3">
                    {overviewLabel}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content || "" }} />
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-6 sm:p-8 shadow-[0_2px_4px_rgba(0,0,0,0.01)] space-y-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-border pb-3">
                  {locale === "bn" ? "গ্রাহক রিভিউসমূহ" : "Customer Reviews"}
                </h2>

                <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
                  {reviews.length > 0 ? (
                    reviews.map((rev) => (
                      <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-extrabold text-sm text-slate-800 dark:text-white">{rev.author}</span>
                            <span className="ml-3 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">{rev.badge}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3.5 h-3.5 ${
                                idx < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 py-6 text-center">
                      {locale === "bn" ? "এখনও কোনো রিভিউ নেই।" : "No reviews yet."}
                    </p>
                  )}
                </div>

                {/* Locked Review Submission Area */}
                {isUserLoggedIn && (
                  <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                    <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 text-center space-y-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-[#E8000E]">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                          {locale === "bn" ? "একটি রিভিউ যোগ করুন" : "Add a Customer Review"}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                          {locale === "bn"
                            ? "রিভিউ জমা দেওয়ার জন্য আপনাকে অবশ্যই অ্যাকাউন্টে লগইন করতে হবে এবং এই প্রোডাক্টটি ক্রয় করতে হবে।"
                            : "To submit a review, you must be logged in to your account and have purchased this specific product."}
                        </p>
                      </div>
                      <Button disabled className="bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold rounded-xl cursor-not-allowed text-xs px-5 h-9">
                        {locale === "bn" ? "রিভিউ লিখুন (লকড)" : "Write a Review (Locked)"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "comments" && (
              <div className="bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-6 sm:p-8 shadow-[0_2px_4px_rgba(0,0,0,0.01)] space-y-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-border pb-3">
                  {locale === "bn" ? "প্রশ্ন ও আলোচনা" : "Questions & Comments"}
                </h2>

                {/* Post a Comment Form */}
                <form onSubmit={handlePostComment} className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {locale === "bn" ? "একটি প্রশ্ন বা মন্তব্য করুন" : "Ask a question or leave a comment"}
                  </h3>
                  
                  {postSuccess && (
                    <div className="p-3 text-xs bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 rounded-lg font-medium">
                      {locale === "bn" ? "মন্তব্যটি সফলভাবে পোস্ট করা হয়েছে!" : "Comment posted successfully!"}
                    </div>
                  )}
                  {postError && (
                    <div className="p-3 text-xs bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg font-medium">
                      {postError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={locale === "bn" ? "আপনার নাম" : "Your Name"}
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary"
                    />
                    <input
                      type="email"
                      required
                      placeholder={locale === "bn" ? "আপনার ইমেইল" : "Your Email"}
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder={locale === "bn" ? "এখানে আপনার মন্তব্য লিখুন..." : "Type your question here..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary"
                  />
                  <Button type="submit" className="bg-[#E8000E] hover:bg-[#c6000c] text-white font-bold gap-2 cursor-pointer">
                    <Send className="w-4 h-4" />
                    {locale === "bn" ? "মন্তব্য পোস্ট করুন" : "Post Comment"}
                  </Button>
                </form>

                {/* Comments Thread */}
                {loadingComments ? (
                  <div className="py-8 flex justify-center items-center">
                    <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#E8000E]"></span>
                  </div>
                ) : comments.length === 0 ? (
                  <p className="text-center text-sm text-slate-500 py-6">
                    {locale === "bn" ? "কোনো মন্তব্য পাওয়া যায়নি। প্রথম মন্তব্যটি করুন!" : "No comments yet. Be the first to ask!"}
                  </p>
                ) : (
                  <div className="space-y-6">
                    {comments.map((comm) => (
                      <div key={comm._id} className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800/40">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                              {comm.name}
                            </span>
                            <span className="text-muted-foreground">
                              {new Date(comm.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-normal">{comm.content}</p>
                        </div>

                        {/* Replies */}
                        {comm.replies && comm.replies.map((reply: any) => (
                          <div key={reply._id} className="ml-8 bg-[#E8000E]/5 border border-[#E8000E]/10 p-4 rounded-xl space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-extrabold text-[#E8000E] flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5" />
                                {reply.name}
                              </span>
                              <span className="text-muted-foreground">
                                {new Date(reply.createdAt).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-normal">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "support" && (
              <div className="bg-white dark:bg-[#121824] border border-[#e1e4e6] dark:border-slate-800 rounded-lg p-6 sm:p-8 shadow-[0_2px_4px_rgba(0,0,0,0.01)] space-y-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-border pb-3">
                  {locale === "bn" ? "প্রোডাক্ট সাপোর্ট এবং কন্টাক্ট" : "Product Support & Contact"}
                </h2>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    {locale === "bn"
                      ? "ইকেয়ার দ্বারা তৈরি সকল প্রিমিয়াম প্রোডাক্টের সাথে ৬ মাসের ফ্রি ডেডিকেটেড টেকনিক্যাল সাপোর্ট অন্তর্ভুক্ত রয়েছে।"
                      : "All premium products built by Ecare include 6 months of free dedicated technical support."}
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-100 dark:border-slate-800/40 space-y-3">
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      {locale === "bn" ? "আমাদের সাপোর্ট পলিসি:" : "Our Support Commitment:"}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>{locale === "bn" ? "২৪ ঘণ্টার মধ্যে সমস্যার সমাধান বা রেসপন্স।" : "Response within 24 hours to all ticket submissions."}</li>
                      <li>{locale === "bn" ? "ভবিষ্যত যেকোনো আপডেট এবং কম্প্যাটিবিলিটি ফ্রি।" : "Future updates and version compatibilities included free."}</li>
                      <li>{locale === "bn" ? "কোড ইনস্টলেশন এবং গাইডলাইন সহায়তা।" : "Guidance on server configuration and deployments."}</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                      {locale === "bn" ? "সাপোর্ট টিমের সাথে যোগাযোগ করুন" : "Need Custom Integration Support?"}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      {locale === "bn"
                        ? "আপনার প্রজেক্টে এই সিস্টেম সেটআপ করতে সমস্যা হচ্ছে? সরাসরি ইমেইল করুন অথবা আমাদের সাথে চ্যাট করুন।"
                        : "Having trouble deploying this app on your systems? Get in touch with our elite engineering crew."}
                    </p>
                    <Button className="bg-[#E8000E] hover:bg-[#c6000c] text-white font-bold cursor-pointer" asChild>
                      <a href="/contact">{locale === "bn" ? "টিকিট সাবমিট করুন" : "Open a Support Ticket"}</a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Passed as static children (Checkout card and metafields) */}
          <div className="space-y-6">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
