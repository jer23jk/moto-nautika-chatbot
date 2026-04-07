"use client";

import { useState, useRef, useEffect } from "react";
import FilterPanel from "./FilterPanel";
import { Produkt } from "@/data/products";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ProductCardProps {
  produkt: Produkt;
}

function ProductCard({ produkt }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-xs space-y-1">
      <div className="font-bold text-gray-800">{produkt.naziv}</div>
      <div className="text-red-600 font-bold">{produkt.cena.toLocaleString("sl-SI")} €</div>
      <div className="text-gray-500">{produkt.mocHP} HP · {produkt.dolzina} mm</div>
      <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
        produkt.dostopnost === "na zalogi" ? "bg-green-100 text-green-700" :
        produkt.dostopnost === "naročilo" ? "bg-yellow-100 text-yellow-700" :
        "bg-red-100 text-red-700"
      }`}>
        {produkt.dostopnost}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Pozdravljeni v Moto Nautiki! Sem vaš AI asistent. Kako vam lahko danes pomagam? Iščete motor ali plovilo?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterRezultati, setFilterRezultati] = useState<Produkt[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMsg }],
        }),
      });

      if (!res.ok) throw new Error("API napaka");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantMsg += parsed.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: "assistant", content: assistantMsg };
                    return updated;
                  });
                }
              } catch {}
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Oprostite, prišlo je do napake. Prosim poskusite znova." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterRezultati = (produkti: Produkt[]) => {
    setFilterRezultati(produkti);
    const msg =
      produkti.length === 0
        ? "Iskanje z izbranimi filtri ni vrnilo rezultatov. Poskusite z drugačnimi kriteriji."
        : `Našel sem ${produkti.length} ${produkti.length === 1 ? "produkt" : produkti.length < 5 ? "produkti" : "produktov"} glede na vaše kriterije:\n\n${produkti.map((p) => `• **${p.naziv}** — ${p.cena.toLocaleString("sl-SI")} €`).join("\n")}`;
    setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 h-[650px] max-h-[85vh] flex flex-row items-stretch rounded-[2rem] transition-all duration-500 ease-out w-[750px] shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]">
      {/* Chat Panel */}
      <div className="relative flex flex-col w-full sm:w-[380px] shrink-0 backdrop-blur-2xl bg-white/95 overflow-hidden border z-20 transition-all duration-500 rounded-l-[2rem] rounded-r-none border-r-0 border-red-500/30">
        {/* Header */}
        <div className="h-[88px] relative p-5 flex items-center justify-between z-30 backdrop-blur-md border-b border-red-500/30">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-xl h-11 w-11 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <img
                alt="Moto Nautika"
                className="h-full object-contain"
                src="https://raw.githubusercontent.com/domen2004/motonavtika/main/Screenshot%202025-12-24%20at%2020.48.05.png"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
                MOTO NAUTIKA
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">AI Assistant</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`p-2 rounded-full transition-all duration-300 ${showFilter ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:text-gray-600"}`}
              title="Filtri"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-red-50/30">
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-4 z-10 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col w-full mb-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mr-3 shadow-lg ring-2 ring-white overflow-hidden bg-gradient-to-br from-red-500 to-red-600">
                      <img
                        className="w-5 h-5"
                        alt="AI"
                        src="https://raw.githubusercontent.com/domen2004/motonavtika/main/racing-helmet-svgrepo-com.svg"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col max-w-[75%]">
                    <div
                      className={`px-5 py-3.5 shadow-md text-[14px] leading-relaxed relative ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl rounded-tr-sm"
                          : "bg-white text-gray-700 rounded-2xl rounded-tl-sm border border-gray-100"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content || (loading && i === messages.length - 1 ? "..." : "")}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white overflow-hidden bg-gradient-to-br from-red-500 to-red-600">
                  <img className="w-5 h-5" alt="AI" src="https://raw.githubusercontent.com/domen2004/motonavtika/main/racing-helmet-svgrepo-com.svg" style={{ filter: "brightness(0) invert(1)" }} />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-20 mt-auto">
          <div className="flex items-center space-x-2 bg-gray-50/80 rounded-2xl border border-gray-200 px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-red-400">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Vprašajte me karkoli..."
              className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm font-medium text-gray-900"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl transition-all bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <div
        className={`h-full w-[380px] border-l border-t border-b border-r border-red-500/30 flex flex-col transition-all absolute right-0 top-0 z-40 duration-700 ease-out rounded-tr-[2rem] rounded-br-[2rem] ${
          showFilter ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 pointer-events-none"
        }`}
      >
        <FilterPanel onClose={() => setShowFilter(false)} onRezultati={handleFilterRezultati} />
      </div>
    </div>
  );
}
