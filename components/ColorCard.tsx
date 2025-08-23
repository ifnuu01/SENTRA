import { copyToClipboard } from "@/utils/CopyColor";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ColorCard = ({ color }: { color: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (color: string) => {
        copyToClipboard(color);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const getColorLabel = (colorValue: string) => {
        if (colorValue.startsWith('#')) return 'HEX';
        if (colorValue.startsWith('rgb')) return 'RGB';
        if (colorValue.startsWith('hsl')) return 'HSL';
        return '';
    }

    return (
        <TouchableOpacity
            onPress={() => handleCopy(color)}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 7,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 3,
                width: 130,
                minHeight: 40,
                borderWidth: copied ? 1 : 0,
                borderColor: copied ? 'white' : 'transparent',
            }}
        >
            {copied ? (
                <View style={{ alignItems: 'center' }}>
                    <Feather name="check" size={16} color="white" />
                    <Text style={{
                        color: 'white',
                        fontSize: 10,
                        marginTop: 2,
                        fontWeight: 'bold'
                    }}>
                        Menyalin!
                    </Text>
                </View>
            ) : (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 10,
                        fontWeight: 'bold',
                        marginBottom: 2
                    }}>
                        {getColorLabel(color)}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 11,
                            textAlign: 'center',
                            fontFamily: color.startsWith('#') ? 'monospace' : 'default'
                        }}
                        numberOfLines={2}
                    >
                        {color}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
}