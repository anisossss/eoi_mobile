/**
 * CSIR EOI 8119 - Login Screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@/contexts/AuthContext";
import { colors, typography, spacing } from "@/constants/theme";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="shield-checkmark" size={48} color={colors.white} />
          </View>
          <Text style={styles.title}>CSIR Safety</Text>
          <Text style={styles.subtitle}>Mining Safety Mobile App</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <Link href="/(auth)/register" asChild>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>
                Don't have an account?{" "}
                <Text style={styles.linkTextBold}>Register</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>CSIR EOI 8119/06/02/2026</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xl * 2,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  form: {
    gap: spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semiBold,
  },
  linkButton: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  linkText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  linkTextBold: {
    fontFamily: typography.fonts.semiBold,
    color: colors.primary,
  },
  footer: {
    textAlign: "center",
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textMuted,
    marginTop: spacing.xl * 2,
  },
});
