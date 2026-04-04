import { speak } from "@/utils/speak";
import { useState } from "react";

export function useSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const play = (text: string) => {
    setIsSpeaking(true);
    speak(text, () => {
      setIsSpeaking(false);
    });
  };

  return { isSpeaking, play };
}