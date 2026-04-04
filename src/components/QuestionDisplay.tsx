import { useSpeech } from "@/hooks/useSpeech";
import { Question } from "@/types/schema";
import { useState } from "react";
import { MdOutlineSettingsVoice } from "react-icons/md";

export default function QuestionDisplay({ question, onBack, onNext, isLoading }: { question: Question, onBack: () => void, onNext: () => void, isLoading: boolean }) {
  const {isSpeaking, play} = useSpeech();
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const selectAnswer = (key: string) => {
    if (selectedChoice) return;
    setSelectedChoice(key);
    setShowAnswer(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 px-4 py-2 text-sm font-black text-cyan-700 uppercase tracking-[0.2em] ml-1 mb-3 block rounded-lg border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition-all active:scale-95"
      >
        戻る
      </button>
      <div className="space-y-4 mb-12">
        <div className="max-w-md mx-auto w-full px-2">
            <div className="flex gap-4 items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 text-lg text-left font-medium leading-relaxed flex-1">
                {question.question}
                </p>
                <button
                onClick={ () => play(question.question) }
                disabled={isSpeaking}
                className={`p-2 rounded-full flex-shrink-0 transition-all ${
                    isSpeaking
                    ? 'text-cyan-600 bg-cyan-50 animate-pulse'
                    : 'text-gray-400 hover:text-cyan-600 hover:bg-gray-50'
                }`}
                title="音声を再生"
                >
                <MdOutlineSettingsVoice size={24} />
                </button>
            </div>
        </div>

        <div className="max-w-md mx-auto w-full">
            <ul className="space-y-3">
                {Object.entries(question.choices).map(([key, value]) => (
                <li
                    key={key}
                    className="grid grid-cols-[1.5rem_1fr] gap-2 items-start text-left p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-cyan-500 transition-colors"
                >
                    <button onClick={() => selectAnswer(key)}><span className="font-bold text-cyan-600">{key}:</span></button>
                    <span className="text-gray-700 leading-relaxed">{value}</span>
                </li>
                ))}
            </ul>
        </div>

        <div>
            {showAnswer && <span className="block mb-2">{question.answer}</span>}
            {showAnswer && <span className="block text-sm text-gray-600">{question.explanation}</span>}
            <div className="gap-4 flex justify-center">
                <button className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                    onClick={onBack}
                >
                    トップ画面へ
                </button>
                <button className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={onNext}
                    disabled={isLoading}
                >
                    {isLoading ? "生成中..." : "次の問題へ"}
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}
