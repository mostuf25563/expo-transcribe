import { View, Text, StyleSheet, TouchableOpacity, Platform, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWebSpeechRecognition } from '../../hooks/useWebSpeechRecognition';
import { useTranscriptionStore } from '../../store/transcriptionStore';
import TranscriptionList from '../../components/TranscriptionList';
import LanguageSelector from '../../components/LanguageSelector';

export default function TranscribePage() {
  const { startRecording, stopRecording, isSupported } = useWebSpeechRecognition();
  const isRecording = useTranscriptionStore((state) => state.isRecording);
  const autoSpeak = useTranscriptionStore((state) => state.autoSpeak);
  const setAutoSpeak = useTranscriptionStore((state) => state.setAutoSpeak);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!isSupported && Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Speech recognition is not supported in this browser.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <View style={styles.settingsContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Auto-speak translations</Text>
          <Switch
            value={autoSpeak}
            onValueChange={setAutoSpeak}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={autoSpeak ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>
      <View style={styles.content}>
        <TranscriptionList />
      </View>
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recording]}
        onPress={toggleRecording}
      >
        <Ionicons
          name={isRecording ? 'stop' : 'mic'}
          size={32}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  recordButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    margin: 20,
  },
});