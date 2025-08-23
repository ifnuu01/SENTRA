import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, usePathname, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/hooks/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RootLayoutNav() {
  const pathname = usePathname();
  const { isAuthenticated, isInitialized } = useAuth();
  const segments = useSegments();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (isAuthenticated) {
      AsyncStorage.setItem('lastRoute', pathname);
    }
  }, [pathname, isAuthenticated]);

  useEffect(() => {
    if (!isInitialized) return;

    const inTabsGroup = segments[0] === '(tabs)';
    const publicRoutes = ['login', 'register', 'verify', 'forgetPassword'];
    const currentRoute = segments[0];

    if (isAuthenticated) {
      if (publicRoutes.includes(currentRoute)) {
        router.replace('/(tabs)');
      }
    } else {
      if (currentRoute === 'register') {
        router.replace('/register');
      }
      if (inTabsGroup || !publicRoutes.includes(currentRoute)) {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isInitialized, segments]);

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="verify" options={{ headerShown: false }} />
        <Stack.Screen name="forgetPassword" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}

function AuthGate() {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return null;
  }

  return <RootLayoutNav />;
}