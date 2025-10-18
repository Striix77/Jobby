import { FlatList, StyleSheet, View } from "react-native";
import { useJobStore } from "../stores/JobStore";
import Job from "../types/jobs";
import JobCardView from "./JobCardView";

export default function JobListView() {
  const { jobs } = useJobStore();

  const renderJobCard = (item: Job) => <JobCardView item={item} />;

  return (
    <View style={styles.container}>
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
    backgroundColor: "#bcd2ffff",
  },
});
