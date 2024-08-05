import React, { useState } from 'react';
import { Link, Tabs, router } from "expo-router";
import { Pressable } from 'react-native'
import { getAuth } from 'firebase/auth'
import { getApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Text } from "react-native-paper";

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
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

  if (isLoading) return <Text style={{ paddingTop: 10 }}>Loading ...</Text>

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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'document'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'code'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
