import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useJobStore } from "../stores/JobStore";

const userProfile = {
  name: "Erik Strix",
  headline: "Product Designer",
  email: "erik@jobby.app",
  phone: "+46 701 234 567",
  location: "Stockholm, Sweden",
  memberSince: "January 2024",
  bio: "Design-minded product builder who loves tracking progress and helping teams stay organised.",
};

const statusLabels: Record<string, string> = {
  applied: "Applied",
  interviewing: "Interviewing",
  offered: "Offers",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

const statusColors: Record<string, string> = {
  applied: "#3B82F6",
  interviewing: "#F59E0B",
  offered: "#10B981",
  rejected: "#EF4444",
  withdrawn: "#6B7280",
};

export default function ProfileScreen() {
  const jobs = useJobStore((state) => state.jobs);

  const jobStats = useMemo(() => {
    const totals = {
      all: jobs.length,
      applied: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0,
      withdrawn: 0,
    };

    jobs.forEach((job) => {
      totals[job.status] += 1;
    });

    return totals;
  }, [jobs]);

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userProfile.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.headline}>{userProfile.headline}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            <Text style={styles.metaText}>{userProfile.location}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={18} color="#6B7280" />
            <Text style={styles.metaText}>
              Member since {userProfile.memberSince}
            </Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
            <Ionicons name="create-outline" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.infoCard}>
            <InfoRow
              icon="mail-outline"
              label="Email"
              value={userProfile.email}
            />
            <InfoRow
              icon="call-outline"
              label="Phone"
              value={userProfile.phone}
            />
            <InfoRow
              icon="pin-outline"
              label="Location"
              value={userProfile.location}
            />
            <InfoRow
              icon="person-circle-outline"
              label="Member Since"
              value={userProfile.memberSince}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoCard}>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard
              label="Total"
              value={jobStats.all}
              color="#111827"
              icon="briefcase-outline"
            />
            {Object.entries(statusLabels).map(([status, label]) => (
              <StatCard
                key={status}
                label={label}
                value={jobStats[status as keyof typeof jobStats]}
                color={statusColors[status]}
                icon="ellipse-outline"
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.outlinedButton]}
              activeOpacity={0.85}
            >
              <Ionicons
                name="cloud-download-outline"
                size={18}
                color="#007AFF"
              />
              <Text style={styles.outlinedButtonText}>Export Jobs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.outlinedButton]}
              activeOpacity={0.85}
            >
              <Ionicons name="settings-outline" size={18} color="#007AFF" />
              <Text style={styles.outlinedButtonText}>Account Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabelRow}>
        <Ionicons name={icon} size={18} color="#6B7280" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View style={styles.statCard}>
      <View
        style={[styles.statIconContainer, { backgroundColor: `${color}1A` }]}
      >
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  headline: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    marginLeft: 8,
    color: "#6B7280",
    fontSize: 14,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 18,
    gap: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoLabel: {
    marginLeft: 8,
    fontSize: 13,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  bioText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flexBasis: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
  },
  outlinedButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
