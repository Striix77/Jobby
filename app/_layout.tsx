import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Jobby",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "600",
        },
      }}
    ></Stack>
  );
}
