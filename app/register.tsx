import { GlassButton } from "@/components/GlassButton";
import { GlassInput } from "@/components/GlassInput";
import { useRegister } from "@/hooks/useRegister";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function register() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { loading, error, register } = useRegister();

    const handelRegister = async () => {
        await register(inputs.name, inputs.email, inputs.password, inputs.confirmPassword);
    }

    return (
        <LinearGradient
            colors={['#22c55e', '#60a5fa', '#60a5fa', '#60a5fa', '#a855f7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <BlurView intensity={20}
                    style={{
                        width: '100%',
                        maxWidth: 400,
                        padding: 20,
                        borderRadius: 16,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        overflow: 'hidden',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 24,
                            textAlign: 'center',
                            marginBottom: 4,
                            fontWeight: 'bold',
                        }}
                    >Daftar Akun</Text>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            marginBottom: 20,
                        }}
                    >Bergabunglah dengan Sentra</Text>
                    <GlassInput
                        placeholder="Nama"
                        name="name"
                        value={inputs.name}
                        error={error ? error : undefined}
                        onChangeText={(text: string) => setInputs({ ...inputs, name: text })}
                        icon={() => <FontAwesome5 name="user-alt" size={24} color="white" />}
                        autoCapitalize="none"
                    >
                    </GlassInput>
                    <GlassInput
                        placeholder="Email"
                        name="email"
                        value={inputs.email}
                        error={error ? error : undefined}
                        onChangeText={(text: string) => setInputs({ ...inputs, email: text })}
                        icon={() => <Entypo name="mail" size={24} color="white" />}
                        autoCapitalize="none"
                    >
                    </GlassInput>
                    <GlassInput
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        password={true}
                        error={error ? error : undefined}
                        onChangeText={(text: string) => setInputs({ ...inputs, password: text })}
                        icon={() => <MaterialIcons name="lock" size={24} color="white" />}
                        autoCapitalize="none"
                    >
                    </GlassInput>
                    <GlassInput
                        placeholder="Konfirmasi Password"
                        name="confirmPassword"
                        error={error ? error : undefined}
                        password={true}
                        value={inputs.confirmPassword}
                        onChangeText={(text: string) => setInputs({ ...inputs, confirmPassword: text })}
                        icon={() => <MaterialIcons name="lock-clock" size={24} color="white" />}
                        autoCapitalize="none"
                    >
                    </GlassInput>

                    <GlassButton
                        onPress={handelRegister}
                        disabled={loading}
                        style={{ marginTop: 10, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }}
                    >
                        {loading ? <MaterialIcons name="hourglass-empty" size={24} color="white" /> : <MaterialIcons name="lock" size={24} color="white" />}
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Daftar</Text>
                    </GlassButton>

                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 10,
                        }}
                    >Sudah punya akun? <Text onPress={() => router.push('/login')} style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Masuk Sekarang</Text></Text>
                </BlurView>
            </View>
        </LinearGradient>
    )
}
