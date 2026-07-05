"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  Send, 
  Trash2, 
  CheckCircle, 
  MessageSquare, 
  Search, 
  AlertTriangle,
  Inbox,
  MessageCircle
} from "lucide-react";

interface DBMessage {
  _id?: string;
  sessionId: string;
  sender: "user" | "admin" | "bot";
  senderName: string;
  message: string;
  date: string | Date;
  status: "unread" | "read";
}

interface ChatSessionItem {
  sessionId: string;
  name: string;
  lastMessage: string;
  lastSender: "user" | "admin" | "bot";
  lastDate: string;
  unreadCount: number;
  userName: string;
}

export default function AdminChatsPage() {
  const [sessions, setSessions] = useState<ChatSessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  
  const [loadingList, setLoadingList] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(0);

  // 1. Fetch sessions list on mount and poll every 3 seconds
  const fetchSessions = async (showLoading = false) => {
    if (showLoading) setLoadingList(true);
    try {
      const res = await fetch("/api/admin/live-chat");
      const data = await res.json();
      if (res.ok) {
        setSessions(data.data || []);
      } else {
        throw new Error(data.error || "Failed to load chats");
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      if (showLoading) setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchSessions(true);
    const interval = setInterval(() => fetchSessions(false), 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch/Poll messages for the selected session
  const fetchChatMessages = async (sessId: string, showLoading = false) => {
    if (showLoading) setLoadingChat(true);
    try {
      const res = await fetch(`/api/admin/live-chat/${sessId}`);
      const data = await res.json();
      if (res.ok) {
        setMessages(data.data || []);
        prevMessagesLength.current = (data.data || []).length;
      } else {
        throw new Error(data.error || "Failed to load message history");
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      if (showLoading) setLoadingChat(false);
    }
  };

  useEffect(() => {
    if (!selectedSessionId) {
      setMessages([]);
      return;
    }
    fetchChatMessages(selectedSessionId, true);
  }, [selectedSessionId]);

  // Polling for selected session messages
  useEffect(() => {
    if (!selectedSessionId) return;

    const interval = setInterval(() => {
      fetchChatMessages(selectedSessionId, false);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedSessionId]);

  // Scroll to bottom when messages changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSessionId || !replyText.trim() || sending) return;

    const text = replyText.trim();
    setReplyText("");
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/admin/live-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          message: text
        })
      });

      const data = await res.json();
      if (res.ok) {
        // Append locally instantly
        setMessages(prev => [...prev, data.data]);
        prevMessagesLength.current += 1;
        
        // Refresh session list
        fetchSessions(false);
      } else {
        throw new Error(data.error || "Failed to deliver message");
      }
    } catch (err: any) {
      setError(err.message);
      setReplyText(text); // Restore text in textarea
    } finally {
      setSending(false);
    }
  };

  const handleDeleteSession = async (sessId: string) => {
    if (!confirm("Are you sure you want to delete this chat session log?")) return;

    try {
      const res = await fetch(`/api/admin/live-chat/${sessId}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess("Chat session deleted!");
        setSessions(sessions.filter((s) => s.sessionId !== sessId));
        if (selectedSessionId === sessId) {
          setSelectedSessionId(null);
        }
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Deletion failed");
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleMarkAsRead = async (sessId: string) => {
    try {
      const res = await fetch(`/api/admin/live-chat/${sessId}`, { method: "PUT" });
      if (res.ok) {
        setSessions(sessions.map((s) => s.sessionId === sessId ? { ...s, unreadCount: 0 } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSessions = sessions.filter(s => 
    s.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSessionDetails = sessions.find(s => s.sessionId === selectedSessionId);

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-primary" />
            Live Chat Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Chat instantly with active website visitors. Realtime messages and notifications.
          </p>
        </div>
      </div>

      {/* Main Panel layout */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {/* Left Side: Sessions Sidebar */}
        <div className="w-80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl flex flex-col overflow-hidden shrink-0 shadow-sm">
          {/* Search bar */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search visitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
            {loadingList ? (
              <div className="p-8 flex justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Inbox className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                No active chat sessions.
              </div>
            ) : (
              filteredSessions.map((s) => (
                <div
                  key={s.sessionId}
                  onClick={() => {
                    setSelectedSessionId(s.sessionId);
                    handleMarkAsRead(s.sessionId);
                  }}
                  className={`p-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all relative ${
                    selectedSessionId === s.sessionId 
                      ? "bg-slate-50 dark:bg-slate-800/40 border-l-4 border-primary pl-3" 
                      : ""
                  } ${s.unreadCount > 0 ? "bg-primary/[0.03] dark:bg-primary/[0.01]" : ""}`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <div className="font-bold text-slate-800 dark:text-white truncate text-sm">
                      {s.userName}
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(s.lastDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1.5">
                    {s.lastSender === "admin" ? "You: " : ""}{s.lastMessage}
                  </p>

                  {s.unreadCount > 0 && (
                    <span className="absolute right-4 bottom-4 px-2 py-0.5 text-[9px] font-bold bg-primary text-white rounded-full">
                      {s.unreadCount} new
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Chat Console */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl flex flex-col overflow-hidden shadow-sm relative">
          {selectedSessionId ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between shrink-0 bg-slate-50/30 dark:bg-slate-900">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-slate-800 dark:text-white text-base leading-none">
                      {activeSessionDetails?.userName || "Visitor"}
                    </h2>
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full inline-block animate-pulse" />
                    <span className="text-xs text-slate-400 font-medium">Active Session</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">ID: {selectedSessionId}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSession(selectedSessionId)}
                    className="h-8 text-xs font-semibold hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 cursor-pointer border-slate-200 dark:border-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Alerts */}
              {success && (
                <div className="absolute top-20 left-4 right-4 z-10 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {success}
                </div>
              )}
              {error && (
                <div className="absolute top-20 left-4 right-4 z-10 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {error}
                </div>
              )}

              {/* Messages flow */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20 dark:bg-transparent">
                {loadingChat ? (
                  <div className="h-full flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div 
                      key={msg._id || i} 
                      className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-[10px] font-bold text-slate-400">
                          {msg.sender === "admin" ? "You" : msg.senderName}
                        </span>
                      </div>

                      <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === "admin" 
                          ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-tr-none shadow-xs" 
                          : msg.sender === "bot"
                          ? "bg-purple-50 text-purple-900 dark:bg-purple-950/20 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40 rounded-tl-none text-xs italic"
                          : "bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-slate-800/60 rounded-tl-none text-foreground shadow-xs"
                      }`}>
                        <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>
                      </div>

                      <span className="text-[9px] text-muted-foreground mt-1 px-1">
                        {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Reply Form input */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-slate-100 dark:border-slate-800/60 flex gap-2 items-center bg-white dark:bg-slate-900 shrink-0">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Send live reply to ${activeSessionDetails?.userName || "Visitor"}...`}
                  rows={2}
                  className="flex-1 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={!replyText.trim() || sending}
                  className="h-12 w-12 rounded-full p-0 flex items-center justify-center cursor-pointer shrink-0 bg-primary hover:bg-primary/95 text-white disabled:opacity-40"
                >
                  {sending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-slate-400 p-8">
              <MessageSquare className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-3" />
              <p className="font-bold text-slate-600 dark:text-slate-400">Live Chat Console</p>
              <p className="text-xs mt-1 text-slate-400">Select a visitor session from the sidebar to chat in real-time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
