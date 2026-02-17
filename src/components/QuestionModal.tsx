"use client";

import { QUESTION_TYPE_LABELS, QUESTION_TYPES, QuestionForm, TARGET_SCORE_LABELS, TARGET_SCORES } from "@/types/schema";
import { useState } from "react";

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuestionModal({ isOpen, onClose }: QuestionModalProps) {
    const [form, setForm] = useState<QuestionForm>({
        targetScore: '200',
        questionType: 'random',
        option: '',
    })

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="absolute inset-0" onClick={onClose} />
     <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
       <div className="p-8">
        <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">どんな問題にしますか？</h2>
         <div className="space-y-10">
            <section>
                <label className="text-md font-black text-cyan-700 uppercase tracking-[0.2em] ml-1 mb-3 block">目標スコア</label>
                <div className="grid grid-cols-4 gap-2">
                    {TARGET_SCORES.map((score) => (
                        <button
                          key={score}
                          className={`py-3 rounded-2xl font-bold text-sm border-2 transition-all ${
                            form.targetScore === score
                            ? "bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-200"
                            : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100 disabled:opacity-50"
                            }`}
                          onClick={() => setForm({...form, targetScore: score})}
                        >
                            {TARGET_SCORE_LABELS[score]}
                        </button>
                    ))}
                </div>
            </section>
            <section>
                <label className="text-md font-black text-cyan-700 uppercase tracking-[0.2em] ml-1 mb-3 block">問題タイプ</label>
                <div className="grid grid-cols-4 gap-2">
                    {QUESTION_TYPES.map((question) => (
                        <button
                          key={question}
                          className={`py-3 rounded-2xl font-bold text-sm border-2 transition-all ${
                            form.questionType === question
                            ? "bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-200"
                            : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100 disabled:opacity-50"
                         }`}
                          onClick={() => setForm({...form, questionType: question})}
                        >
                            {QUESTION_TYPE_LABELS[question]}
                        </button>
                    ))}
                </div>
            </section>
            <section>
                <label htmlFor="option" className="text-md font-black text-cyan-700 uppercase tracking-[0.2em] ml-1 mb-3 block">問題に入れたい単語</label>
                <input
                  type="text"
                  id="option"
                  onChange={(e) => setForm({...form, option: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] text-gray-700 font-bold placeholder-gray-300 focus:bg-white focus:border-cyan-600 focus:ring-0 outline-none transition-all shadow-sm" placeholder="Hello World" required />
            </section>
            <div className="flex gap-3 mt-6">
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-sm font-black text-cyan-700 uppercase tracking-[0.2em] ml-1 mb-3 block rounded-lg border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition-all active:scale-95"
                >
                    キャンセル
                </button>

                <button
                    className="flex-[2.5] px-4 py-2 text-sm font-black text-cyan-700 uppercase tracking-[0.2em] ml-1 mb-3 block rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 shadow-md transition-all active:scale-[0.98] active:shadow-inner active:translate-y-0.5"
                >
                    作成
                </button>
            </div>
         </div>
       </div>
     </div>
   </div>
  );
}