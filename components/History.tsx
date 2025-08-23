import type { History } from "@/types/type";
import formatTime from "@/utils/FormatTime";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { GlassButton } from "./GlassButton";

export const HistoryCard = (props: History) => {
    const { colors, image, id, detectedAt, onDelete, loading } = props;
    const [imgLoading, setImgLoading] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [imgKey, setImgKey] = useState(0);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;
    useEffect(() => {
        setImgError(false);
        setImgLoading(false);
        setRetryCount(0);
        setImgKey(prev => prev + 1);
    }, [image]);

    const handleDelete = async () => {
        Alert.alert(
            "Hapus Riwayat",
            "Apakah Anda yakin ingin menghapus riwayat ini?",
            [
                { text: "Batal", style: "cancel" },
                { text: "Hapus", onPress: async () => { await onDelete(id); } }
            ]
        );
    };

    const handleReloadImage = () => {
        if (retryCount < maxRetries) {
            setImgError(false);
            setImgLoading(true);
            setRetryCount(prev => prev + 1);
            setImgKey(prev => prev + 1);
        } else {
            Alert.alert(
                "Gagal Memuat Gambar",
                "Tidak dapat memuat gambar setelah beberapa percobaan. Periksa koneksi internet Anda.",
                [{ text: "OK" }]
            );
        }
    };

    const handleImageLoadStart = () => {
        setImgLoading(true);
        setImgError(false);
    };

    const handleImageLoadEnd = () => {
        setImgLoading(false);
        setImgError(false);
    };

    const handleImageError = (error: any) => {
        setImgLoading(false);
        setImgError(true);
    };

    const getImageUri = () => {
        if (!image) return '';
        const separator = image.includes('?') ? '&' : '?';
        return `${image}${separator}t=${imgKey}&retry=${retryCount}`;
    };

    return (
        <TouchableOpacity
            onPress={() => {
                router.push({ pathname: `/(tabs)/history/detail`, params: { id } })
            }}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 16,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    {imgLoading && (
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2
                        }}>
                            <MaterialIcons name="hourglass-empty" size={20} color="white" />
                        </View>
                    )}

                    {imgError ? (
                        <TouchableOpacity
                            onPress={handleReloadImage}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(255,0,0,0.2)'
                            }}
                            disabled={retryCount >= maxRetries}
                        >
                            <Feather
                                name={retryCount >= maxRetries ? "x-circle" : "refresh-cw"}
                                size={retryCount >= maxRetries ? 20 : 16}
                                color={retryCount >= maxRetries ? "#ff6b6b" : "white"}
                            />
                            <Text style={{
                                color: retryCount >= maxRetries ? "#ff6b6b" : "white",
                                fontSize: 8,
                                marginTop: 2,
                                textAlign: 'center'
                            }}>
                                {retryCount >= maxRetries ? "Failed" : `Retry\n(${retryCount}/${maxRetries})`}
                            </Text>
                        </TouchableOpacity>
                    ) : image ? (
                        <Image
                            key={`${id}-${imgKey}`}
                            source={{
                                uri: getImageUri(),
                                cache: 'reload'
                            }}
                            style={{ width: '100%', height: '100%' }}
                            onLoadStart={handleImageLoadStart}
                            onLoadEnd={handleImageLoadEnd}
                            onError={handleImageError}
                            resizeMode="cover"
                        />
                    ) : (
                        <MaterialIcons name="image" size={28} color="white" />
                    )}
                </View>

                <View>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                        {colors && colors.length > 0 ? colors[0].name : '-'}
                    </Text>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}>
                        {formatTime(detectedAt as string)}
                    </Text>
                    {colors && colors.length > 1 && (
                        <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}>
                            +{colors.length - 1} warna lainnya
                        </Text>
                    )}
                </View>
            </View>

            <GlassButton
                onPress={handleDelete}
                style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                }}
                disabled={loading}
            >
                {loading ? (
                    <MaterialIcons name="auto-delete" size={24} color="white" />
                ) : (
                    <Feather name="trash" size={24} color="white" />
                )}
            </GlassButton>
        </TouchableOpacity>
    )
}