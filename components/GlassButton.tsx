import { TouchableOpacity } from "react-native";

export const GlassButton = ({ children, onPress, style, disabled, ...props }: { children: React.ReactNode, onPress: () => void, style?: object, disabled?: boolean }) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
            hover: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: [{ scale: 1.05 }],
            }
        }, style]}
        {...props}
    >
        {children}
    </TouchableOpacity>
)