import { ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);

    const register = async (name: string, email: string, password: string, confirmPassword: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            });
            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if(result.message) {
                    Alert.alert('Register Gagal',result.message);
                }
                return;
            }

            router.push({
                pathname: `/verify`,
                params: { email },
            })

        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, error, register };
};
