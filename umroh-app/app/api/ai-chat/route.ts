import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { name, message } = await req.json();

  const prompt = `
Kamu adalah sales umroh profesional.

Balas chat calon jamaah dengan gaya:
- sopan
- meyakinkan
- closing oriented

Nama: ${name}
Pesan: ${message}

Balas:
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}