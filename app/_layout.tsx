import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { PaperProvider } from 'react-native-paper';
import { theme } from '@/theme'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4jkfLFtI98WfE7IYz9dKfYd5qLDq22TM",
  authDomain: "fir-chat-9b5b8.firebaseapp.com",
  projectId: "fir-chat-9b5b8",
  storageBucket: "fir-chat-9b5b8.appspot.com",
  messagingSenderId: "476358116633",
  appId: "1:476358116633:web:95fd86375813d84a2b3188"
};

const app = initializeApp(firebaseConfig);

!app && initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
getFirestore(app);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(app)/(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)/chat" options={{ headerShown: false }} />
          <Stack.Screen name="landing" options={{ headerShown: false }} />
          <Stack.Screen
            name="login"
            options={{
              headerTitleAlign: "center",
              headerTitle: "Sign In",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="register"
            options={{
              headerTitleAlign: "center",
              headerTitle: "Create Account",
              presentation: "modal",
            }}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
