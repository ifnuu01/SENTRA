import type { DetectionResult, ErrorResponse } from "@/types/type";
import { API_URL } from "@/utils/Api";
import { getToken } from "@/utils/GetToken";
import { useState } from "react";
import { Alert, Platform } from "react-native";

function getMimeType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'png') return 'image/png';
    if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
    if (ext === 'webp') return 'image/webp';
    return 'image/jpeg';
}

export const useDetect = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [resultDetection, setResultDetection] = useState<DetectionResult | null>(null);

    const uploadImage = async (asset: { uri: string, type: string, name: string }) => {
        setLoading(true);
        setError(null);
        setResultDetection(null);
        try {
            const token = await getToken();

            let uri = asset.uri;

            if (Platform.OS === 'android' && !uri.startsWith('file://')) {
                uri = 'file://' + uri.replace('file:/', '');
            }

            const filename = asset.name || uri.split('/').pop() || `image.jpg`;
            const contentType = asset.type?.includes('/') ? asset.type : getMimeType(filename);

            const formData = new FormData();

            (formData as any).append('image', {
                uri,
                name: filename,
                type: contentType,
            });
            const response = await fetch(`${API_URL}/api/colors/detect-color`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result);
                if (result.message) {
                    Alert.alert("Upload Gagal", result.message);
                }
            }
            setResultDetection(result);
        } catch (error) {
            console.log('Error uploading image', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        resultDetection,
        setResultDetection,
        uploadImage
    }
}