export const translate = ({ finalTranscriptProxy, fromLang, toLang }: { finalTranscriptProxy: string, fromLang: string, toLang: string }): Promise<string> => {
    return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(finalTranscriptProxy)}`)
        .then(res => res.json())
        .then(data => {
            const y = data[0][0][0]
            return y
        })
        .catch(err => {
            console.error(err.message); return `translation error`
        })
}

export const freeSpeak = (text: string, toLang: string = 'en-US'): Promise<void> => {
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = toLang;
        utterance.onend = () => resolve();
        speechSynthesis.speak(utterance);
    });
}

export const LANGUAGES = [
  { code: 'en', name: 'English', ttsCode: 'en-US' },
  { code: 'es', name: 'Spanish', ttsCode: 'es-ES' },
  { code: 'fr', name: 'French', ttsCode: 'fr-FR' },
  { code: 'de', name: 'German', ttsCode: 'de-DE' },
  { code: 'it', name: 'Italian', ttsCode: 'it-IT' },
  { code: 'pt', name: 'Portuguese', ttsCode: 'pt-PT' },
  { code: 'ru', name: 'Russian', ttsCode: 'ru-RU' },
  { code: 'ja', name: 'Japanese', ttsCode: 'ja-JP' },
  { code: 'ko', name: 'Korean', ttsCode: 'ko-KR' },
  { code: 'zh', name: 'Chinese', ttsCode: 'zh-CN' },
  { code: 'he', name: 'Hebrew', ttsCode: 'he-IL' },
  { code: 'ar', name: 'Arabic', ttsCode: 'ar-SA' }
];