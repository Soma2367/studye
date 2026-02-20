import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
    const body = await request.json();
    const { targetScore, questionType, option } = body;

    const prompt = `
      TOEIC ${targetScore}点レベルの${questionType}問題を1問作成してください。
      ${option ? `「${option}」という単語を含めてください。` : ''}

      以下の形式で回答してください：
      問題文:
      選択肢:
      A)
      B)
      C)
      D)
      正解:
    `;

    const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return NextResponse.json({
        question: response.text
    });
}

