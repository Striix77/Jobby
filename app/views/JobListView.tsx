import { Button } from "@react-navigation/elements";
import { StyleSheet, Text, View } from "react-native";
import { useJobStore } from "../stores/JobStore";

export default function JobListView() {
  const { jobs, deleteJob, updateJob } = useJobStore();
  return (
    <View style={styles.container}>
      {jobs.map((job) => (
        <View key={job.id} style={styles.jobCard}>
          <Text>{job.title}</Text>
          <Text>{job.description}</Text>
          <View style={styles.jobButtonRow}>
            <Button onPress={() => deleteJob(job.id)}> Delete</Button>
            <Button onPress={() => updateJob(job.id, { status: "interview" })}>
              {" "}
              Mark as interviewing
            </Button>
            <Button onPress={() => {}}>Edit</Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  jobButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
