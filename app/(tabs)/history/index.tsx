import { GlassButton } from "@/components/GlassButton";
import { GlassInput } from "@/components/GlassInput";
import { HistoryCard } from "@/components/History";
import { useHistory } from "@/hooks/useHistory";
import type { History } from "@/types/type";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function HistoryScreen() {
    const { loading, history, getHistory, deleteHistory } = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredHistory, setFilteredHistory] = useState<History[] | any>([]);
    const [activeFilter, setActiveFilter] = useState<'all' | 'month' | 'day'>('all');

    useFocusEffect(
        useCallback(() => {
            getHistory();
        }, [])
    );

    useEffect(() => {
        let filtered = history;

        if (activeFilter === 'month') {
            filtered = history.filter((item: any) =>
                new Date(item.detectedAt).getMonth() === new Date().getMonth()
            );
        } else if (activeFilter === 'day') {
            filtered = history.filter((item: any) =>
                new Date(item.detectedAt).getDate() === new Date().getDate()
            );
        }

        if (searchTerm) {
            filtered = filtered.filter((item: any) =>
                item.colors[0].name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredHistory(filtered);
    }, [searchTerm, history, activeFilter]);

    const filterMonth = (month: number) => {
        setActiveFilter('month');

    };

    const getAll = async () => {
        setActiveFilter('all');

    }

    const filterDay = (day: number) => {
        setActiveFilter('day');

    };

    const handleDelete = async (id: string) => {
        await deleteHistory(id);
    };


    return (
        <LinearGradient
            colors={['#00CDA8', '#00B9D4', '#0078F4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 10 }}
        >
            <Text
                style={{
                    color: 'white',
                    fontSize: 24,
                    textAlign: 'center',
                }}
            >Riwayat Deteksi</Text>
            <Text
                style={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 8,
                }}
            >Lihat semua warna yang pernah anda deteksi</Text>
            <View
                style={{
                    marginTop: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    width: '100%',
                    padding: 20,
                    borderRadius: 10,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
            >
                <GlassInput
                    placeholder="Cari riwayat..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    name="search"
                    style={{
                        height: 45,
                    }}
                    icon={() => <Feather name="search" size={20} color="white" />}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 4,
                    }}
                >
                    <GlassButton
                        onPress={() => getAll()}
                        style={{
                            width: 100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                        }}
                    >
                        <Feather name="filter" size={14} color="white" />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >Semua</Text>
                    </GlassButton>
                    <GlassButton
                        onPress={() => filterMonth(new Date().getMonth())}
                        style={{
                            width: 100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                        }}
                    >
                        <MaterialIcons name="date-range" size={14} color="white" />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >Bulan ini</Text>
                    </GlassButton>
                    <GlassButton
                        onPress={() => filterDay(new Date().getDate())}
                        style={{
                            width: 100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                        }}
                    >
                        <MaterialIcons name="date-range" size={14} color="white" />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                        >Hari ini</Text>
                    </GlassButton>
                </View>
            </View>

            {/* Loading */}

            {loading && (
                <>
                    <FontAwesome5 name="cloud-download-alt" size={150} color="white" />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                        }}
                    >Memuat...</Text>
                </>
            )}

            <FlatList
                data={filteredHistory}
                renderItem={({ item }) => <HistoryCard
                    colors={item.colors}
                    id={item._id}
                    image={item.image}
                    detectedAt={item.detectedAt}
                    onDelete={handleDelete}
                    loading={loading}
                />}
                keyExtractor={(item: any) => item._id}
                style={{
                    flex: 1,
                    width: '100%',
                    marginTop: 10,
                    marginBottom: 120,
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </LinearGradient>
    )
}