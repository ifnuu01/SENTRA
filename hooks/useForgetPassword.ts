import { ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const forgetPassword = async (email:string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth/forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if(!response.ok) {
                setError(result);
                return;
            }
            Alert.alert("Berhasil", result.message || "Permintaan berhasil dikirim. Silakan periksa email Anda.");
            setEmail(email);
        } catch (error) {
            setError(error as ErrorResponse);
        } finally {
            setLoading(false);
        }
    }

    const verifyForgetPassword = async(verificationCode:string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth/forget-password/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, verificationCode }),
            });

            const result = await response.json();

            if(!response.ok) {
                setError(result);
                return;
            }
            Alert.alert("Berhasil", result.message || "Verifikasi berhasil.");
            setToken(result.token);
        } catch (error) {
            console.log("Invalid Server Error");
        } finally {
            setLoading(false);
        }
    }

    const newPassword = async(newPassword:string, confirmPassword:string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth/forget-password/new-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newPassword, confirmPassword }),
            });

            const result = await response.json();

            if(!response.ok) {
                setError(result);
                return;
            }
            Alert.alert("Berhasil", result.message || "Password berhasil diubah.");
            router.replace("/login");
        } catch (error) {
            console.log("Invalid Server Error");
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        loading,
        error,
        forgetPassword,
        verifyForgetPassword,
        newPassword
    }

}