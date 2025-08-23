import { GlassButton } from "@/components/GlassButton";
import { GlassInput } from "@/components/GlassInput";
import { useProfile } from "@/hooks/useProfile";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

export default function updateProfile() {
    const [name, setName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { updateProfile, loading: profileLoading, error: profileError, user } = useProfile();
    const { updatePassword, loading: passwordLoading, error: passwordError } = useUpdatePassword();

    const handleUpdateProfile = async () => {
        try {
            const message = await updateProfile(name);
            if (message) {
                Alert.alert('Berhasil Memperbarui', message);
                setName('');
            }
        } catch (error) {
            Alert.alert('Gagal Memperbarui', 'Terjadi kesalahan saat memperbarui');
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const message = await updatePassword(oldPassword, newPassword, confirmPassword);
            if (message) {
                Alert.alert('Berhasil Memperbarui', message);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            Alert.alert('Gagal Memperbarui', 'Terjadi kesalahan saat memperbarui kata sandi');
        }
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
                {/* Profile Update Section */}
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: 20,
                        textAlign: 'center',
                    }}>
                        Perbarui Data
                    </Text>

                    <GlassInput
                        placeholder={`${user?.name.slice(0, 5)}, ganti nama baru?`}
                        value={name}
                        onChangeText={setName}
                        icon={() => <MaterialIcons name="edit" size={20} color="white" />}
                        name="name"
                        error={profileError || undefined}
                    />

                    <GlassButton
                        onPress={handleUpdateProfile}
                        disabled={profileLoading}
                        style={{
                            marginTop: 8,
                            opacity: profileLoading ? 0.6 : 1,
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '600',
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                {profileLoading ? (
                                    <>
                                        <Entypo name="upload-to-cloud" size={24} color="white" />
                                        <Text style={{ color: 'white', fontWeight: '600' }}>Merubah...</Text>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesome name="user" size={24} color="white" />
                                        <Text style={{ color: 'white', fontWeight: '600' }}>Ubah Nama</Text>
                                    </>
                                )}
                            </View>
                        </Text>
                    </GlassButton>
                </View>

                {/* Password Update Section */}
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: 20,
                        textAlign: 'center',
                    }}>
                        Ubah Password
                    </Text>

                    <GlassInput
                        placeholder="Password saat ini"
                        password={true}
                        value={oldPassword}
                        icon={() => <MaterialIcons name="lock" size={24} color="white" />}
                        onChangeText={setOldPassword}
                        name="oldPassword"
                        error={passwordError || undefined}
                    />

                    <GlassInput
                        placeholder="Password baru"
                        password={true}
                        value={newPassword}
                        icon={() => <MaterialIcons name="lock" size={24} color="white" />}
                        onChangeText={setNewPassword}
                        name="newPassword"
                        error={passwordError || undefined}
                    />

                    <GlassInput
                        placeholder="Konfirmasi password"
                        password={true}
                        value={confirmPassword}
                        icon={() => <MaterialIcons name="lock-clock" size={24} color="white" />}
                        onChangeText={setConfirmPassword}
                        name="confirmPassword"
                        error={passwordError || undefined}
                    />

                    <GlassButton
                        onPress={handleUpdatePassword}
                        disabled={passwordLoading}
                        style={{
                            marginTop: 8,
                            opacity: passwordLoading ? 0.6 : 1,
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '600',
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                {passwordLoading ? (
                                    <>
                                        <Entypo name="upload-to-cloud" size={24} color="white" />
                                        <Text style={{ color: 'white', fontWeight: '600' }}>Merubah...</Text>
                                    </>
                                ) : (
                                    <>
                                        <MaterialIcons name="lock-reset" size={24} color="white" />
                                        <Text style={{ color: 'white', fontWeight: '600' }}>Ubah Password</Text>
                                    </>
                                )}
                            </View>
                        </Text>
                    </GlassButton>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}