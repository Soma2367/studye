import { Question } from "@/types/schema";

export default function QuestionDisplay({ question, onBack }: { question: Question, onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 px-4 py-2 text-sm font-black text-cyan-700 uppercase tracking-[0.2em] ml-1 mb-3 block rounded-lg border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition-all active:scale-95"
      >
        戻る
      </button>
      <div className="space-y-4 mb-12">
        <p className="text-gray-500 max-w-sm mx-auto font-medium">
          {question.question}
        </p>

        <div>
            <ul>
                {Object.entries(question.choices).map(([key, value]) => (
                    <li key={key}>
                    {key}: {value}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  )
}
