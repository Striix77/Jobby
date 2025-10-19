import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useJobStore } from "../stores/JobStore";
import Job from "../types/jobs";
import JobModalView from "./JobModalView";

export default function JobCardView({ item }: { item: Job }) {
  const { deleteJob, updateJob } = useJobStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jobStatus, setJobStatus] = useState<Job["status"]>(item.status);

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "applied":
        return "#3B82F6"; // blue
      case "interviewing":
        return "#F59E0B"; // orange
      case "offered":
        return "#10B981"; // green
      case "rejected":
        return "#EF4444"; // red
      case "withdrawn":
        return "#6B7280"; // gray
      default:
        return "#6B7280";
    }
  };

  const cycleStatus = (currentStatus: Job["status"]) => {
    console.log("Cycling status for job:", item.id);
    const statuses: Job["status"][] = [
      "applied",
      "interviewing",
      "offered",
      "rejected",
      "withdrawn",
    ];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setJobStatus(statuses[nextIndex]);
  };

  return (
    <>
      <TouchableHighlight
        style={styles.jobCard}
        underlayColor="#ffffff89"
        onPress={() => {
          console.log("Job pressed:", item.id);
          setIsExpanded(true);
        }}
      >
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(jobStatus) },
            ]}
          >
            <Text style={styles.statusText}>{jobStatus}</Text>
          </View>
        </View>
      </TouchableHighlight>
      {isExpanded && (
        <Modal
          visible={isExpanded}
          animationType="fade"
          transparent={true}
          allowSwipeDismissal={true}
          onRequestClose={() => {
            updateJob(item.id, { status: jobStatus });
            console.log(
              "Modal closed, status updated for job:",
              item.id,
              jobStatus
            );
            setIsExpanded(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.jobCardExpanded}>
              <View style={styles.expandedHeader}>
                <TouchableOpacity
                  onPress={() => {
                    updateJob(item.id, { status: jobStatus });
                    console.log(
                      "Modal closed, status updated for job:",
                      item.id,
                      jobStatus
                    );
                    setIsExpanded(false);
                  }}
                >
                  <Ionicons name="close" size={35} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.expandedTitle}>Job Details</Text>
              </View>
              <ScrollView style={styles.expandedDetails}>
                <View style={styles.detailSection}>
                  <Text style={styles.detailJobTitle}>{item.title}</Text>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.detailRow}>
                    <Ionicons name="business" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>Company</Text>
                  </View>
                  <Text style={styles.detailValue}>{item.company}</Text>
                </View>

                {/* Status */}
                <View style={styles.detailSection}>
                  <View style={styles.detailRow}>
                    <Ionicons name="pulse" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>Status</Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => cycleStatus(jobStatus)}
                  >
                    <View
                      style={[
                        styles.statusBadgeLarge,
                        { backgroundColor: getStatusColor(jobStatus) },
                      ]}
                    >
                      <Text style={styles.statusTextLarge}>{jobStatus}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                {/* Location */}
                {item.location && (
                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <Ionicons name="location" size={20} color="#6B7280" />
                      <Text style={styles.detailLabel}>Location</Text>
                    </View>
                    <Text style={styles.detailValue}>{item.location}</Text>
                  </View>
                )}

                {/* Salary */}
                {item.salary && (
                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <Ionicons name="cash" size={20} color="#6B7280" />
                      <Text style={styles.detailLabel}>Salary</Text>
                    </View>
                    <Text style={styles.detailValue}>{item.salary}</Text>
                  </View>
                )}

                {/* Applied Date */}
                {item.date && (
                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <Ionicons name="calendar" size={20} color="#6B7280" />
                      <Text style={styles.detailLabel}>Applied Date</Text>
                    </View>
                    <Text style={styles.detailValue}>
                      {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                )}

                {/* Description */}
                {item.description && (
                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <Ionicons
                        name="document-text"
                        size={20}
                        color="#6B7280"
                      />
                      <Text style={styles.detailLabel}>Description</Text>
                    </View>
                    <Text style={styles.detailValueMultiline}>
                      {item.description}
                    </Text>
                  </View>
                )}
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => {
                    // Handle edit
                    // setIsExpanded(false);
                    setIsEditing(true);
                  }}
                >
                  <Ionicons name="create-outline" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => {
                    deleteJob(item.id);
                    setIsExpanded(false);
                  }}
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <JobModalView
            isVisible={isEditing}
            setIsVisible={setIsEditing}
            isAddingJob={false}
            jobID={item.id}
          />
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  jobCardExpanded: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    maxHeight: "85%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  expandedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  expandedTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  expandedDetails: {
    padding: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginLeft: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailJobTitle: {
    fontSize: 24,
    color: "#1F2937",
    fontWeight: "600",
    marginLeft: 28,
  },
  detailValue: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
    marginLeft: 28,
  },
  detailValueMultiline: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 24,
    marginLeft: 28,
  },
  statusBadgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginLeft: 28,
  },
  statusTextLarge: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  actionButtons: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
