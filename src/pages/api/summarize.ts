import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config1 = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var')
}

const openai = new OpenAIApi(config1)

export const config = {
  runtime: 'edge'
}

export default async function handler(
  req: any,
  res: any
) {

  const { text } = req.json()

  if (req.method === 'POST') {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      temperature: 0.6,
      prompt: `Give mermaid markdown for the analogy present in text: ${text}`
    });
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  }
  else {
    res.status(400).json({ error: 'Method does not exist' })
  }
}
