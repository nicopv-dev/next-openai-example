import { NextApiRequest, NextApiResponse } from "next";
import { openai } from "../../config/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(500).json({ message: "Metodo no soportado" });
  }

  const { priceMin, priceMax, gender, age, hobbies } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(priceMin, priceMax, gender, age, hobbies),
      temperature: 0.6,
      max_tokens: 2048,
    });
    const choices = completion.data.choices[0]?.text.trim().split(/\n+/);
    return res.status(200).json({ message: "Generated name", data: choices });
  } catch (err) {
    console.log(err);
    return res.status(502).json({ err });
  }
}

function generatePrompt(
  priceMin: number,
  priceMax: number,
  gender: string,
  age: string,
  hobbies: string
) {
  return `sugiere 3 regalos de navidad para una persona de ${age} años, ${gender} que le interesa ${hobbies}.`;
}
