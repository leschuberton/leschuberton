import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Building, 
  Calculator, 
  MapPin, 
  TrendingUp,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { cn } from '@/src/lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickActions = [
  { icon: Building, label: 'Architectural Review', prompt: 'Can you review my current floor plan for efficiency?' },
  { icon: Calculator, label: 'Cost Estimation', prompt: 'Estimate the cost for a 200sqm residential building in Berlin.' },
  { icon: MapPin, label: 'Location Analysis', prompt: 'Analyze the real estate potential of Hamburg Altona.' },
  { icon: TrendingUp, label: 'Market Trends', prompt: 'What are the current trends in sustainable construction?' },
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Architect & Broker. How can I help you digitalize your real estate project today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are an expert AI Architect and Real Estate Broker. Your goal is to help users digitalize the entire real estate value chain. Provide professional, data-driven advice on architecture, brokerage, construction planning, and material procurement. Be concise and helpful."
        }
      });

      const response = await model;
      const assistantMessage: Message = { role: 'assistant', content: response.text || 'I am sorry, I could not process that.' };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'There was an error connecting to the AI service.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
      <header className="p-6 bg-white border-b border-[#141414]/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F27D26] rounded-xl text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#141414]">AI Architect & Broker</h2>
            <p className="text-xs text-[#141414]/40 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F27D26]" /> Powered by Gemini AI
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-4 max-w-3xl",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
          )}>
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'assistant' ? "bg-[#141414] text-white" : "bg-[#F27D26] text-white"
            )}>
              {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl shadow-sm",
              msg.role === 'assistant' ? "bg-white text-[#141414]" : "bg-[#F27D26] text-white"
            )}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 max-w-3xl mr-auto animate-pulse">
            <div className="w-10 h-10 rounded-full bg-[#141414] flex items-center justify-center shrink-0">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white shadow-sm w-32 h-12" />
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-[#141414]/5 space-y-4">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.prompt)}
              className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] hover:bg-[#F27D26]/10 hover:text-[#F27D26] rounded-full text-sm font-medium transition-colors whitespace-nowrap border border-[#141414]/5"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your project..."
            className="w-full pl-6 pr-14 py-4 bg-[#F5F5F5] border-none rounded-2xl focus:ring-2 focus:ring-[#F27D26] transition-all outline-none text-[#141414]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-3 bg-[#141414] text-white rounded-xl hover:bg-[#141414]/90 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
