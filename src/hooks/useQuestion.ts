import { useState } from "react";
import { generateQuestionAction } from "@/actions/gemini";
import { Question, QuestionForm } from "@/types/schema";

export function useQuestion() {
    const [question, setQuestion] = useState<Question | null>(null);
    const [config, setConfig] = useState<QuestionForm | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const setNewQuestion = async (newQuestion: Question, newConfig: QuestionForm) => {
        setQuestion(newQuestion);
        setConfig(newConfig);
    };

    const generateNext = async () => {
        if(!config) return;

        setIsLoading(true);

        try {
            const result = await generateQuestionAction(config);
            if(result.success) {
                setQuestion(result.data);
            } else {
                console.error(result.error);
            }
        } catch (e) {
            console.error("通信エラー", e);
        } finally {
            setIsLoading(false);
        }
    }

    const clear = () => {
        setQuestion(null);
        setConfig(null);
    }

    return {
        question,
        config,
        isLoading,
        setNewQuestion,
        generateNext,
        clear,
    }
}