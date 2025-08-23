import { copyToClipboard } from "@/utils/CopyColor";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";

interface BubbleProps {
    text: string;
    sender: 'user' | 'bot';
    colors?: string[];
}

export const Bubble = ({ text, sender, colors = [] }: BubbleProps) => {
    const [copied, setCopied] = useState('');
    const [displayedText, setDisplayedText] = useState(sender === 'bot' ? '' : text);

    const handleCopy = (color: string) => {
        copyToClipboard(color);
        setCopied(color);
    }

    const isUser = sender === 'user';

    useEffect(() => {
        if (sender === 'bot') {
            const cleanText = text.replace(/\n+$/, '');
            let index = 0;
            const interval = setInterval(() => {
                setDisplayedText(cleanText.slice(0, index));
                index++;
                if (index > cleanText.length) clearInterval(interval);
            }, 1);
            return () => clearInterval(interval);
        }
    }, [text]);

    return (
        <View
            style={{
                flexDirection: isUser ? 'row-reverse' : 'row',
                marginBottom: 10,
                alignItems: 'flex-end'
            }}
        >
            <View
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: isUser ? '#0078F4' : 'rgba(255, 255, 255, 0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5
                }}
            >
                {isUser ? (
                    <Feather name="user" size={14} color="white" />
                ) : (
                    <FontAwesome6 name="robot" size={12} color="white" />
                )}
            </View>


            <View
                style={{
                    backgroundColor: isUser ? '#0078F4' : 'rgba(255, 255, 255, 0.1)',
                    padding: 10,
                    borderRadius: 10,
                    maxWidth: '80%'
                }}
            >
                <View style={{ marginBottom: 4, paddingBottom: 8 }}>
                    <Markdown
                        style={{
                            body: { color: 'white', fontSize: 16, marginBottom: 0, paddingBottom: 0, lineHeight: 20 },
                            paragraph: { marginBottom: 0, paddingBottom: 0 }
                        }}
                    >
                        {displayedText}
                    </Markdown>
                </View>


                {displayedText.length === text.length && colors.length > 0 && (
                    <View
                        style={{
                            borderRadius: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            padding: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 10
                        }}
                    >
                        {colors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 100,
                                    backgroundColor: color,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => handleCopy(color)}
                            >
                                {copied === color && (
                                    <Feather name="copy" size={20} color="white" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};
