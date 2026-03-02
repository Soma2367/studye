"use client";

import { useState } from "react";
import QuestionModal from "@/components/QuestionModal";
import { Question } from "@/types/schema";
import QuestionDisplay from "@/components/QuestionDisplay";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<Question | null>(null);

  const getQuestion = (question: Question) => {
    setResult(question);
    setIsModalOpen(false);
  };

  if(result) {
    return <QuestionDisplay question={result} onBack={() => setResult(null)} onNext={() => setResult(null)} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-4 mb-12">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
          TOEIC
        </h1>
        <p className="text-gray-500 max-w-sm mx-auto font-medium">
          あなたの目標スコアに合わせた問題を、Geminiが瞬時に作成します。
        </p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative px-12 py-6 bg-white rounded-3xl shadow-2xl hover:shadow-indigo-100 transition-all active:scale-95 border border-gray-100"
      >
        <span className="text-xl font-bold text-gray-800">問題を新規作成</span>
      </button>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        getQuestion={getQuestion}
      />
    </main>
  );
}