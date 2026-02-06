/**
 * CSIR EOI 8119 - Checklist Screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, typography, spacing } from "@/constants/theme";

interface ChecklistItem {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface Checklist {
  id: string;
  title: string;
  category: string;
  items: ChecklistItem[];
  dueDate: string;
  status: "pending" | "in_progress" | "completed";
}

const MOCK_CHECKLISTS: Checklist[] = [
  {
    id: "1",
    title: "Daily Safety Inspection",
    category: "Safety",
    items: [
      {
        id: "1a",
        description: "Check emergency exits are clear",
        isCompleted: true,
      },
      {
        id: "1b",
        description: "Verify fire extinguishers are accessible",
        isCompleted: true,
      },
      { id: "1c", description: "Inspect safety equipment", isCompleted: false },
      {
        id: "1d",
        description: "Test communication systems",
        isCompleted: false,
      },
      {
        id: "1e",
        description: "Review shift handover notes",
        isCompleted: false,
      },
    ],
    dueDate: "Today, 16:00",
    status: "in_progress",
  },
  {
    id: "2",
    title: "Equipment Pre-Start Check",
    category: "Equipment",
    items: [
      {
        id: "2a",
        description: "Visual inspection of equipment",
        isCompleted: true,
      },
      { id: "2b", description: "Check fluid levels", isCompleted: true },
      {
        id: "2c",
        description: "Test warning lights and alarms",
        isCompleted: true,
      },
    ],
    dueDate: "Completed",
    status: "completed",
  },
  {
    id: "3",
    title: "Weekly Emergency Drill",
    category: "Emergency",
    items: [
      {
        id: "3a",
        description: "Brief all personnel on drill procedure",
        isCompleted: false,
      },
      { id: "3b", description: "Conduct evacuation drill", isCompleted: false },
      { id: "3c", description: "Record evacuation times", isCompleted: false },
      { id: "3d", description: "Complete drill report", isCompleted: false },
    ],
    dueDate: "Tomorrow, 10:00",
    status: "pending",
  },
];

export default function ChecklistScreen() {
  const [checklists, setChecklists] = useState<Checklist[]>(MOCK_CHECKLISTS);
  const [expandedId, setExpandedId] = useState<string | null>("1");

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists((prev) =>
      prev.map((checklist) => {
        if (checklist.id !== checklistId) return checklist;

        const updatedItems = checklist.items.map((item) =>
          item.id === itemId
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        );

        const completedCount = updatedItems.filter((i) => i.isCompleted).length;
        let status: "pending" | "in_progress" | "completed" = "pending";
        if (completedCount === updatedItems.length) {
          status = "completed";
        } else if (completedCount > 0) {
          status = "in_progress";
        }

        return { ...checklist, items: updatedItems, status };
      })
    );
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: colors.textMuted,
      in_progress: colors.warning,
      completed: colors.success,
    };
    return colorMap[status] || colors.textMuted;
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      Safety: "shield-checkmark",
      Equipment: "construct",
      Emergency: "warning",
    };
    return iconMap[category] || "list";
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {checklists.map((checklist) => {
          const completedCount = checklist.items.filter(
            (i) => i.isCompleted
          ).length;
          const progress = (completedCount / checklist.items.length) * 100;
          const isExpanded = expandedId === checklist.id;

          return (
            <View key={checklist.id} style={styles.checklistCard}>
              <TouchableOpacity
                style={styles.checklistHeader}
                onPress={() => setExpandedId(isExpanded ? null : checklist.id)}
              >
                <View style={styles.checklistIcon}>
                  <Ionicons
                    name={getCategoryIcon(checklist.category) as any}
                    size={24}
                    color={getStatusColor(checklist.status)}
                  />
                </View>
                <View style={styles.checklistInfo}>
                  <Text style={styles.checklistTitle}>{checklist.title}</Text>
                  <Text style={styles.checklistCategory}>
                    {checklist.category}
                  </Text>
                </View>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progress}%`,
                        backgroundColor: getStatusColor(checklist.status),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {completedCount}/{checklist.items.length}
                </Text>
              </View>

              <View style={styles.checklistMeta}>
                <View style={styles.metaItem}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.metaText}>{checklist.dueDate}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusColor(checklist.status) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(checklist.status) },
                    ]}
                  >
                    {checklist.status.replace("_", " ").toUpperCase()}
                  </Text>
                </View>
              </View>

              {isExpanded && (
                <View style={styles.itemsList}>
                  {checklist.items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.checklistItem}
                      onPress={() => toggleItem(checklist.id, item.id)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          item.isCompleted && styles.checkboxChecked,
                        ]}
                      >
                        {item.isCompleted && (
                          <Ionicons
                            name="checkmark"
                            size={16}
                            color={colors.white}
                          />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.itemText,
                          item.isCompleted && styles.itemTextCompleted,
                        ]}
                      >
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
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
    gap: spacing.md,
  },
  checklistCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
  },
  checklistHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  checklistIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  checklistInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  checklistTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
  },
  checklistCategory: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.background,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.semiBold,
    color: colors.textSecondary,
    minWidth: 30,
    textAlign: "right",
  },
  checklistMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.semiBold,
  },
  itemsList: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  itemText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.text,
  },
  itemTextCompleted: {
    textDecorationLine: "line-through",
    color: colors.textMuted,
  },
});
