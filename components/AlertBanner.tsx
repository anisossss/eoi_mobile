/**
 * CSIR EOI 8119 - Alert Banner Component
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, typography, spacing } from "@/constants/theme";

type AlertType = "info" | "warning" | "danger" | "success";

interface AlertBannerProps {
  title: string;
  message: string;
  type: AlertType;
  onDismiss?: () => void;
}

const alertStyles: Record<
  AlertType,
  { bg: string; icon: string; color: string }
> = {
  info: {
    bg: colors.info + "15",
    icon: "information-circle",
    color: colors.info,
  },
  warning: {
    bg: colors.warning + "15",
    icon: "warning",
    color: colors.warning,
  },
  danger: {
    bg: colors.danger + "15",
    icon: "alert-circle",
    color: colors.danger,
  },
  success: {
    bg: colors.success + "15",
    icon: "checkmark-circle",
    color: colors.success,
  },
};

export function AlertBanner({
  title,
  message,
  type,
  onDismiss,
}: AlertBannerProps) {
  const style = alertStyles[type];

  return (
    <View style={[styles.container, { backgroundColor: style.bg }]}>
      <Ionicons name={style.icon as any} size={24} color={style.color} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: style.color }]}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss}>
          <Ionicons name="close" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
  },
  message: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
