import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useTranscriptionStore } from '../store/transcriptionStore';
import { translate, freeSpeak, LANGUAGES } from '../utils/translation';

export function useWebSpeechRecognition() {
  const recognition = useRef<SpeechRecognition | null>(null);
  const { addTranscription, updateTranslation, setIsRecording, fromLang, toLang, autoSpeak } = useTranscriptionStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = fromLang;

      recognition.current.onresult = async (event: SpeechRecognitionEvent) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        
        if (transcript.trim()) {
          const isFinal = event.results[event.results.length - 1].isFinal;
          
          if (isFinal) {
            // Clear any pending timeouts
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }

            const id = Date.now().toString();
            // Immediately show the original text
            addTranscription(transcript, undefined, id);

            // Start translation in the background
            translate({
              finalTranscriptProxy: transcript,
              fromLang,
              toLang,
            }).then(async (translatedText) => {
              updateTranslation(id, translatedText);
              
              if (autoSpeak && translatedText) {
                const langCode = Platform.OS === 'web' ? 
                  LANGUAGES.find(lang => lang.code === toLang)?.ttsCode : 
                  toLang;
                if (langCode) {
                  await freeSpeak(translatedText, langCode);
                }
              }
            });
          }
        }
      };

      recognition.current.onend = () => {
        setIsRecording(false);
      };

      // Start listening immediately
      recognition.current.start();
      setIsRecording(true);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, [fromLang, toLang, autoSpeak]);

  const startRecording = () => {
    if (recognition.current) {
      recognition.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsRecording(false);
    }
  };

  return {
    startRecording,
    stopRecording,
    isSupported: Platform.OS === 'web' && 'webkitSpeechRecognition' in window,
  };
}