import { ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { useState } from "react";
import { Alert } from "react-native";

export const useSendCode = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);

    const sendVerificationEmail = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth/resend-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if (result.message) {
                    Alert.alert("Kirim Kode Gagal", result.message);
                }
                return;
            }
            return result.message;
        } catch (error) {
            console.error("Send verification email error:", error);
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, sendVerificationEmail };
};
