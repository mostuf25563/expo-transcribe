import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranscriptionStore } from '../store/transcriptionStore';
import { LANGUAGES } from '../utils/translation';

export default function LanguageSelector() {
  const { fromLang, toLang, setFromLang, setToLang } = useTranscriptionStore();

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>From:</Text>
        <Picker
          selectedValue={fromLang}
          onValueChange={setFromLang}
          style={styles.picker}>
          {LANGUAGES.map((lang) => (
            <Picker.Item key={lang.code} label={lang.name} value={lang.code} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>To:</Text>
        <Picker
          selectedValue={toLang}
          onValueChange={setToLang}
          style={styles.picker}>
          {LANGUAGES.map((lang) => (
            <Picker.Item key={lang.code} label={lang.name} value={lang.code} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  picker: {
    height: 40,
  },
});