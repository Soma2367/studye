"use client";

import { useState } from "react";
import QuestionModal from "@/components/QuestionModal";
import { Question, QuestionForm } from "@/types/schema";
import QuestionDisplay from "@/components/QuestionDisplay";
import { useQuestion } from "@/hooks/useQuestion";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { question, isLoading, setNewQuestion, generateNext, clear } = useQuestion();

  const handleGetQuestion = (q: Question, config: QuestionForm) => {
    setNewQuestion(q, config);
    setIsModalOpen(false);
  }

    if (question) {
    return (
      <QuestionDisplay
        question={question}
        onBack={clear}
        onNext={generateNext}
        isLoading={isLoading}
      />
    );
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
        getQuestion={handleGetQuestion}
      />
    </main>
  );
}