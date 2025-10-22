import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Animated,
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.1));

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const onChangeDate = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ) => {
    const currentDate = date || new Date();
    setDate(currentDate);
  };

  const onChangeTime = (
    event: DateTimePickerEvent,
    time?: Date | undefined
  ) => {
    const currentTime = time || new Date();
    setTime(currentTime);
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    // Animate in: fade, slide, and scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide after 3 seconds
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowToast(false);
      });
    }, 3000);
  };

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

      // Show success toast
      showToastNotification(`✓ ${title} added successfully!`);
    }
  };

  const handleUpdateJob = () => {
    if (jobID && title && company) {
      const interviewDate = new Date(date);
      interviewDate.setHours(time.getHours());
      interviewDate.setMinutes(time.getMinutes());
      updateJob(jobID, {
        title,
        company,
        interviewDate: interviewDate.toISOString(),
        location,
        description,
        salary,
      });
      setIsVisible(false);

      // Show success toast
      showToastNotification(`✓ ${title} updated successfully!`);
    }
  };

  useEffect(() => {
    if (!isAddingJob && jobID) {
      const job = getJobById(jobID);
      if (job) {
        setTitle(job.title);
        setCompany(job.company);
        setDate(job.interviewDate ? new Date(job.interviewDate) : new Date());
        setTime(job.interviewDate ? new Date(job.interviewDate) : new Date());
        setLocation(job.location || "");
        setDescription(job.description || "");
        setSalary(job.salary || "");
      }
    }
  }, [getJobById, isAddingJob, jobID]);

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View
            style={
              isAddingJob ? styles.modalContent : styles.editingModalContent
            }
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
              {jobID && (
                <>
                  <Text style={styles.label}>Interview Date</Text>
                  <View style={styles.interviewDateTimeContainer}>
                    <DateTimePicker
                      testID="dateTimePicker"
                      mode="date"
                      value={date}
                      is24Hour={true}
                      onChange={onChangeDate}
                      style={styles.dateInput}
                    />
                    <DateTimePicker
                      testID="dateTimePicker"
                      mode="time"
                      value={time}
                      is24Hour={true}
                      onChange={onChangeTime}
                      style={styles.timeInput}
                    />
                  </View>
                </>
              )}

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

      {/* Toast Notification */}
      {showToast && (
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
                {
                  scaleX: scaleAnim, // Animate width
                },
                {
                  scaleY: scaleAnim, // Animate height (optional)
                },
              ],
            },
          ]}
        >
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </>
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
  interviewDateTimeContainer: {
    marginBottom: 16,
    flexDirection: "row",
    gap: 12,
  },
  dateInput: {
    marginLeft: -12,
  },
  timeInput: {
    marginLeft: -12,
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
  toast: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#10B981",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999,
  },
  toastText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
