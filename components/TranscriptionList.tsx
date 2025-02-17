import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTranscriptionStore } from '../store/transcriptionStore';
import { Ionicons } from '@expo/vector-icons';
import { freeSpeak, LANGUAGES } from '../utils/translation';

export default function TranscriptionList() {
  const transcriptions = useTranscriptionStore((state) => state.transcriptions);
  const toLang = useTranscriptionStore((state) => state.toLang);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSpeak = async (text: string) => {
    const langCode = Platform.OS === 'web' ? 
      LANGUAGES.find(lang => lang.code === toLang)?.ttsCode : 
      toLang;
    if (langCode) {
      await freeSpeak(text, langCode);
    }
  };

  return (
    <FlatList
      data={transcriptions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.transcriptionItem}>
          <View style={styles.textContainer}>
            <Text style={styles.transcriptionText}>{item.text}</Text>
            {item.translatedText ? (
              <Text style={styles.translatedText}>{item.translatedText}</Text>
            ) : (
              <Text style={styles.translatingText}>Translating...</Text>
            )}
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
          </View>
          {item.translatedText && (
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() => handleSpeak(item.translatedText!)}>
              <Ionicons name="volume-medium" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  transcriptionItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  transcriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  translatedText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  translatingText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  speakButton: {
    marginLeft: 16,
    padding: 8,
  },
});