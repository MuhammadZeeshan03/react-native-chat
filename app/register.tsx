import { Alert, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TextInput, Button, Text } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

/**
 * This is the RegisterScreen component, which is responsible for handling user registration.
 * It uses React Native and React Native Paper libraries to create a user interface for registering a new account.
 *
 * @returns {JSX.Element} - A React Native component for user registration.
 */
export default function RegisterScreen(): JSX.Element {
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const registerUser = async () => {
    if (!email && !password)
      return Alert.alert("Error", "Please fill in all fields");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.replace("/(app)/(tabs)");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: top, justifyContent: "center" }}
    >
      <Text
        style={{ textAlign: "center", fontWeight: "bold", paddingBottom: 20 }}
      >
        Create An Account
      </Text>

      <View style={{ marginHorizontal: 10 }}>
        <TextInput
          style={{ marginVertical: 5 }}
          mode="outlined"
          label={"Email"}
          autoComplete="email"
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text: string) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={{ marginVertical: 5 }}
          mode="outlined"
          autoComplete="password"
          label={"Password"}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
        />
        <Button
          mode="elevated"
          style={{ marginVertical: 40 }}
          onPress={registerUser}
        >
          Register
        </Button>
      </View>
    </SafeAreaView>
  );
}
