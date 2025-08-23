import { GlassButton } from "@/components/GlassButton";
import { GlassInput } from "@/components/GlassInput";
import { useSendCode } from "@/hooks/useSendCode";
import { useVerify } from "@/hooks/useVerify";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function verify() {
    const [verificationCode, setVerificationCode] = useState<string>("");
    const { email } = useLocalSearchParams<{ email: string }>();
    const { loading, error, verify } = useVerify();
    const { sendVerificationEmail, loading: loadingSend } = useSendCode();

    const handleVerify = async () => {
        await verify(email, verificationCode);
    };

    const handleSendCode = async () => {
        const result = await sendVerificationEmail(email);
        if (result) {
            Alert.alert('Kode Terkirim', result);
        }
    }

    return (
        <LinearGradient
            colors={['#a855f7', '#ec4899', '#ef4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Image
                source={require('../assets/images/Mail.svg')}
                style={{
                    width: 250, height: 200, position: 'absolute',
                    top: 70
                }}
            />

            <Text
                style={{
                    color: 'white',
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >Verifikasi Email Anda</Text>
            <Text
                style={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 4,
                }}
            >Silahkan masukan 6 digit kode verifikasi yang telah dikirimkan ke email Anda.</Text>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    width: '85%',
                    paddingHorizontal: 10,
                }}
            >
                <GlassInput
                    placeholder="Kode Verifikasi"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    autoCapitalize="none"
                    name="verificationCode"
                    keyboardType="numeric"
                    maxLength={6}
                />
            </View>
            <GlassButton
                onPress={handleSendCode}
                disabled={loadingSend}
                style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                    backgroundColor: 'none',
                    borderColor: 'none',
                    borderWidth: 0,
                }}
            >
                <AntDesign name="reload1" size={24} color="white" />
                <Text
                    style={{
                        color: 'white',
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    {loadingSend ? "Mengirim Kode..." : "Kirim Ulang Kode"}
                </Text>
            </GlassButton>
            <GlassButton
                onPress={handleVerify}
                disabled={loading}
                style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    width: '80%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 4,
                }}
            >
                {loading ? <MaterialIcons name="hourglass-empty" size={24} color="white" /> : <AntDesign name="checkcircle" size={24} color="white" />}
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Verifikasi</Text>
            </GlassButton>
            <GlassButton
                onPress={() => {
                    router.push('/register');
                }}
                style={{
                    marginHorizontal: 10,
                    position: 'absolute',
                    bottom: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                    backgroundColor: 'none',
                    borderColor: 'none',
                    borderWidth: 0,
                }}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text
                    style={{
                        color: 'white',
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >Kembali Ke Halaman Daftar</Text>
            </GlassButton>
        </LinearGradient>
    )
}