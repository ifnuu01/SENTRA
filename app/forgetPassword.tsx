import { GlassButton } from "@/components/GlassButton";
import { GlassInput } from "@/components/GlassInput";
import { useForgetPassword } from "@/hooks/useForgetPassword";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ForgetPassword() {
    const {
        email,
        loading,
        error,
        forgetPassword,
        verifyForgetPassword,
        newPassword
    } = useForgetPassword();
    const [step, setStep] = useState(0);
    const [inputs, setInputs] = useState({
        email: '',
        kode: '',
        password: '',
        konfirmasi: ''
    });

    const handleEmail = async () => {
        await forgetPassword(inputs.email);
        if (!error) setStep(1);
    };
    const handleVerifikasi = async () => {
        await verifyForgetPassword(inputs.kode);
        if (!error) setStep(2);
    };
    const handleUbahPassword = async () => {
        await newPassword(inputs.password, inputs.konfirmasi);
    };

    return (
        <LinearGradient
            colors={["#a855f7", "#ec4899", "#ef4444"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <BlurView intensity={20} style={{ width: '100%', maxWidth: 400, padding: 20, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', overflow: 'hidden' }}>
                    <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', marginBottom: 4, fontWeight: 'bold' }}>Lupa Password</Text>
                    <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
                        {step === 0 && 'Masukkan email yang terdaftar untuk reset password.'}
                        {step === 1 && 'Masukkan kode verifikasi yang dikirim ke email Anda.'}
                        {step === 2 && 'Masukkan password baru Anda.'}
                    </Text>
                    {step === 0 && (
                        <GlassInput
                            placeholder="Email"
                            name="email"
                            error={error ? error : undefined}
                            icon={() => <Entypo name="mail" size={24} color="white" />}
                            autoCapitalize="none"
                            value={inputs.email}
                            onChangeText={(text: string) => setInputs({ ...inputs, email: text })}
                        />
                    )}
                    {step === 1 && (
                        <GlassInput
                            placeholder="Kode Verifikasi"
                            name="kode"
                            error={error ? error : undefined}
                            icon={() => <MaterialIcons name="verified" size={24} color="white" />}
                            autoCapitalize="none"
                            keyboardType="numeric"
                            maxLength={6}
                            value={inputs.kode}
                            onChangeText={(text: string) => setInputs({ ...inputs, kode: text })}
                        />
                    )}
                    {step === 2 && (
                        <>
                            <GlassInput
                                placeholder="Password Baru"
                                name="password"
                                error={error ? error : undefined}
                                icon={() => <MaterialIcons name="lock" size={24} color="white" />}
                                autoCapitalize="none"
                                secureTextEntry
                                value={inputs.password}
                                onChangeText={(text: string) => setInputs({ ...inputs, password: text })}
                            />
                            <GlassInput
                                placeholder="Konfirmasi Password"
                                name="konfirmasi"
                                error={error ? error : undefined}
                                icon={() => <MaterialIcons name="lock" size={24} color="white" />}
                                autoCapitalize="none"
                                secureTextEntry
                                value={inputs.konfirmasi}
                                onChangeText={(text: string) => setInputs({ ...inputs, konfirmasi: text })}
                            />
                        </>
                    )}
                    <GlassButton
                        onPress={step === 0 ? handleEmail : step === 1 ? handleVerifikasi : handleUbahPassword}
                        disabled={loading}
                        style={{ marginTop: 10, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }}
                    >
                        {loading ? <MaterialIcons name="hourglass-empty" size={24} color="white" /> : <MaterialIcons name="arrow-forward" size={24} color="white" />}
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            {step === 0 && 'Kirim Email'}
                            {step === 1 && 'Verifikasi'}
                            {step === 2 && 'Ubah Password'}
                        </Text>
                    </GlassButton>
                    {step > 0 && (
                        <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
                            <Text onPress={() => setStep(0)} style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Kembali</Text>
                        </Text>
                    )}
                </BlurView>
            </View>
        </LinearGradient>
    );
}
