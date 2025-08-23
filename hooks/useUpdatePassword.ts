import { ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { getToken } from "@/utils/GetToken";
import { useState } from "react";
import { Alert } from "react-native";

export const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse| null>(null);

    const updatePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();

            const response = await fetch(`${API_URL}/api/auth/me/update-password`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword, confirmPassword })
            })

            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if (result.message) {
                    Alert.alert("Update Gagal", result.message);
                }
                return;
            }

            return result.message;
        } catch (error) {
            console.log('Error updating password:', error);
        } finally{
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        updatePassword
    }
}