import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Demo ozadje - v produkciji odstrani in vgradi samo ChatWidget */}
      <div className="text-center text-gray-400 select-none">
        <p className="text-lg font-semibold">Moto Nautika</p>
        <p className="text-sm">AI Chatbot Widget</p>
      </div>
      <ChatWidget />
    </main>
  );
}
