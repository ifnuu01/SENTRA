import { ColorCard } from "@/components/ColorCard";
import { GlassButton } from "@/components/GlassButton";
import { Permission } from "@/components/Permission";
import { useDetect } from "@/hooks/useDetect";
import { Entypo, Feather } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { loading, resultDetection, setResultDetection, uploadImage } = useDetect();
  const [cameraKey, setCameraKey] = useState(Date.now());
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setCameraKey(Date.now());
      setTimeout(() => {
        try {
          cameraRef.current?.resumePreview?.();
        } catch { }
      }, 60);
    }
  }, [isFocused]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <Permission requestPermission={requestPermission} />;
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: false,
        });

        if (photo) {
          convertUriToFileAndUpload(photo.uri);
        }

      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil foto. Silakan coba lagi.');
      }
    }
  }

  const retakePhoto = () => {
    setResultDetection(null);
  }

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permintaan Akses', 'Izin akses galeri diperlukan untuk memilih gambar');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        convertUriToFileAndUpload(result.assets[0].uri);
      }

    } catch (error) {
      Alert.alert('Error', 'Gagal memilih gambar. Silakan coba lagi.');
    }

  }

  const convertUriToFileAndUpload = async (uri: string) => {
    try {
      const filename = uri.split('/').pop() || `image.jpg`;

      await uploadImage({
        uri,
        type: 'image/jpeg',
        name: filename
      })

    } catch (error) {
      Alert.alert('Error', 'Gagal mengupload gambar. Silakan coba lagi.');
    }
  }

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
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          textAlign: 'center',
        }}
      >Deteksi Warna</Text>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          marginTop: 8,
        }}
      >Ambil foto atau upload gambar untuk mendeteksi warna</Text>
      <View
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderStyle: 'dashed',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 320,
            }}
          >
            <Entypo name="upload-to-cloud" size={120} color="white" />
            <Text style={{ color: 'white', marginTop: 8 }}>Mengunggah gambar...</Text>
          </View>
        ) : resultDetection ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              width: '100%',
            }}
          >
            <Text style={{
              color: 'rgba(255,255,255, 1)',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 4,
              textAlign: 'center'
            }}>
              Warna berhasil dideteksi {'\n'}
              {resultDetection.colors.length > 1
                ? `${resultDetection.colors.length} warna terdeteksi`
                : resultDetection.colors[0]?.name
              }
            </Text>
            <ScrollView
              style={{
                maxHeight: 210,
                width: '100%',
                marginTop: 4
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {resultDetection.colors.map((colorData, index) => (
                <View key={index} style={{
                  marginBottom: 15,
                  padding: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 10,
                  width: '100%'
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 8
                  }}>
                    {colorData.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 9,
                      justifyContent: 'center'
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: `${colorData.hex}`,
                        width: 120,
                        height: 160,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: 'white'
                      }}
                    />

                    <View
                      style={{
                        flexWrap: 'wrap',
                        flex: 1
                      }}
                    >
                      <ColorCard color={colorData.hex} />
                      <ColorCard color={colorData.rgb} />
                      <ColorCard color={colorData.hsl} />
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            <GlassButton
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 10,
                borderRadius: 5,
                marginTop: 5,
                width: 260,
              }}
              onPress={retakePhoto}
            >
              <Text style={{ color: 'white' }}>Ambil gambar lagi</Text>
            </GlassButton>
          </View>
        ) : (
          isFocused && (
            <View style={styles.cameraWrapper} key={cameraKey}>
              <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Putar Kamera</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
            </View>
          )
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <GlassButton
          onPress={pickImage}
          style={{ marginTop: 10, width: 160, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }}
          disabled={loading}
        >
          <Feather name="upload-cloud" size={24} color="white" />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Upload</Text>
        </GlassButton>
        <GlassButton
          onPress={takePicture}
          style={{ marginTop: 10, width: 160, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }}
          disabled={loading}
        >
          <Feather name="camera" size={24} color="white" />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Ambil Foto</Text>

        </GlassButton>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
          width: '100%',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Tips Panduan:
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: 4,
          }}
        >
          - Pastikan pencahayaan cukup
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: 4,
          }}
        >
          - Fokus pada objek warna yang dideteksi
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: 4,
          }}
        >
          - Hindari pantulan cahaya yang berlebihan
        </Text>
      </View>

    </LinearGradient >
  );
}

// bawaan dari dokumentasi
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraWrapper: {
    width: '100%',
    height: 320,
    borderRadius: 10,
    overflow: 'hidden',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  retakeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});