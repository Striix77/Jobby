import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useJobStore } from "../stores/JobStore";
import JobListView from "../views/JobListView";

export default function HomeScreen() {
  const { jobs, addJob } = useJobStore();
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");

  const handleAddJob = () => {
    if (title && company) {
      addJob({
        title,
        company,
        location,
        description,
        salary,
        status: "applied",
        date: new Date().toISOString(),
      });

      // Reset form and close modal
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setSalary("");
      setIsAddingJob(false);
    }
  };

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

      {/* Modal for adding a job*/}
      <Modal
        visible={isAddingJob}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddingJob(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsAddingJob(false)}>
                <Ionicons name="close" size={30} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Job</Text>
            </View>
            <ScrollView style={styles.form}>
              <Text style={styles.label}>Job Title*</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Software Developer"
                placeholderTextColor="#999"
              />
              <Text style={styles.label}>Company*</Text>
              <TextInput
                style={styles.input}
                value={company}
                onChangeText={setCompany}
                placeholder="e.g. Google"
                placeholderTextColor="#999"
              />
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g. New York, NY"
                placeholderTextColor="#999"
              />
              <Text style={styles.label}>Salary</Text>
              <TextInput
                style={styles.input}
                value={salary}
                onChangeText={setSalary}
                placeholder="e.g. $100,000"
                placeholderTextColor="#999"
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="e.g. Job description"
                placeholderTextColor="#999"
                multiline
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddJob}
              >
                <Text style={styles.submitButtonText}>Add Job</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
