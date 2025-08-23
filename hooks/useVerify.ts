import { ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "./AuthContext";

export const useVerify = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const { getMe, setUser, setToken } = useAuth();

    const verify = async (email: string, verificationCode: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth/verify-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email, verificationCode }),
            });
            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if(result.message) {
                    Alert.alert("Verification Gagal", result.message);
                }
                return;
            }

            console.log("Verification successful:", result);
            await AsyncStorage.setItem("token", result.token);
            await AsyncStorage.setItem("user", JSON.stringify(result.user));

            await getMe();
            setToken(result.token);
            setUser(result.user);

        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, error, verify };
};
