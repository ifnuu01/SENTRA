import { GlassButton } from "@/components/GlassButton";
import { useHistory } from "@/hooks/useHistory";
import { copyToClipboard } from "@/utils/CopyColor";
import formatTime from "@/utils/FormatTime";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, View } from "react-native";

export default function HistoryDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [data, setData] = useState<any | null>(null);
    const [imgLoading, setImgLoading] = useState(false);
    const [imgError, setImgError] = useState(false);
    const { loading, getHistoryById, deleteHistory } = useHistory();

    const load = async () => {
        if (!id) return;
        const res = await getHistoryById(id);
        setData(res);
        console.log(res);
    };

    useEffect(() => {
        load();
    }, [id]);

    const handleCopy = async (label: string, value: string) => {
        await copyToClipboard(value);
    }

    const handleDelete = async () => {
        if (!data) return;
        Alert.alert(
            "Hapus Riwayat",
            "Apakah Anda yakin ingin menghapus riwayat ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus", onPress: async () => {
                        await deleteHistory(data._id);
                        router.push('/history/index');
                    }
                }
            ]
        );
    };

    const handleReloadImage = () => {
        setImgError(false);
        setImgLoading(true);
    };

    return (
        <LinearGradient
            colors={['#00CDA8', '#00B9D4', '#0078F4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, paddingTop: 20, paddingHorizontal: 16 }}
        >
            <ScrollView style={{ flex: 1, marginBottom: 120 }} contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
                {loading && !data && (
                    <View style={{ alignItems: 'center', marginTop: 60 }}>
                        <ActivityIndicator color="#fff" size="large" />
                        <Text style={{ color: 'white', marginTop: 12 }}>Memuat detail...</Text>
                    </View>
                )}

                {!loading && !data && (
                    <View style={{ alignItems: 'center', marginTop: 60 }}>
                        <MaterialIcons name="error-outline" size={48} color="white" />
                        <Text style={{ color: 'white', marginTop: 12, fontWeight: '600' }}>Data tidak ditemukan</Text>
                        <GlassButton onPress={load} style={{ marginTop: 16, paddingHorizontal: 24 }}>
                            <Text style={{ color: 'white', fontWeight: '600' }}>Coba Lagi</Text>
                        </GlassButton>
                    </View>
                )}

                {data && (
                    <View>
                        {/* Gambar dengan reload */}
                        {data.image && (
                            <View style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', height: 220 }}>
                                {imgLoading ? (
                                    <ActivityIndicator color="#fff" size="large" />
                                ) : imgError ? (
                                    <GlassButton onPress={handleReloadImage} style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                                        <Feather name="refresh-cw" size={24} color="white" />
                                        <Text style={{ color: 'white', marginLeft: 8 }}>Reload Gambar</Text>
                                    </GlassButton>
                                ) : (
                                    <Image
                                        source={{ uri: data.image.replace('\\', '/') }}
                                        style={{ width: '100%', height: 220 }}
                                        resizeMode="cover"
                                        onLoadEnd={() => setImgLoading(false)}
                                        onError={() => { setImgError(true); setImgLoading(false); }}
                                    />
                                )}
                            </View>
                        )}

                        {/* Semua warna dari array colors */}
                        {data.colors && data.colors.length > 0 && (
                            <View style={{ gap: 24 }}>
                                {data.colors.map((color: any, idx: number) => (
                                    <View key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                                            <View style={{ width: 80, height: 80, borderRadius: 16, backgroundColor: color.hex, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' }} />
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>{color.name}</Text>
                                                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 }}>{formatTime(data.detectedAt)}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 20, gap: 12 }}>
                                            {[{ label: 'HEX', value: color.hex }, { label: 'RGB', value: color.rgb }, { label: 'HSL', value: color.hsl }].map(item => (
                                                <View key={item.label} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                                                    <View>
                                                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{item.label}</Text>
                                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{item.value}</Text>
                                                    </View>
                                                    <GlassButton onPress={() => handleCopy(item.label, item.value)} style={{ paddingVertical: 10, paddingHorizontal: 14 }}>
                                                        <Feather name="copy" size={18} color="white" />
                                                    </GlassButton>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        <GlassButton
                            onPress={handleDelete}
                            style={{
                                backgroundColor: 'rgba(255, 0, 0, 0.6)',
                                padding: 12,
                                borderRadius: 8,
                                borderWidth: 1,
                                marginTop: 20,
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Feather name="trash" size={18} color="white" />
                                <Text style={{ color: 'white', fontWeight: '600' }}>Hapus</Text>
                            </View>
                        </GlassButton>
                    </View>
                )}
            </ScrollView>
        </LinearGradient>
    );
}
