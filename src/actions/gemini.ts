"use server";

import { GoogleGenAI } from "@google/genai";
import { Question, QuestionForm } from "@/types/schema";

type ActionResponse =
    | { success: true; data: Question }
    | { success: false; error: string };

export async function generateQuestionAction(formData: QuestionForm): Promise<ActionResponse> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('Missing GEMINI_API_KEY');
        return { success: false, error: "Error occurred because of missing api key" };
    }

    const geminiAI = new GoogleGenAI({ apiKey });

    const prompt = `
      TOEIC ${formData.targetScore}点レベルの${formData.questionType}問題を1問作成し、以下のJSON形式で出力してください。
      JSON以外のテキストは一切含めないでください。

      {
        "question": "問題文",
        "choices": {
          "A": "選択肢A",
          "B": "選択肢B",
          "C": "選択肢C",
          "D": "選択肢D"
         },
       "answer": "A",
       "explanation": "日本語による解説"
      }

      answerは必ずA、B、C、Dのいずれかで、choicesの中から正しい選択肢を指定してください。
      解説する際は、それぞれの選択肢ごとに、なぜ正解なのか、なぜ不正解なのかを詳しく説明してください。
      ${formData.option ? `キーワードとして「${formData.option}」を必ず含めてください。` : ''}
    `.trim();

    try {
        const response = await geminiAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
            }
        });

        if (!response.text) {
            throw new Error("Response text is empty");
        }

        const result = JSON.parse(response.text) as Question;
        console.log(result);
        return { success: true, data: result };
    } catch (e) {
        console.error('AI Action Error:', e);
        return { success: false, error: "問題の生成に失敗しました" };
    }
}