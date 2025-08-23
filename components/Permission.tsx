import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Text, TouchableOpacity, View } from "react-native"

export const Permission = ({ requestPermission }: {
    requestPermission: () => void
}) => {
    return (
        <LinearGradient
            colors={['#887DFF', '#AD46FF', '#EB3CA9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30,
            }}
        >
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 25,
                padding: 40,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                maxWidth: 350,
                width: '100%',
            }}>
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 50,
                    padding: 20,
                    marginBottom: 30,
                }}>
                    <Feather name="camera" size={80} color="white" />
                </View>

                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: 15,
                }}>Akses Kamera</Text>

                <Text style={{
                    fontSize: 16,
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                    lineHeight: 24,
                    marginBottom: 10,
                }}>
                    Kami membutuhkan izin akses kamera untuk dapat mendeteksi warna dari foto yang Anda ambil
                </Text>

                <TouchableOpacity
                    onPress={requestPermission}
                    style={{
                        borderRadius: 15,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 15,
                            paddingHorizontal: 30,
                            gap: 10,
                        }}
                    >
                        <Feather name="check" size={20} color="white" />
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Berikan Izin</Text>
                    </View>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 12,
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center',
                    fontStyle: 'italic',
                }}>
                    Kamera hanya akan digunakan untuk mengambil foto deteksi warna
                </Text>
            </View>
        </LinearGradient>
    )
}