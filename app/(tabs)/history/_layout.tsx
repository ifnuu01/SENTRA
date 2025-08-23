import { Stack } from "expo-router";

export default function HistoryRoot() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="detail" options={{
                title: 'Detail Riwayat',
                headerStyle: {
                    backgroundColor: '#00CDA8',
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTintColor: 'white',
            }} />
        </Stack>
    )
}