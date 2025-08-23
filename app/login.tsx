import { GlassButton } from "@/components/GlassButton";
import { GlassInput } from "@/components/GlassInput";
import { useAuth } from "@/hooks/AuthContext";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const { loading, error, setError, login } = useAuth();

    const handleLogin = async () => {
        await login(inputs.email, inputs.password);
    }

    return (
        <LinearGradient
            colors={['#a855f7', '#ec4899', '#ef4444']}
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
                    >Sentra</Text>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            marginBottom: 20,
                        }}
                    >Deteksi Warna dengan Sentra</Text>
                    <GlassInput
                        placeholder="Email"
                        name="email"
                        error={error ? error : undefined}
                        icon={() => <Entypo name="mail" size={24} color="white" />}
                        autoCapitalize="none"
                        value={inputs.email}
                        onChangeText={(text: string) => setInputs({ ...inputs, email: text })}
                    >
                    </GlassInput>
                    <GlassInput
                        placeholder="Password"
                        name="password"
                        error={error ? error : undefined}
                        icon={() => <MaterialIcons name="lock" size={24} color="white" />}
                        autoCapitalize="none"
                        password={true}
                        value={inputs.password}
                        onChangeText={(text: string) => setInputs({ ...inputs, password: text })}
                    >
                    </GlassInput>

                    <GlassButton
                        onPress={handleLogin}
                        disabled={loading}
                        style={{ marginTop: 10, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }}
                    >
                        {loading ? <MaterialIcons name="hourglass-empty" size={24} color="white" /> : <MaterialIcons name="lock" size={24} color="white" />}
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Masuk</Text>
                    </GlassButton>

                    {
                        error ? (
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: 10,
                                }}
                            >
                                Lupa password?{' '}
                                <Text
                                    onPress={() => {
                                        router.push('/forgetPassword');
                                        setError(null);
                                    }}
                                    style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
                                >
                                    Reset Password
                                </Text>
                                {'\n'}
                                atau{' '}
                                <Text
                                    onPress={() => {
                                        router.push('/register')
                                        setError(null);
                                    }}
                                    style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
                                >
                                    Daftar
                                </Text>
                            </Text>
                        ) : (
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: 10,
                                }}
                            >
                                Belum punya akun?{' '}
                                <Text
                                    onPress={() => router.push('/register')}
                                    style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
                                >
                                    Daftar
                                </Text>
                            </Text>
                        )
                    }
                </BlurView>
            </View>
        </LinearGradient>
    )
}
