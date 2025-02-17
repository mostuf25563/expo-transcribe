import { View, StyleSheet } from 'react-native';
import TranscriptionList from '../../components/TranscriptionList';

export default function HistoryPage() {
  return (
    <View style={styles.container}>
      <TranscriptionList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});