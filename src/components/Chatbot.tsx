import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am your Star Hospital AI Assistant. How can I help you today? Feel free to describe your symptoms (e.g., fever, chest pain, joint pain), and I can recommend the right department or specialist for you.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "user",
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: "ai",
        text: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(true);
      
      const errorMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: "ai",
        text: "I apologize, but I am currently having trouble connecting to my servers. Please ensure the backend server is running and try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer relative"
        >
          <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emergency-red text-[8px] font-bold text-white items-center justify-center">AI</span>
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-[380px] sm:w-[400px] h-[550px] bg-white rounded-3xl card-shadow glass-card border border-outline-variant flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-primary p-5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  Star Health Assistant 
                  <Sparkles className="w-3.5 h-3.5 text-warning-orange fill-warning-orange animate-pulse" />
                </h3>
                <span className="text-[11px] text-primary-fixed-dim flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-success-green inline-block animate-pulse"></span>
                  AI Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-surface-container-lowest">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`p-4.5 rounded-2xl text-[13.5px] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-text-main text-white rounded-tr-none"
                      : "bg-surface-container text-text-main border border-outline-variant rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <span
                    className={`block text-[9px] mt-1.5 text-right ${
                      msg.sender === "user" ? "text-white/60" : "text-text-muted"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-surface-container border border-outline-variant p-4.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-text-muted/40 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-text-muted/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2.5 h-2.5 bg-text-muted/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 bg-error-container text-on-error-container text-xs p-3.5 rounded-xl border border-error/20">
                <AlertCircle className="w-4 h-4 shrink-0 text-error" />
                <span>Could not connect. Make sure your server is running.</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-outline-variant bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about symptoms, departments..."
              className="flex-grow px-4.5 py-3 text-[13.5px] rounded-xl border border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shadow-md hover:bg-primary-container disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
