import { View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * This is the SettingScreen component, which is responsible for displaying the user's settings.
 * It includes a button to open the navigation drawer.
 *
 * @returns {JSX.Element} - A React Native component for displaying the settings screen.
 */
export default function SettingScreen() {
  const auth = getAuth();

  const logoutUser = () => {
    signOut(auth)
      .then(() => console.log("User signed out!"))
      .catch((error) => console.error("Error signing out:", error));
  };

  const navigation = useNavigation();
  console.log(navigation);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button title="Open Settings" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
