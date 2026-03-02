export function speak(text: string, onEnd?: () => void) {
    const synth = window.speechSynthesis;

    synth.cancel();

    const startSpeaking = () => {
        const speech = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();

        const highQualityVoice =
            voices.find(v => v.name === 'Google US English') ||
            voices.find(v => v.name.includes('Samantha') && v.name.includes('Enhanced')) ||
            voices.find(v => v.lang === 'en-US' || v.lang === 'en_US');

        if (highQualityVoice) {
            speech.voice = highQualityVoice;
        }

        speech.lang = 'en-US';
        speech.rate = 1.0;

        speech.onend = () => {
            if (onEnd) onEnd();
        };

        synth.speak(speech);
    };

    if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = startSpeaking;
    } else {
        startSpeaking();
    }
}