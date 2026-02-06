/**
 * CSIR EOI 8119 - Stat Card Component
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, typography, spacing } from "@/constants/theme";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  onPress?: () => void;
}

export function StatCard({
  title,
  value,
  icon,
  color,
  onPress,
}: StatCardProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.card} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
  },
  title: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: "center",
  },
});
