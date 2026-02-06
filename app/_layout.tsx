/**
 * CSIR EOI 8119 - Mining Safety Mobile App
 * Root Layout with Navigation
 *
 * Demonstrates:
 * - Expo Router navigation
 * - React Native with TypeScript
 * - Mobile app architecture
 */

import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
