import { OpenAI } from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export default async function handler(req: any, res: any) {

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const { text } = await req.body

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are proficient at visual diagrams just make diagram with help of mermaid markdown without explaining anything for following text" }, { role: "user", content: `${text}` },
    ],
    max_tokens: 2000,
    top_p: 1,
    temperature: 0.66,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  res.json(stream)
}
