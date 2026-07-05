"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { X, Send, MessageCircle, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";

interface DBMessage {
  _id?: string;
  sessionId: string;
  sender: "user" | "admin" | "bot";
  senderName: string;
  message: string;
  date: string | Date;
}

export default function LiveChat() {
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  // Hide chat widget on admin paths
  if (pathname?.includes("/admin")) {
    return null;
  }
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  
  // Pre-chat form states
  const [chatMode, setChatMode] = useState<"form" | "live">("form");
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(0);

  // Translations
  const t = {
    en: {
      title: "Ecare Live Chat",
      status: "Online",
      placeholder: "Type a message...",
      send: "Send",
      preChatTitle: "Start Live Chat",
      preChatSub: "Please fill in the form below to chat with our team.",
      labelName: "Your Name",
      labelEmail: "Email Address",
      labelPhone: "Phone Number",
      labelMessage: "How can we help you?",
      btnStart: "Start Chat",
      errName: "Name must be at least 2 characters",
      errEmail: "Please enter a valid email address",
      errPhone: "Please enter a valid phone number",
      errMessage: "Message must be at least 5 characters",
      resetChat: "Reset Chat",
    },
    bn: {
      title: "ইকেয়ার লাইভ চ্যাট",
      status: "অনলাইন",
      placeholder: "মেসেজ লিখুন...",
      send: "পাঠান",
      preChatTitle: "লাইভ চ্যাট শুরু করুন",
      preChatSub: "আমাদের টিমের সাথে চ্যাট করতে নিচের ফরমটি পূরণ করুন।",
      labelName: "আপনার নাম",
      labelEmail: "ইমেইল ঠিকানা",
      labelPhone: "ফোন নম্বর",
      labelMessage: "আমরা আপনাকে কীভাবে সাহায্য করতে পারি?",
      btnStart: "চ্যাট শুরু করুন",
      errName: "নাম কমপক্ষে ২ অক্ষরের হতে হবে",
      errEmail: "একটি সঠিক ইমেইল এড্রেস লিখুন",
      errPhone: "একটি সঠিক ফোন নম্বর লিখুন",
      errMessage: "মেসেজ কমপক্ষে ৫ অক্ষরের হতে হবে",
      resetChat: "রিসেট চ্যাট",
    }
  }[locale === "bn" ? "bn" : "en"];

  // 1. Initial configuration
  useEffect(() => {
    let storedSessionId = localStorage.getItem("ecare_chat_session_id");
    let storedUserName = localStorage.getItem("ecare_chat_user_name");
    
    if (storedSessionId && storedUserName) {
      setSessionId(storedSessionId);
      setChatMode("live");
      loadHistory(storedSessionId);
    } else {
      setChatMode("form");
    }
  }, [locale]);

  const loadHistory = async (sessId: string) => {
    try {
      const res = await fetch(`/api/live-chat/client?sessionId=${sessId}`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setMessages(data.data);
        prevMessagesLength.current = data.data.length;
      }
    } catch (err) {
      console.error("Failed to load chat history:", err);
    }
  };

  // 2. Poll server for new messages
  useEffect(() => {
    if (!sessionId || chatMode !== "live") return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/live-chat/client?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          if (data.data.length > prevMessagesLength.current) {
            setMessages(data.data);
            
            const lastMsg = data.data[data.data.length - 1];
            if (lastMsg.sender === "admin" && !isOpen) {
              setHasNewMessage(true);
            }
            
            prevMessagesLength.current = data.data.length;
          }
        }
      } catch (err) {
        console.error("Error polling messages:", err);
      }
    };

    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId, chatMode, isOpen]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessageToDB = async (sender: "user" | "admin" | "bot", name: string, text: string, currentSessId = sessionId) => {
    try {
      const res = await fetch("/api/live-chat/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: currentSessId,
          sender,
          senderName: name,
          message: text
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, data.data]);
        prevMessagesLength.current += 1;
      }
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  // Handle Pre-chat Submit
  const handlePreChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: Record<string, string> = {};
    if (formFields.name.trim().length < 2) errors.name = t.errName;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formFields.email.trim())) errors.email = t.errEmail;
    
    if (formFields.phone.trim().length < 8) errors.phone = t.errPhone;
    if (formFields.message.trim().length < 5) errors.message = t.errMessage;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({});

    const newSessId = "session_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now();
    localStorage.setItem("ecare_chat_session_id", newSessId);
    localStorage.setItem("ecare_chat_user_name", formFields.name.trim());
    
    setSessionId(newSessId);

    // 1. Submit Visitor System Metadata Message
    const metadataText = `[Visitor Details]\nName: ${formFields.name.trim()}\nEmail: ${formFields.email.trim()}\nPhone: ${formFields.phone.trim()}`;
    await saveMessageToDB("bot", "System", metadataText, newSessId);

    // 2. Submit initial message from user
    await saveMessageToDB("user", formFields.name.trim(), formFields.message.trim(), newSessId);

    setIsLoading(false);
    setChatMode("live");
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || chatMode !== "live") return;

    const text = inputValue.trim();
    setInputValue("");

    const storedUserName = localStorage.getItem("ecare_chat_user_name") || "Visitor";
    await saveMessageToDB("user", storedUserName, text);
  };

  const handleResetChat = () => {
    localStorage.removeItem("ecare_chat_session_id");
    localStorage.removeItem("ecare_chat_user_name");
    setSessionId("");
    setMessages([]);
    setFormFields({ name: "", email: "", phone: "", message: "" });
    setChatMode("form");
    prevMessagesLength.current = 0;
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 1. CHAT WINDOW */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[550px] bg-white/95 dark:bg-[#0c101b]/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-900/80 p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  EC
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-none">{t.title}</h3>
                <span className="text-[10px] text-zinc-200/80 flex items-center gap-1 mt-1 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                  {t.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {chatMode === "live" && (
                <button
                  onClick={handleResetChat}
                  className="text-[10px] px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded font-semibold text-white cursor-pointer"
                >
                  {t.resetChat}
                </button>
              )}
              <button 
                onClick={toggleChat}
                className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          {chatMode === "form" ? (
            /* PRE-CHAT FORM VIEW */
            <form onSubmit={handlePreChatSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col justify-center bg-zinc-50/40 dark:bg-transparent">
              <div className="text-center pb-2 shrink-0">
                <h4 className="font-bold text-slate-800 dark:text-white text-base">{t.preChatTitle}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.preChatSub}</p>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">{t.labelName}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formFields.name}
                      onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>
                  {formErrors.name && <span className="text-[10px] text-red-500 font-medium block">{formErrors.name}</span>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">{t.labelEmail}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formFields.email}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>
                  {formErrors.email && <span className="text-[10px] text-red-500 font-medium block">{formErrors.email}</span>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">{t.labelPhone}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formFields.phone}
                      onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                      placeholder="e.g. +8801700000000"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>
                  {formErrors.phone && <span className="text-[10px] text-red-500 font-medium block">{formErrors.phone}</span>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">{t.labelMessage}</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      required
                      rows={2}
                      value={formFields.message}
                      onChange={(e) => setFormFields({ ...formFields, message: e.target.value })}
                      placeholder="Enter your support query..."
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground resize-none"
                    />
                  </div>
                  {formErrors.message && <span className="text-[10px] text-red-500 font-medium block">{formErrors.message}</span>}
                </div>
              </div>

              {/* Start Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/95 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t.btnStart
                )}
              </button>
            </form>
          ) : (
            /* ACTIVE LIVE CHAT VIEW */
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-transparent">
                {messages.map((msg, i) => {
                  // Do not show the system metadata message bubble to the user
                  if (msg.sender === "bot" && msg.message.startsWith("[Visitor Details]")) return null;
                  
                  return (
                    <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === "user" 
                          ? "bg-primary text-white rounded-tr-none" 
                          : "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-tl-none shadow-sm"
                      }`}>
                        <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>
                      </div>
                      
                      <span className="text-[9px] text-muted-foreground mt-1 px-1">
                        {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input form footer */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-100 dark:border-zinc-800/50 flex gap-2 items-center bg-white dark:bg-[#0c101b] shrink-0">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-primary disabled:opacity-40 hover:bg-primary/95 text-white rounded-full transition-colors cursor-pointer"
                  aria-label={t.send}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* 2. FLOATING TRIGGER BUTTON */}
      <button
        onClick={toggleChat}
        className={`relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/95 hover:to-purple-700/95 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group ${
          isOpen ? "rotate-90" : "animate-bounce"
        }`}
        style={{ animationDuration: '3s' }}
        aria-label="Toggle Support Chat"
      >
        <span className="absolute -inset-1 rounded-full bg-primary/30 animate-ping opacity-75 pointer-events-none group-hover:hidden" />
        
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}

        {/* Unread message indicator */}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-[#0b0b19] rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
}
