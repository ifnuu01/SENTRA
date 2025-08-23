import { ErrorResponse, Message } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { getToken } from "@/utils/GetToken";
import { useState } from "react";
import { Alert } from "react-native";

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);

    const sendMessage = async (message: string) => {
        if (!message.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: message,
            sender: 'user'
        };
        setMessages((prev) => [newUserMessage, ...prev]);

        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/colors/chat-bot`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message })
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if (result.message) {
                    Alert.alert("Terjadi Kesalahan", result.message);
                }
                return;
            }

            const botMessage: Message = {
                id: Date.now().toString() + '-bot',
                text: result.reply,
                sender: 'bot',
                colors: result.colors || undefined
            };
            setMessages((prev) => [botMessage, ...prev]);
        } catch (error) {
            console.error('Error sending message', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        error,
        sendMessage
    };
};
