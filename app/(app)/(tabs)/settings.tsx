import { View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { Button, Text } from "react-native-paper";

export default function SettingScreen() {
  const auth = getAuth();

  const logoutUser = () => {
    signOut(auth)
      .then(() => console.log('User signed out!'))
      .catch((error) => console.error('Error signing out:', error));
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ fontWeight: "bold", paddingBottom: 20 }}
        variant="titleLarge"
      >
        Your Account
      </Text>
      <Text>{auth.currentUser?.email}</Text>
      <Button mode="contained" style={{ marginTop: 20 }} onPress={logoutUser}>
        Sign Out
      </Button>
    </View>
  )
}