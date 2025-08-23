import { Bubble } from "@/components/Bubble";
import { useChat } from "@/hooks/useChat";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChatbotLayout() {
    const { messages, sendMessage, loading } = useChat();
    const [inputValue, setInputValue] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const flatListRef = useRef<FlatList<any>>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={
                    ['#15acf7ff', '#60a5fa', '#60a5fa', '#60a5fa', '#0077ffff']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 10 }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
                        paddingBottom: 10,
                        gap: 10,
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome6 name="robot" size={24} color="white" />
                    </View>
                    <View>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}
                        >SENTRA</Text>
                        <Text
                            style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: 12,
                            }}
                        >AI Konsultan Warna</Text>
                    </View>
                </View>
                {messages.length === 0 && (
                    <View
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 20,
                            marginTop: 100,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 15,
                            textAlign: 'center'
                        }}>
                            💡 Saran Pertanyaan
                        </Text>

                        <View style={{ gap: 10, width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setInputValue('Warna apa yang cocok untuk ruang tamu?');
                                }}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                                    🏠 Warna apa yang cocok untuk ruang tamu?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setInputValue('Kombinasi warna yang trending tahun ini?');
                                }}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                                    ✨ Kombinasi warna yang trending tahun ini?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setInputValue('Bagaimana memilih warna cat untuk kamar tidur?');
                                }}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                                    🛏️ Bagaimana memilih warna cat untuk kamar tidur?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setInputValue('Warna apa yang membuat ruangan terlihat luas?');
                                }}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                                    📏 Warna apa yang membuat ruangan terlihat luas?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <FlatList
                    ref={flatListRef}
                    inverted
                    data={messages}
                    renderItem={({ item }) => (
                        <Bubble
                            text={item.text}
                            sender={item.sender}
                            colors={item.colors}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    style={{
                        flex: 1,
                        width: '100%',
                        marginTop: 20,
                        marginBottom: isKeyboardVisible ? 180 : 180,
                    }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => loading ? (
                        <View
                            style={{
                                width: 60,
                                height: 40,
                                flexDirection: 'row',
                                borderRadius: 20,
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 10,
                                alignSelf: 'flex-start'
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 12, marginLeft: 5 }}>●●●</Text>
                        </View>
                    ) : null}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: isKeyboardVisible ? 130 : 130,
                        left: 10,
                        right: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        zIndex: 1000,
                    }}
                >
                    <TextInput
                        placeholder="Tanyakan tentang warna..."
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        value={inputValue}
                        onChangeText={setInputValue}
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                            height: 45,
                            padding: 10,
                            fontSize: 16,
                            paddingLeft: 16,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            sendMessage(inputValue);
                            setInputValue('');
                        }}
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome6 name="paper-plane" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}