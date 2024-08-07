import React, { useState } from 'react';
import { Tabs, router } from "expo-router";
import { getAuth } from 'firebase/auth'
import { getApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Text } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { top } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false)
  const app = getApp();

  const db = getFirestore();

  getAuth(app).onAuthStateChanged((user) => {
    setIsLoading(false);

    if (user) {
      setDoc(
        doc(db, 'users', user.uid),
        {
          _id: user.uid,
          email: user.email
        },
        { merge: true }
      )
    } else {
      router.replace('/landing')
    }

  })

  if (isLoading) return <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>
      Loading ...
      </Text>
  </View>

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'document'} color={focused ? 'lightblue' : color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'settings'} color={focused ? 'lightblue' : color} />
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})