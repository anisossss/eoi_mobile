/**
 * CSIR EOI 8119 - Profile Screen
 */

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { colors, typography, spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const menuItems = [
    {
      title: "Account Settings",
      icon: "settings-outline",
      onPress: () =>
        Alert.alert("Coming Soon", "Account settings will be available soon."),
    },
    {
      title: "Notification Preferences",
      icon: "notifications-outline",
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "Notification settings will be available soon."
        ),
    },
    {
      title: "My Incident Reports",
      icon: "document-text-outline",
      onPress: () => router.push("/(tabs)/incidents"),
    },
    {
      title: "My Checklists",
      icon: "checkbox-outline",
      onPress: () => router.push("/(tabs)/checklist"),
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () => Alert.alert("Support", "Contact: tender@csir.co.za"),
    },
    {
      title: "About",
      icon: "information-circle-outline",
      onPress: () =>
        Alert.alert(
          "About",
          "CSIR Mining Safety Mobile App\nVersion 1.0.0\nEOI 8119/06/02/2026"
        ),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.displayName || "User"}</Text>
          <Text style={styles.userEmail}>
            {user?.email || "email@example.com"}
          </Text>

          <View style={styles.userBadges}>
            <View style={styles.badge}>
              <Ionicons
                name="shield-checkmark"
                size={14}
                color={colors.primary}
              />
              <Text style={styles.badgeText}>{user?.role || "Operator"}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="location" size={14} color={colors.primary} />
              <Text style={styles.badgeText}>
                {user?.mineSection || "Section A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Reports</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Checklists</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>30</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={colors.textSecondary}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          CSIR EOI 8119/06/02/2026{"\n"}
          Mining Safety Mobile App v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.white,
  },
  userName: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
  },
  userEmail: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  userBadges: {
    flexDirection: "row",
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary + "15",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    gap: spacing.xs,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    color: colors.primary,
    textTransform: "capitalize",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  menuContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: spacing.lg,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  menuItemText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.danger + "15",
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  signOutText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semiBold,
    color: colors.danger,
  },
  footer: {
    textAlign: "center",
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textMuted,
    marginTop: spacing.xl,
    lineHeight: 18,
  },
});
