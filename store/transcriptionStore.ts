import { create } from 'zustand';

export interface Transcription {
  id: string;
  text: string;
  translatedText?: string;
  timestamp: Date;
}

interface TranscriptionState {
  transcriptions: Transcription[];
  isRecording: boolean;
  autoSpeak: boolean;
  fromLang: string;
  toLang: string;
  addTranscription: (text: string, translatedText?: string, id?: string) => void;
  updateTranslation: (id: string, translatedText: string) => void;
  setIsRecording: (isRecording: boolean) => void;
  setAutoSpeak: (autoSpeak: boolean) => void;
  clearTranscriptions: () => void;
  setFromLang: (lang: string) => void;
  setToLang: (lang: string) => void;
}

export const useTranscriptionStore = create<TranscriptionState>((set) => ({
  transcriptions: [],
  isRecording: false,
  autoSpeak: true,
  fromLang: 'en',
  toLang: 'es',
  addTranscription: (text: string, translatedText?: string, id?: string) =>
    set((state) => ({
      transcriptions: [
        {
          id: id || Date.now().toString(),
          text,
          translatedText,
          timestamp: new Date(),
        },
        ...state.transcriptions,
      ],
    })),
  updateTranslation: (id: string, translatedText: string) =>
    set((state) => ({
      transcriptions: state.transcriptions.map((t) =>
        t.id === id ? { ...t, translatedText } : t
      ),
    })),
  setIsRecording: (isRecording: boolean) => set({ isRecording }),
  setAutoSpeak: (autoSpeak: boolean) => set({ autoSpeak }),
  clearTranscriptions: () => set({ transcriptions: [] }),
  setFromLang: (lang: string) => set({ fromLang: lang }),
  setToLang: (lang: string) => set({ toLang: lang }),
}));