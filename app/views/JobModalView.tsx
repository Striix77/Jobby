import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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

export default function JobModalView({
  isVisible,
  setIsVisible,
  isAddingJob,
  jobID,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  isAddingJob: boolean;
  jobID: string | null;
}) {
  const { addJob, updateJob, getJobById } = useJobStore();

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
      setIsVisible(false);
    }
  };

  const handleUpdateJob = () => {
    if (jobID && title && company) {
      updateJob(jobID, {
        title,
        company,
        location,
        description,
        salary,
      });
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isAddingJob && jobID) {
      const job = getJobById(jobID);
      if (job) {
        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location || "");
        setDescription(job.description || "");
        setSalary(job.salary || "");
      }
    }
  }, [getJobById, isAddingJob, jobID]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsVisible(false)}
      allowSwipeDismissal={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View
          style={isAddingJob ? styles.modalContent : styles.editingModalContent}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Ionicons name="close" size={35} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {isAddingJob ? "Add New Job" : "Edit Job"}
            </Text>
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
              onPress={() => {
                if (isAddingJob) {
                  handleAddJob();
                } else {
                  handleUpdateJob();
                }
              }}
            >
              <Text style={styles.submitButtonText}>
                {isAddingJob ? "Add Job" : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    paddingBottom: 20,
  },
  editingModalContent: {
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#ec0000ff",
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
