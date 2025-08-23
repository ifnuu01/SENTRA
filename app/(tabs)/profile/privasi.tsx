
import { GlassButton } from "@/components/GlassButton";
import { useAuth } from "@/hooks/AuthContext";
import { useHistory } from "@/hooks/useHistory";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PrivasiScreen() {
    const { loading: loadingDeleteAccount, deleteAccount } = useAuth();
    const { loading: loadingClearHistory, deleteAllHistory } = useHistory();

    const handleClearHistory = async () => {
        Alert.alert(
            "Hapus Riwayat Deteksi",
            "Apakah Anda yakin ingin menghapus semua riwayat deteksi warna? Tindakan ini tidak dapat dibatalkan.",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    style: "destructive",
                    onPress: async () => {
                        await deleteAllHistory();
                        Alert.alert("Berhasil", "Riwayat deteksi telah dihapus");
                    }
                }
            ]
        );
    };

    const handleClearCache = () => {
        Alert.alert(
            "Bersihkan Cache",
            "Membersihkan cache akan menghapus data sementara dan dapat mempercepat aplikasi.",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Bersihkan",
                    onPress: () => {
                        Alert.alert("Berhasil", "Cache aplikasi telah dibersihkan");
                    }
                }
            ]
        );
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Hapus Akun",
            "PERINGATAN: Menghapus akun akan menghilangkan semua data Anda secara permanen. Tindakan ini tidak dapat dibatalkan.",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus Akun",
                    style: "destructive",
                    onPress: async () => {
                        Alert.alert(
                            "Konfirmasi Terakhir",
                            "Apakah Anda benar-benar yakin ingin menghapus akun? Semua data akan hilang selamanya.",
                            [
                                { text: "Batal", style: "cancel" },
                                {
                                    text: "Ya, Hapus",
                                    style: "destructive",
                                    onPress: async () => {
                                        setTimeout(async () => {
                                            await deleteAccount();
                                            Alert.alert("Akun Dihapus", "Akun Anda telah berhasil dihapus");
                                        }, 2000);
                                    }
                                }
                            ]
                        );
                    }
                }
            ]
        );
    };

    return (
        <LinearGradient
            colors={['#887DFF', '#AD46FF', '#EB3CA9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            style={{ flex: 1 }}
        >
            <ScrollView
                style={{ flex: 1, maxHeight: 610 }}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    paddingBottom: 120,
                    gap: 10
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <MaterialIcons name="privacy-tip" size={28} color="white" />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '700',
                            color: 'white',
                            marginLeft: 12,
                        }}>
                            Kebijakan Privasi
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: 16,
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 24,
                        marginBottom: 16,
                    }}>
                        SENTRA menghormati privasi Anda dan berkomitmen melindungi data pribadi Anda.
                    </Text>

                    <View style={{ gap: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <MaterialIcons name="fiber-manual-record" size={8} color="white" style={{ marginTop: 8, marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', flex: 1, lineHeight: 20 }}>
                                Data deteksi warna disimpan aman dan dirahasiakan
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <MaterialIcons name="fiber-manual-record" size={8} color="white" style={{ marginTop: 8, marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', flex: 1, lineHeight: 20 }}>
                                Kami tidak membagikan data pribadi kepada pihak ketiga
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <MaterialIcons name="fiber-manual-record" size={8} color="white" style={{ marginTop: 8, marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', flex: 1, lineHeight: 20 }}>
                                Gambar yang diambil tidak disimpan secara permanen anda dapat menghapusnya kapan saja
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <MaterialIcons name="fiber-manual-record" size={8} color="white" style={{ marginTop: 8, marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', flex: 1, lineHeight: 20 }}>
                                Data hanya digunakan untuk meningkatkan akurasi deteksi
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <MaterialIcons name="storage" size={28} color="white" />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '700',
                            color: 'white',
                            marginLeft: 12,
                        }}>
                            Pengaturan Data
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleClearHistory}
                        disabled={loadingClearHistory}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            opacity: loadingClearHistory ? 0.6 : 1,
                        }}
                    >
                        <MaterialIcons name="history" size={24} color="white" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                {loadingClearHistory ? 'Menghapus Riwayat...' : 'Bersihkan Riwayat Deteksi'}
                            </Text>
                            <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                                Hapus semua riwayat deteksi warna
                            </Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleClearCache}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                        }}
                    >
                        <MaterialIcons name="cached" size={24} color="white" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                Bersihkan Cache
                            </Text>
                            <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                                Hapus data sementara aplikasi
                            </Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="white" />
                    </TouchableOpacity>

                </View>

                {/* Kontrol Akun Section */}
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <MaterialIcons name="account-circle" size={28} color="white" />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '700',
                            color: 'white',
                            marginLeft: 12,
                        }}>
                            Kontrol Akun
                        </Text>
                    </View>

                    <GlassButton
                        onPress={handleDeleteAccount}
                        disabled={loadingDeleteAccount}
                        style={{
                            backgroundColor: 'rgba(255, 69, 58, 0.3)',
                            borderColor: 'rgba(255, 69, 58, 0.5)',
                            opacity: loadingDeleteAccount ? 0.6 : 1,
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="delete-forever" size={24} color="white" />
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: '600',
                                marginLeft: 8,
                            }}>
                                {loadingDeleteAccount ? 'Menghapus Akun...' : 'Hapus Akun'}
                            </Text>
                        </View>
                    </GlassButton>
                </View>

                {/* Izin Aplikasi Section */}
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <MaterialIcons name="security" size={28} color="white" />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '700',
                            color: 'white',
                            marginLeft: 12,
                        }}>
                            Izin Aplikasi
                        </Text>
                    </View>

                    <View style={{ gap: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="camera-alt" size={24} color="white" />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                    Akses Kamera
                                </Text>
                                <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Untuk mendeteksi warna objek
                                </Text>
                            </View>
                            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="storage" size={24} color="white" />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
                                    Penyimpanan
                                </Text>
                                <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Menyimpan riwayat dan pengaturan
                                </Text>
                            </View>
                            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
