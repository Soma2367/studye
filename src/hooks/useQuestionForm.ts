import { useState } from "react";
import { generateQuestionAction } from "@/actions/gemini";
import { Question, QuestionForm } from "@/types/schema";

const initialForm: QuestionForm = {
    targetScore: '200',
    questionType: 'random',
    option: '',
};

export function useQuestionForm() {
    const [form, setForm] = useState<QuestionForm>(initialForm);
    const [isLoading, setIsLoading] = useState(false);

    const updateConfig = <K extends keyof QuestionForm>(
        key: K,
        value: QuestionForm[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const submitForm = async (): Promise<{ question: Question; config: QuestionForm } | null> => {
        setIsLoading(true);
        try {
            const result = await generateQuestionAction(form);

            if(!result.success) {
                console.error(result.error);
                return null;
            }

            return { question: result.data, config: form };
        } catch (e) {
            console.error("通信エラー", e);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => setForm(initialForm);

    return {
        form,
        isLoading,
        updateConfig,
        submitForm,
        reset,
    };
}