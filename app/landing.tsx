import { SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * The LandingScreen component is the initial screen displayed to users when they open the app.
 * It provides options for signing in or creating a new account.
 *
 * @returns {JSX.Element} - A React Native component that renders the landing screen.
 */
export default function LandingScreen(): JSX.Element {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          paddingTop: 50 + top,
        }}
        variant="titleLarge"
      >
        React Native Firebase Chat
      </Text>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          style={{ marginBottom: 10, minWidth: 150 }}
          mode="elevated"
          onPress={() => router.push("/login")}
        >
          Sign In
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          mode="contained"
          onPress={() => router.push("/register")}
        >
          Create Account
        </Button>
      </View>
    </SafeAreaView>
  );
}
