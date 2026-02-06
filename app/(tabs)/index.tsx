/**
 * CSIR EOI 8119 - Dashboard Screen
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { colors, typography, spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/StatCard";
import { AlertBanner } from "@/components/AlertBanner";

export default function DashboardScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    todayIncidents: 3,
    criticalIssues: 1,
    checklistsDue: 4,
    safetyScore: 87,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API fetch
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.displayName?.split(" ")[0] || "User"}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-ZA", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </Text>
        </View>

        {/* Active Alerts */}
        <AlertBanner
          title="Scheduled Maintenance"
          message="Conveyor B offline 14:00-18:00 today"
          type="warning"
        />

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Today's Incidents"
            value={stats.todayIncidents}
            icon="warning"
            color={colors.warning}
            onPress={() => router.push("/(tabs)/incidents")}
          />
          <StatCard
            title="Critical Issues"
            value={stats.criticalIssues}
            icon="alert-circle"
            color={colors.danger}
          />
          <StatCard
            title="Checklists Due"
            value={stats.checklistsDue}
            icon="checkbox"
            color={colors.info}
            onPress={() => router.push("/(tabs)/checklist")}
          />
          <StatCard
            title="Safety Score"
            value={`${stats.safetyScore}%`}
            icon="shield-checkmark"
            color={colors.success}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(tabs)/incidents")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#fee2e2" }]}>
                <Ionicons name="add-circle" size={24} color={colors.danger} />
              </View>
              <Text style={styles.actionText}>Report Incident</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(tabs)/checklist")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#dcfce7" }]}>
                <Ionicons name="checkbox" size={24} color={colors.success} />
              </View>
              <Text style={styles.actionText}>Start Checklist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "#dbeafe" }]}>
                <Ionicons name="call" size={24} color={colors.info} />
              </View>
              <Text style={styles.actionText}>Emergency</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: "#fef3c7" }]}>
                <Ionicons
                  name="document-text"
                  size={24}
                  color={colors.warning}
                />
              </View>
              <Text style={styles.actionText}>View Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <ActivityItem
              icon="warning"
              iconColor={colors.warning}
              title="Near miss reported"
              subtitle="Section A - Level 1"
              time="2h ago"
            />
            <ActivityItem
              icon="checkbox"
              iconColor={colors.success}
              title="Daily inspection completed"
              subtitle="12/12 items checked"
              time="4h ago"
            />
            <ActivityItem
              icon="alert-circle"
              iconColor={colors.danger}
              title="Critical incident resolved"
              subtitle="Equipment malfunction"
              time="6h ago"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActivityItem({
  icon,
  iconColor,
  title,
  subtitle,
  time,
}: {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <View style={styles.activityItem}>
      <View
        style={[styles.activityIcon, { backgroundColor: iconColor + "20" }]}
      >
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
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
  welcomeSection: {
    marginBottom: spacing.md,
  },
  welcomeText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.text,
  },
  dateText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  actionCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  actionText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  activityList: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  activityTitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  activitySubtitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activityTime: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textMuted,
  },
});
