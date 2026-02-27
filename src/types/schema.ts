// 問題タイプ
export const QUESTION_TYPES = ['fill_in_the_blank', 'scramble', 'translation', 'synonym', 'preposition', 'insertion', 'paraphrase', 'random'] as const;

export type QuestionType = (typeof QUESTION_TYPES)[number];

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  fill_in_the_blank: '穴埋め',
  scramble: '並び替え',
  translation: '翻訳',
  synonym: '類義語',
  preposition: '前置詞',
  insertion: '文挿入',
  paraphrase: '言い換え',
  random: 'ランダム',
};

// 目標点数
export const TARGET_SCORES = ['200', '300', '400', '500', '600', '700', '800', '900'] as const;

export type TargetScore = (typeof TARGET_SCORES)[number];

export const TARGET_SCORE_LABELS: Record<TargetScore, string> = {
  '200': '200点',
  '300': '300点',
  '400': '400点',
  '500': '500点',
  '600': '600点',
  '700': '700点',
  '800': '800点',
  '900': '900点',
};

//問題フォーム
export interface QuestionForm {
    targetScore: TargetScore;
    questionType: QuestionType;
    option?: string;
}

//作成した問題
export interface Question {
    question: string;
    choices: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
}