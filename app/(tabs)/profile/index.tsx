import { Button } from "@/components/Button";
import { GlassButton } from "@/components/GlassButton";
import { useAuth } from "@/hooks/AuthContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback } from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {
    const { loading, logout, getMe, user } = useAuth();

    const handelLogout = async () => {
        await logout();
    }

    useFocusEffect(
        useCallback(() => {
            getMe();
        }, [])
    );

    return (
        <LinearGradient
            colors={[
                '#887DFF',
                '#AD46FF',
                '#EB3CA9',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            style={{ flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 10 }}
        >
            <View
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    width: '100%',
                    padding: 20,
                    borderRadius: 10,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                }}
            >
                <View
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                        borderWidth: 2,
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 24,
                        }}
                    >{user?.name[0]}</Text>
                </View>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >{user?.name}</Text>
                <Text
                    style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: 14,
                    }}
                >{user?.email}</Text>
                <View
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: 'rgba(251, 247, 19, 0.5)',
                        borderRadius: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 10,
                    }}
                >
                    <Feather name="shield" size={24} color="white" />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 12,
                        }}
                    >Terverifikasi</Text>
                </View>
            </View>

            <View
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    width: '100%',
                    padding: 20,
                    borderRadius: 10,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    marginTop: 10,
                    flexDirection: 'column',
                    gap: 20,
                }}
            >
                <Button
                    icon={<Feather name="settings" size={24} color="white" />}
                    label="Pengaturan"
                    onPress={() => router.push('/(tabs)/profile/settings')}
                    detail="Kelola akun dan preferensi"
                />
                <Button
                    icon={<Feather name="help-circle" size={24} color="white" />}
                    label="Bantuan"
                    onPress={() => router.push('/(tabs)/profile/help')}
                    detail="FAQ dan panduan penggunaan"
                />
                <Button
                    icon={<Feather name="shield" size={24} color="white" />}
                    label="Privasi"
                    onPress={() => router.push('/(tabs)/profile/privasi')}
                    detail="Kebijakan privasi dan keamanan"
                />
            </View>

            <GlassButton
                onPress={handelLogout}
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    marginTop: 10,
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                }}
            >
                {loading ? <MaterialIcons name="hourglass-empty" size={24} color="white" /> : <Feather name="log-out" size={24} color="white" />}
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >Keluar</Text>
            </GlassButton>

            <View
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    marginTop: 10,
                    flexDirection: 'column',
                    gap: 10,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 14,
                    }}
                >Sentra v1.0.0</Text>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 14,
                    }}
                >© 2025 Ifnu</Text>
            </View>

        </LinearGradient>
    )
}