import { Text, TouchableOpacity, View } from "react-native"

export const Button = ({ icon, label, onPress, detail }: {
    icon: React.ReactNode,
    label: string,
    onPress: () => void,
    detail?: string
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                width: '100%',
                gap: 10,
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: 10,
                    borderRadius: 10,
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                {icon}
            </View>
            <View>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >{label}</Text>
                <Text
                    style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: 12,
                    }}
                >{detail}</Text>
            </View>
        </TouchableOpacity>
    )
}