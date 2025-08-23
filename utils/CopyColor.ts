import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';

export const copyToClipboard = async (color: string) => {
    await Clipboard.setStringAsync(color);
    Alert.alert("Menyalin!", `Warna ${color} telah disalin ke clipboard!`);
};