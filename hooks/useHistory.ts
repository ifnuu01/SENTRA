import { ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { getToken } from "@/utils/GetToken";
import { useState } from "react";
import { Alert } from "react-native";

export const useHistory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [history, setHistory] = useState<History[]>([]);

    const getHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/colors/history`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result);
                return;
            }
            setHistory(result.data);
        } catch (error) {
            console.error('Error fetching history', error);
        } finally {
            setLoading(false);
        }
    }

    const deleteHistory = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/colors/history/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if (result.message) {
                    Alert.alert("Error", result.message);
                }
                return;
            }
            setHistory(history.filter((item: any) => item._id !== id));
        } catch (error) {
            console.error('Error deleting history', error);
        } finally {
            setLoading(false);
        }
    }

    const deleteAllHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/colors/history/delete`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if (result.message) {
                    Alert.alert("Error", result.message);
                }
                return;
            }
            setHistory([]);
        } catch (error) {
            console.error('Error deleting all history', error);
        } finally {
            setLoading(false);
        }
    }

    const getHistoryById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();

            const response = await fetch(`${API_URL}/api/colors/history/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result);
                return;
            }
            return result.data;

        } catch (error) {
            console.error('Error fetching history by ID', error);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        history,
        getHistory,
        deleteHistory,
        deleteAllHistory,
        getHistoryById
    }
}