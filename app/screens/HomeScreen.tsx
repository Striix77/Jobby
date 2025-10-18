import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useJobStore } from "../stores/JobStore";
import JobListView from "../views/JobListView";
import JobModalView from "../views/JobModalView";

export default function HomeScreen() {
  const { jobs, addJob } = useJobStore();
  const [isAddingJob, setIsAddingJob] = useState(false);

  return (
    <View style={styles.container}>
      {jobs.length === 0 ? (
        <Text>You haven&apos;t added any jobs yet!</Text>
      ) : (
        <JobListView />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsAddingJob(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      <JobModalView
        isVisible={isAddingJob}
        setIsVisible={setIsAddingJob}
        isAddingJob={true}
        jobID={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    width: 56,
    height: 56,
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
