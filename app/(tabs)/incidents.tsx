/**
 * CSIR EOI 8119 - Incidents Screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, typography, spacing } from "@/constants/theme";

type Severity = "low" | "medium" | "high" | "critical";
type Status = "reported" | "investigating" | "resolved";

interface Incident {
  id: string;
  title: string;
  type: string;
  severity: Severity;
  status: Status;
  location: string;
  time: string;
}

const MOCK_INCIDENTS: Incident[] = [
  {
    id: "1",
    title: "Equipment malfunction in Section B",
    type: "Equipment",
    severity: "high",
    status: "investigating",
    location: "Section B - Level 3",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Near miss at conveyor belt",
    type: "Near Miss",
    severity: "medium",
    status: "reported",
    location: "Section A - Level 1",
    time: "4h ago",
  },
  {
    id: "3",
    title: "Minor injury during shift change",
    type: "Injury",
    severity: "low",
    status: "resolved",
    location: "Section C - Surface",
    time: "6h ago",
  },
];

export default function IncidentsScreen() {
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    location: "",
    severity: "medium" as Severity,
  });

  const handleCreateIncident = () => {
    if (!newIncident.title || !newIncident.location) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const incident: Incident = {
      id: Date.now().toString(),
      title: newIncident.title,
      type: "General",
      severity: newIncident.severity,
      status: "reported",
      location: newIncident.location,
      time: "Just now",
    };

    setIncidents([incident, ...incidents]);
    setModalVisible(false);
    setNewIncident({
      title: "",
      description: "",
      location: "",
      severity: "medium",
    });
    Alert.alert("Success", "Incident reported successfully");
  };

  const getSeverityColor = (severity: Severity) => {
    const colorMap = {
      low: colors.success,
      medium: colors.warning,
      high: "#f97316",
      critical: colors.danger,
    };
    return colorMap[severity];
  };

  const getStatusColor = (status: Status) => {
    const colorMap = {
      reported: colors.info,
      investigating: colors.warning,
      resolved: colors.success,
    };
    return colorMap[status];
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header Actions */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={20} color={colors.white} />
            <Text style={styles.createButtonText}>Report Incident</Text>
          </TouchableOpacity>
        </View>

        {/* Incidents List */}
        <View style={styles.incidentsList}>
          {incidents.map((incident) => (
            <TouchableOpacity key={incident.id} style={styles.incidentCard}>
              <View style={styles.incidentHeader}>
                <View style={styles.incidentTitle}>
                  <Text style={styles.incidentTitleText} numberOfLines={1}>
                    {incident.title}
                  </Text>
                  <Text style={styles.incidentType}>{incident.type}</Text>
                </View>
                <View
                  style={[
                    styles.severityBadge,
                    {
                      backgroundColor:
                        getSeverityColor(incident.severity) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.severityText,
                      { color: getSeverityColor(incident.severity) },
                    ]}
                  >
                    {incident.severity.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.incidentDetails}>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.detailText}>{incident.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.detailText}>{incident.time}</Text>
                </View>
              </View>

              <View style={styles.incidentFooter}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(incident.status) + "20" },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(incident.status) },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(incident.status) },
                    ]}
                  >
                    {incident.status.charAt(0).toUpperCase() +
                      incident.status.slice(1)}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Create Incident Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Report New Incident</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.inputLabel}>Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="Brief description of incident"
                placeholderTextColor={colors.textMuted}
                value={newIncident.title}
                onChangeText={(text) =>
                  setNewIncident({ ...newIncident, title: text })
                }
              />

              <Text style={styles.inputLabel}>Location *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Section A - Level 2"
                placeholderTextColor={colors.textMuted}
                value={newIncident.location}
                onChangeText={(text) =>
                  setNewIncident({ ...newIncident, location: text })
                }
              />

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Detailed description of the incident"
                placeholderTextColor={colors.textMuted}
                value={newIncident.description}
                onChangeText={(text) =>
                  setNewIncident({ ...newIncident, description: text })
                }
                multiline
                numberOfLines={4}
              />

              <Text style={styles.inputLabel}>Severity</Text>
              <View style={styles.severityOptions}>
                {(["low", "medium", "high", "critical"] as Severity[]).map(
                  (sev) => (
                    <TouchableOpacity
                      key={sev}
                      style={[
                        styles.severityOption,
                        newIncident.severity === sev && {
                          borderColor: getSeverityColor(sev),
                          borderWidth: 2,
                        },
                      ]}
                      onPress={() =>
                        setNewIncident({ ...newIncident, severity: sev })
                      }
                    >
                      <View
                        style={[
                          styles.severityDot,
                          { backgroundColor: getSeverityColor(sev) },
                        ]}
                      />
                      <Text style={styles.severityOptionText}>
                        {sev.charAt(0).toUpperCase() + sev.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleCreateIncident}
              >
                <Text style={styles.submitButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  header: {
    marginBottom: spacing.md,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  createButtonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semiBold,
  },
  incidentsList: {
    gap: spacing.md,
  },
  incidentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
  },
  incidentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  incidentTitle: {
    flex: 1,
    marginRight: spacing.sm,
  },
  incidentTitleText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
  },
  incidentType: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  severityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  severityText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.semiBold,
  },
  incidentDetails: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textSecondary,
  },
  incidentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    gap: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
    color: colors.text,
  },
  modalBody: {
    padding: spacing.md,
  },
  inputLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  severityOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  severityOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  severityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  severityOptionText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    color: colors.text,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semiBold,
  },
});
