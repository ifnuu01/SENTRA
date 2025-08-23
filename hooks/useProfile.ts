import { ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { getToken } from "@/utils/GetToken";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "./AuthContext";

export const useProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse| null>(null);
    const { getMe, user, setUser } = useAuth();

    useEffect(() => {
        getMe();
    },[])

    const updateProfile = async (name: string) => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();

            const response = await fetch(`${API_URL}/api/auth/me/update-name`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name })
            })

            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if(result.message) {
                    Alert.alert("Update Gagal", result.message);
                }
                return;
            }

            if(user) {
                setUser({
                    ...user,
                    name: name
                });
            }

            return result.message;
        } catch (error) {
            console.log('Error updating profile:', error);
        } finally{
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        updateProfile,
        user
    }
}