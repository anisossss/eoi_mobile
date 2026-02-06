/**
 * CSIR EOI 8119 - Mining Safety Mobile App
 * Entry Point - Redirects based on auth state
 */

import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
