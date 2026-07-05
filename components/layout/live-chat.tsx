"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";

interface DBMessage {
  _id?: string;
  sessionId: string;
  sender: "user" | "admin" | "bot";
  senderName: string;
  message: string;
  date: string | Date;
}

export default function LiveChat() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  
  // Custom Live chat flows
  const [userName, setUserName] = useState("");
  const [chatMode, setChatMode] = useState<"greeting" | "ask_name" | "live">("greeting");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(0);

  // Translations
  const t = {
    en: {
      title: "Ecare Live Chat",
      status: "Online",
      placeholder: "Type a message...",
      send: "Send",
      servicesTitle: "Our Services",
      pricingTitle: "Products & Pricing",
      humanTitle: "Chat with a Human Agent",
      botWelcome: "Hello! Welcome to Ecare Support. How can we help you today?",
      botServices: "We build custom web applications, WordPress plugins (like Dokan, WP ERP, Happy Addons), and manage cloud hosting. What service do you need?",
      botProducts: "You can explore all our awesome products (like Dokan, WP User Frontend, weMail) on our Products page. Any specific product question?",
      botAskName: "Sure! What is your name so we can assist you better?",
      botWelcomeLive: "Hi {name}! You are now connected to Live Chat. Go ahead and send your message, our team will reply here.",
      backToMenu: "Back to Main Menu",
      placeholderName: "Enter your name...",
    },
    bn: {
      title: "ইকেয়ার লাইভ চ্যাট",
      status: "অনলাইন",
      placeholder: "মেসেজ লিখুন...",
      send: "পাঠান",
      servicesTitle: "আমাদের সেবাসমূহ",
      pricingTitle: "প্রোডাক্ট ও প্রাইসিং",
      humanTitle: "সাপোর্ট এজেন্টের সাথে সরাসরি চ্যাট",
      botWelcome: "হ্যালো! ইকেয়ার লাইভ চ্যাটে আপনাকে স্বাগতম। আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
      botServices: "আমরা কাস্টম ওয়েব অ্যাপ্লিকেশন, ওয়ার্ডপ্রেস প্লাগইন (যেমন Dokan, WP ERP, Happy Addons) এবং ক্লাউড হোস্টিং সেবা প্রদান করি। আপনি কোন সেবায় আগ্রহী?",
      botProducts: "আমাদের চমৎকার সব প্রোডাক্ট (যেমন Dokan, WP User Frontend, weMail) দেখতে আমাদের Products পেজে যান। আপনার কি কোনো নির্দিষ্ট প্রশ্ন আছে?",
      botAskName: "অবশ্যই! আপনার সাথে সরাসরি যুক্ত হতে প্রথমে আপনার নামটি লিখুন।",
      botWelcomeLive: "হ্যালো {name}! আপনি এখন লাইভ চ্যাটে যুক্ত আছেন। আপনার প্রশ্ন বা বার্তাটি নিচে লিখুন, আমাদের টিম এখানেই উত্তর দেবে।",
      backToMenu: "প্রধান মেনুতে ফিরুন",
      placeholderName: "আপনার নাম লিখুন...",
    }
  }[locale === "bn" ? "bn" : "en"];

  // 1. Initial configuration
  useEffect(() => {
    // Generate or fetch sessionId on mount
    let storedSessionId = localStorage.getItem("ecare_chat_session_id");
    let storedUserName = localStorage.getItem("ecare_chat_user_name") || "";
    
    if (!storedSessionId) {
      storedSessionId = "session_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now();
      localStorage.setItem("ecare_chat_session_id", storedSessionId);
    }
    setSessionId(storedSessionId);
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Load message history if sessionId exists in DB
    const loadHistory = async () => {
      try {
        const res = await fetch(`/api/live-chat/client?sessionId=${storedSessionId}`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setMessages(data.data);
          prevMessagesLength.current = data.data.length;
          setChatMode("live");
        } else {
          // Fallback to bot welcome
          setMessages([
            {
              sessionId: storedSessionId!,
              sender: "bot",
              senderName: "Ecare Bot",
              message: t.botWelcome,
              date: new Date()
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };

    loadHistory();
  }, [locale]);

  // 2. Poll server for new messages every 3 seconds if in live mode or open
  useEffect(() => {
    if (!sessionId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/live-chat/client?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          // If a new message arrived
          if (data.data.length > prevMessagesLength.current) {
            setMessages(data.data);
            
            // Check if latest message is from admin and chat is closed -> show notification badge
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

    // Poll every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId, isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessageToDB = async (sender: "user" | "admin" | "bot", name: string, text: string) => {
    try {
      const res = await fetch("/api/live-chat/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          sender,
          senderName: name,
          message: text
        })
      });
      const data = await res.json();
      if (data.success) {
        // Append locally
        setMessages(prev => [...prev.filter(m => m._id !== undefined || m.sender !== "bot"), data.data]);
        prevMessagesLength.current += 1;
      }
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  const handleChoice = async (action: string, label: string) => {
    // Add user selection bubble
    const userMsg: DBMessage = {
      sessionId,
      sender: "user",
      senderName: "Visitor",
      message: label,
      date: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(async () => {
      setIsLoading(false);
      if (action === "services") {
        const botMsg: DBMessage = {
          sessionId,
          sender: "bot",
          senderName: "Ecare Bot",
          message: t.botServices,
          date: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
      } else if (action === "products") {
        const botMsg: DBMessage = {
          sessionId,
          sender: "bot",
          senderName: "Ecare Bot",
          message: t.botProducts,
          date: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
      } else if (action === "human_agent") {
        if (userName) {
          // Already have name, upgrade to live chat directly
          setChatMode("live");
          await saveMessageToDB("bot", "Ecare Bot", t.botWelcomeLive.replace("{name}", userName));
        } else {
          setChatMode("ask_name");
          const botMsg: DBMessage = {
            sessionId,
            sender: "bot",
            senderName: "Ecare Bot",
            message: t.botAskName,
            date: new Date()
          };
          setMessages(prev => [...prev, botMsg]);
        }
      }
    }, 600);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue("");

    if (chatMode === "ask_name") {
      setUserName(text);
      localStorage.setItem("ecare_chat_user_name", text);
      setChatMode("live");
      
      // Save visitor name introduction and bot response to DB
      await saveMessageToDB("user", text, text);
      setIsLoading(true);
      setTimeout(async () => {
        setIsLoading(false);
        await saveMessageToDB("bot", "Ecare Bot", t.botWelcomeLive.replace("{name}", text));
      }, 500);
    } 
    
    else if (chatMode === "live") {
      // Direct live chat message delivery to DB
      await saveMessageToDB("user", userName || "Visitor", text);
    } 
    
    else {
      // Greeting input fallback, automatically switch to name collection
      setChatMode("ask_name");
      setMessages(prev => [
        ...prev, 
        { sessionId, sender: "user", senderName: "Visitor", message: text, date: new Date() },
        { sessionId, sender: "bot", senderName: "Ecare Bot", message: t.botAskName, date: new Date() }
      ]);
    }
  };

  const handleResetChat = () => {
    // Clear states and reset
    localStorage.removeItem("ecare_chat_user_name");
    setUserName("");
    setChatMode("greeting");
    setMessages([
      {
        sessionId,
        sender: "bot",
        senderName: "Ecare Bot",
        message: t.botWelcome,
        date: new Date()
      }
    ]);
    prevMessagesLength.current = 1;
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 1. CHAT WINDOW */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[500px] bg-white/95 dark:bg-[#0c101b]/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary/80 dark:to-purple-900/80 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  EC
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-none">{t.title}</h3>
                <span className="text-[10px] text-zinc-200/80 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                  {t.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {chatMode === "live" && (
                <button
                  onClick={handleResetChat}
                  className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors text-white cursor-pointer"
                >
                  Reset
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

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.sender === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : msg.sender === "admin"
                    ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-tl-none shadow-sm"
                    : "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 rounded-tl-none text-foreground shadow-sm"
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>
                </div>
                
                <span className="text-[9px] text-muted-foreground mt-1 px-1">
                  {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Action Buttons for Greeting Flow */}
            {chatMode === "greeting" && !isLoading && (
              <div className="flex flex-col gap-2 max-w-[85%] mt-2">
                <button
                  onClick={() => handleChoice("services", t.servicesTitle)}
                  className="text-xs font-semibold px-4 py-2 bg-white dark:bg-zinc-900 hover:bg-primary hover:text-white dark:hover:bg-primary text-foreground rounded-full border border-zinc-200/60 dark:border-zinc-800/60 text-left transition-all cursor-pointer shadow-xs"
                >
                  💼 {t.servicesTitle}
                </button>
                <button
                  onClick={() => handleChoice("products", t.pricingTitle)}
                  className="text-xs font-semibold px-4 py-2 bg-white dark:bg-zinc-900 hover:bg-primary hover:text-white dark:hover:bg-primary text-foreground rounded-full border border-zinc-200/60 dark:border-zinc-800/60 text-left transition-all cursor-pointer shadow-xs"
                >
                  🚀 {t.pricingTitle}
                </button>
                <button
                  onClick={() => handleChoice("human_agent", t.humanTitle)}
                  className="text-xs font-semibold px-4 py-2 bg-white dark:bg-zinc-900 hover:bg-primary hover:text-white dark:hover:bg-primary text-foreground rounded-full border border-zinc-200/60 dark:border-zinc-800/60 text-left transition-all cursor-pointer shadow-xs"
                >
                  💬 {t.humanTitle}
                </button>
              </div>
            )}

            {/* Simulated typing indicator */}
            {isLoading && (
              <div className="flex items-center gap-1 text-muted-foreground py-1 pl-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-xs">Typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-100 dark:border-zinc-800/50 flex gap-2 items-center bg-white dark:bg-[#0c101b]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={chatMode === "ask_name" ? t.placeholderName : t.placeholder}
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
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-[#0b0f19] rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
}
