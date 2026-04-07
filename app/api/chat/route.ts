import Anthropic from "@anthropic-ai/sdk";
import { vsiProdukti } from "@/data/products";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Si AI asistent za podjetje Moto Nautika d.o.o. - slovenskega prodajalca motorjev in plovil.

Tvoje naloge:
- Pomagati strankam najti pravi motor ali plovilo
- Odgovarjati na vprašanja o produktih
- Pomagati pri rezervaciji servisa
- Zagotavljati informacije o cenah, specifikacijah in dostopnosti

Vedno odgovarjaj v slovenščini. Bodi prijazen, strokoven in natančen.

Trenutna ponudba:
${vsiProdukti
  .map(
    (p) =>
      `- ${p.naziv} (${p.tip}): ${p.cena.toLocaleString("sl-SI")} €, ${p.mocHP} HP, ${p.teza} kg, ${p.dostopnost}`
  )
  .join("\n")}

Ko stranka vpraša za priporočilo, vprašaj za:
1. Namen uporabe (vsakodnevna vožnja, turizem, šport, off-road...)
2. Izkušnje z vožnjo
3. Proračun
4. Preference glede moči in sloga

Kontaktni podatki Moto Nautika:
- Spletna stran: www.moto-nautika.si
- Delovni čas: Pon-Pet 8:00-17:00, Sob 8:00-12:00`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const stream = await client.messages.stream({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({ text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API napaka:", error);
    return new Response(JSON.stringify({ error: "Notranja napaka strežnika" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
