/**
 * CSIR EOI 8119 - Register Screen
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
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@/contexts/AuthContext";
import { colors, typography, spacing } from "@/constants/theme";

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    department: "",
    mineSection: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const {
      email,
      password,
      confirmPassword,
      displayName,
      department,
      mineSection,
    } = formData;

    if (!email || !password || !displayName || !department || !mineSection) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, {
        displayName,
        department,
        mineSection,
        role: "operator",
      });
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message || "Could not create account"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            </Link>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join CSIR Mining Safety</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={colors.textMuted}
                value={formData.displayName}
                onChangeText={(v) => updateForm("displayName", v)}
              />
            </View>

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
                value={formData.email}
                onChangeText={(v) => updateForm("email", v)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="business-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Department"
                placeholderTextColor={colors.textMuted}
                value={formData.department}
                onChangeText={(v) => updateForm("department", v)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Mine Section"
                placeholderTextColor={colors.textMuted}
                value={formData.mineSection}
                onChangeText={(v) => updateForm("mineSection", v)}
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
                value={formData.password}
                onChangeText={(v) => updateForm("password", v)}
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

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={colors.textMuted}
                value={formData.confirmPassword}
                onChangeText={(v) => updateForm("confirmPassword", v)}
                secureTextEntry={!showPassword}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkText}>
                  Already have an account?{" "}
                  <Text style={styles.linkTextBold}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
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
  },
  header: {
    marginBottom: spacing.xl,
  },
  backButton: {
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
    marginBottom: spacing.xl,
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
});
