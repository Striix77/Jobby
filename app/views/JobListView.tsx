import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useJobStore } from "../stores/JobStore";
import Job from "../types/jobs";
import JobCardView from "./JobCardView";

export default function JobListView() {
  const { jobs } = useJobStore();
  const [statusFilter, setStatusFilter] = useState<Job["status"] | "All">(
    "All"
  );

  const renderJobCard = (item: Job) => {
    return statusFilter === "All" || item.status === statusFilter ? (
      <JobCardView item={item} />
    ) : null;
  };

  return (
    <View
      style={(() => {
        switch (statusFilter) {
          case "applied":
            return { ...styles.container, backgroundColor: "#e0f0ff" };
          case "interviewing":
            return { ...styles.container, backgroundColor: "#fff4e0" };
          case "offered":
            return { ...styles.container, backgroundColor: "#e0ffe0" };
          case "rejected":
            return { ...styles.container, backgroundColor: "#ffe0e0" };
          case "withdrawn":
            return { ...styles.container, backgroundColor: "#f0f0f0" };
          default:
            return styles.container;
        }
      })()}
    >
      <View style={styles.header}>
        <ScrollView
          horizontal
          directionalLockEnabled
          alwaysBounceVertical={false}
          bounces={false}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.headerContent}
        >
          {[
            "All",
            "Applied",
            "Interviewing",
            "Offered",
            "Rejected",
            "Withdrawn",
          ].map((status) => (
            <TouchableOpacity
              style={[
                styles.headerFilterButtons,
                {
                  backgroundColor: (() => {
                    switch (status) {
                      case "Applied":
                        return statusFilter === "applied" ||
                          statusFilter === "All"
                          ? "#3B82F6"
                          : "#d3d3d3ff";
                      case "Interviewing":
                        return statusFilter === "interviewing" ||
                          statusFilter === "All"
                          ? "#F59E0B"
                          : "#d3d3d3ff";
                      case "Offered":
                        return statusFilter === "offered" ||
                          statusFilter === "All"
                          ? "#10B981"
                          : "#d3d3d3ff";
                      case "Rejected":
                        return statusFilter === "rejected" ||
                          statusFilter === "All"
                          ? "#EF4444"
                          : "#d3d3d3ff";
                      case "Withdrawn":
                        return statusFilter === "withdrawn" ||
                          statusFilter === "All"
                          ? "#6B7280"
                          : "#d3d3d3ff";
                      default:
                        return statusFilter === "All"
                          ? "#9cbbfaff"
                          : "#d3d3d3ff";
                    }
                  })(),
                },
              ]}
              key={status}
              onPress={() => {
                setStatusFilter(() => {
                  return status !== "All"
                    ? (status.toLowerCase() as Job["status"] | "All")
                    : "All";
                });
                console.log(`Filter set to: ${status}`);
              }}
            >
              <View>
                <Text>{status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderJobCard(item)}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#e7fbffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxHeight: 52,
    backgroundColor: "#f7f7f7ff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3ff",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    paddingHorizontal: 8,
  },
  headerFilterButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "80%",
    backgroundColor: "#d3d3d3ff",
    marginHorizontal: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
});
