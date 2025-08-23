import type { ErrorResponse } from "@/types/type";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export const GlassInput = ({ placeholder, icon: Icon, style, error, name, password, ...props }: { placeholder: string, style?: Object, error?: ErrorResponse, icon?: React.ElementType, name: string, password?: boolean, [key: string]: any }) => {
    const [visible, setVisible] = useState<boolean>(password || false);

    return (
        <View style={{
            marginBottom: 16,
            gap: 8,
        }}>
            <BlurView intensity={15} style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 4,
                borderRadius: 12,
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
            }}>
                {Icon && (
                    <View style={{
                    }}>
                        <Icon />
                    </View>
                )}
                <TextInput
                    {...props}
                    placeholder={placeholder}
                    secureTextEntry={visible}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    style={[{
                        flex: 1,
                        color: 'white',
                        fontSize: 16,
                        paddingLeft: Icon ? 16 : 3,
                    }, style]}
                />
                {password && (
                    <Entypo name={visible ? "eye-with-line" : "eye"} size={24} color="white" onPress={() => setVisible(!visible)} />
                )}
            </BlurView>
            {error?.errors && (
                <Text style={{
                    color: 'red',
                    fontSize: 12,
                }}>
                    {error.errors
                        .filter(err => err.field === name)
                        .map(err => err.message)
                        .join(', ')
                    }
                </Text>
            )}
        </View>
    )
}