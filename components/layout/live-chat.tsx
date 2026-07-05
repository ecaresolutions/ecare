"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { MessageSquare, X, Send, User, MessageCircle, HelpCircle, Loader2 } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  choices?: { label: string; action: string }[];
  isForm?: boolean;
}

export default function LiveChat() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  // Contact Form state inside chatbot
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStep, setFormStep] = useState<"idle" | "name" | "email" | "message" | "submitting" | "done">("idle");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Translations
  const t = {
    en: {
      title: "Ecare Live Support",
      status: "Online",
      placeholder: "Type a message...",
      send: "Send",
      servicesTitle: "Our Services",
      pricingTitle: "Products & Pricing",
      humanTitle: "Talk to an Agent",
      botWelcome: "Hello! Welcome to Ecare Support. How can we help you today?",
      botServices: "We build custom web applications, WordPress plugins (like Dokan, WP ERP, Happy Addons), and manage cloud hosting. How can we help with services?",
      botProducts: "You can explore all our awesome products (like Dokan, WP User Frontend, weMail) on our Products page. Any specific product question?",
      botFormStart: "Sure! Let's connect you. First, what is your name?",
      botFormEmail: "Thanks, {name}! And what is your email address?",
      botFormMessage: "Got it! Now, please enter your message for our team.",
      botFormSuccess: "Thank you, {name}! Your support request has been submitted. We'll reply to {email} shortly.",
      errorMinLength: "Message must be at least 10 characters.",
      errorEmail: "Please enter a valid email address.",
      errorName: "Name must be at least 2 characters.",
      submitButton: "Submit Message",
      backToMenu: "Back to Main Menu",
    },
    bn: {
      title: "ইকেয়ার লাইভ সাপোর্ট",
      status: "অনলাইন",
      placeholder: "মেসেজ লিখুন...",
      send: "পাঠান",
      servicesTitle: "আমাদের সেবাসমূহ",
      pricingTitle: "প্রোডাক্ট ও প্রাইসিং",
      humanTitle: "সাপোর্ট এজেন্ট",
      botWelcome: "হ্যালো! ইকেয়ার সাপোর্টে আপনাকে স্বাগতম। আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
      botServices: "আমরা কাস্টম ওয়েব অ্যাপ্লিকেশন, ওয়ার্ডপ্রেস প্লাগইন (যেমন Dokan, WP ERP, Happy Addons) এবং ক্লাউড হোস্টিং সেবা প্রদান করি। আপনি কোন সেবায় আগ্রহী?",
      botProducts: "আমাদের চমৎকার সব প্রোডাক্ট (যেমন Dokan, WP User Frontend, weMail) দেখতে আমাদের Products পেজে যান। আপনার কি কোনো নির্দিষ্ট প্রশ্ন আছে?",
      botFormStart: "অবশ্যই! আপনার সাথে যোগাযোগের জন্য, প্রথমে আপনার নাম বলুন।",
      botFormEmail: "ধন্যবাদ {name}! এবার আপনার ইমেইল এড্রেসটি লিখুন।",
      botFormMessage: "ধন্যবাদ! এবার আপনার সাপোর্ট মেসেজ বা প্রশ্নটি লিখুন।",
      botFormSuccess: "ধন্যবাদ {name}! আপনার বার্তাটি আমাদের কাছে পৌঁছেছে। খুব শীঘ্রই {email} ঠিকানায় আমরা যোগাযোগ করব।",
      errorMinLength: "মেসেজটি কমপক্ষে ১০ অক্ষরের হতে হবে।",
      errorEmail: "অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন।",
      errorName: "নাম কমপক্ষে ২ অক্ষরের হতে হবে।",
      submitButton: "বার্তা পাঠান",
      backToMenu: "প্রধান মেনুতে ফিরুন",
    }
  }[locale === "bn" ? "bn" : "en"];

  // Initialize Welcome Message
  const initChat = () => {
    setMessages([
      {
        sender: "bot",
        text: t.botWelcome,
        timestamp: new Date(),
        choices: [
          { label: t.servicesTitle, action: "services" },
          { label: t.pricingTitle, action: "products" },
          { label: t.humanTitle, action: "human_agent" }
        ]
      }
    ]);
    setFormStep("idle");
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    initChat();
  }, [locale]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Flash notification badge when chatbot receives message and is closed
  const triggerNotification = () => {
    if (!isOpen) {
      setHasNewMessage(true);
    }
  };

  const handleChoice = (action: string) => {
    // Add user message
    let userMsgText = "";
    if (action === "services") userMsgText = t.servicesTitle;
    else if (action === "products") userMsgText = t.pricingTitle;
    else if (action === "human_agent") userMsgText = t.humanTitle;
    else if (action === "main_menu") userMsgText = t.backToMenu;

    setMessages(prev => [...prev, { sender: "user", text: userMsgText, timestamp: new Date() }]);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (action === "services") {
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: t.botServices,
            timestamp: new Date(),
            choices: [
              { label: t.humanTitle, action: "human_agent" },
              { label: t.backToMenu, action: "main_menu" }
            ]
          }
        ]);
      } else if (action === "products") {
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: t.botProducts,
            timestamp: new Date(),
            choices: [
              { label: t.humanTitle, action: "human_agent" },
              { label: t.backToMenu, action: "main_menu" }
            ]
          }
        ]);
      } else if (action === "human_agent") {
        setFormStep("name");
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: t.botFormStart,
            timestamp: new Date()
          }
        ]);
      } else if (action === "main_menu") {
        setFormStep("idle");
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: t.botWelcome,
            timestamp: new Date(),
            choices: [
              { label: t.servicesTitle, action: "services" },
              { label: t.pricingTitle, action: "products" },
              { label: t.humanTitle, action: "human_agent" }
            ]
          }
        ]);
      }
      triggerNotification();
    }, 800);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue("");

    setMessages(prev => [...prev, { sender: "user", text: userText, timestamp: new Date() }]);
    setIsLoading(true);

    setTimeout(async () => {
      setIsLoading(false);
      
      // If we are gathering form data
      if (formStep === "name") {
        if (userText.trim().length < 2) {
          setMessages(prev => [...prev, { sender: "bot", text: t.errorName, timestamp: new Date() }]);
          return;
        }
        setFormData(prev => ({ ...prev, name: userText }));
        setFormStep("email");
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: t.botFormEmail.replace("{name}", userText),
            timestamp: new Date()
          }
        ]);
      } 
      
      else if (formStep === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userText.trim())) {
          setMessages(prev => [...prev, { sender: "bot", text: t.errorEmail, timestamp: new Date() }]);
          return;
        }
        setFormData(prev => ({ ...prev, email: userText }));
        setFormStep("message");
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: t.botFormMessage,
            timestamp: new Date()
          }
        ]);
      } 
      
      else if (formStep === "message") {
        if (userText.trim().length < 10) {
          setMessages(prev => [...prev, { sender: "bot", text: t.errorMinLength, timestamp: new Date() }]);
          return;
        }

        const finalMsg = userText;
        setFormStep("submitting");
        
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              subject: "Live Chat Support Ticket",
              message: finalMsg
            })
          });

          const data = await res.json();
          if (data.success) {
            setFormStep("done");
            setMessages(prev => [
              ...prev,
              {
                sender: "bot",
                text: t.botFormSuccess.replace("{name}", formData.name).replace("{email}", formData.email),
                timestamp: new Date(),
                choices: [
                  { label: t.backToMenu, action: "main_menu" }
                ]
              }
            ]);
          } else {
            throw new Error(data.error || "Failed");
          }
        } catch (err) {
          setFormStep("message"); // fallback to edit
          setMessages(prev => [
            ...prev,
            {
              sender: "bot",
              text: locale === "bn" 
                ? "দুঃখিত, কোনো একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।" 
                : "Sorry, there was an issue sending your message. Please try again.",
              timestamp: new Date()
            }
          ]);
        }
      } 
      
      else {
        // Standard conversational chatbot fallback
        let reply = locale === "bn" 
          ? "ধন্যবাদ আপনার মেসেজের জন্য! সরাসরি আমাদের প্রতিনিধির সাথে কথা বলতে 'সাপোর্ট এজেন্ট' বাটনে চাপুন।"
          : "Thank you for writing! To speak with our support agent directly, click the 'Talk to an Agent' button below.";
          
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: reply,
            timestamp: new Date(),
            choices: [
              { label: t.humanTitle, action: "human_agent" },
              { label: t.backToMenu, action: "main_menu" }
            ]
          }
        ]);
      }
      triggerNotification();
    }, 800);
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
            <button 
              onClick={toggleChat}
              className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.sender === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 rounded-tl-none text-foreground shadow-sm"
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                </div>
                
                {/* Options/Buttons */}
                {msg.choices && msg.choices.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                    {msg.choices.map((choice, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleChoice(choice.action)}
                        className="text-xs font-semibold px-3 py-1.5 bg-zinc-100 hover:bg-primary hover:text-white dark:bg-zinc-800 dark:hover:bg-primary/30 rounded-full border border-zinc-200/60 dark:border-zinc-700/60 transition-all cursor-pointer shadow-sm"
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                )}
                
                <span className="text-[9px] text-muted-foreground mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Simulated loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-1 text-muted-foreground py-1 pl-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-xs">EC Bot is typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-100 dark:border-zinc-800/50 flex gap-2 items-center bg-white dark:bg-[#0c101b]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                formStep === "name"
                  ? (locale === "bn" ? "আপনার নাম লিখুন..." : "Enter your name...")
                  : formStep === "email"
                  ? (locale === "bn" ? "আপনার ইমেইল লিখুন..." : "Enter your email...")
                  : formStep === "message"
                  ? (locale === "bn" ? "আপনার মেসেজ লিখুন..." : "Enter your message...")
                  : t.placeholder
              }
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
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-primary/30 animate-ping opacity-75 pointer-events-none group-hover:hidden" />
        
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}

        {/* Unread message badge */}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-[#0b0f19] rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
}
