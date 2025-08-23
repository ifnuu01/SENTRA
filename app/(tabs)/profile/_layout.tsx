import { Stack } from "expo-router";

export default function ProfileRoot() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{
                title: 'Pengaturan',
                headerStyle: {
                    backgroundColor: '#887DFF',
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTintColor: 'white',

            }} />
            <Stack.Screen name="help" options={{
                title: 'FAQ dan panduan',
                headerStyle: {
                    backgroundColor: '#887DFF',
                },
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                headerTintColor: 'white',

            }} />
            <Stack.Screen name="privasi" options={{
                title: 'Kebijakan Privasi',
                headerStyle: {
                    backgroundColor: '#887DFF',
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