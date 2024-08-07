
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer'
import Ionicons from '@expo/vector-icons/Ionicons'
// import CustomDrawerContent from '@/components/CustomDrawerContent'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { getAuth, signOut } from "firebase/auth";
import HomeScreen from '..'

const CustomDrawerContent = (props: any) => {
  const auth = getAuth();

  const logoutUser = () => {
    signOut(auth)
      .then(() => console.log('User signed out!'))
      .catch((error) => console.error('Error signing out:', error));
  }


  const router = useRouter()
  const { top, bottom } = useSafeAreaInsets();
  return (

    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View>
          <Image
            source={{ uri: 'https://galaxies.dev/img/authors/simong.webp' }}
            style={{ width: 100, height: 100, alignSelf: 'center' }}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 500,
              fontSize: 18,
              paddingTop: 10,
              color: '#5363df'
            }}>{auth.currentUser?.email}</Text>
        </View>
        <DrawerItemList  {...props} />

        <DrawerItem
          label={'Chat'}
          onPress={() => router.navigate('/(app)/(tabs)')}
          icon={({ size, color }) => (
            <Ionicons name='chatbubbles-outline'
              size={size} color={color}
            />
          )}
          style={{ marginVertical: 0 }}
          labelStyle={{ marginLeft: -20 }}
        />
        <DrawerItem
          label={'logout'}
          onPress={logoutUser}
          icon={({ size, color }) => (
            <Ionicons name='log-out-outline' size={size} color={color} />
          )}
          style={{ marginVertical: 0 }}
          labelStyle={{ marginLeft: -20 }}
        />
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: '#dde3fe',
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}>
        <Text style={styles.footerContainer} >Footer</Text>
      </View>
    </View>
  )
}

const _layout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          headerTintColor: 'white',
          drawerLabelStyle: {
            marginLeft: -20,
            color: 'white'
          },

          drawerHideStatusBarOnOpen: false,
          drawerActiveBackgroundColor: '#5363df',
          drawerActiveTintColor: '#fff',
        }}
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: 'Settings',
            title: 'Chat',
            drawerIcon: ({ size, color }) => {
              return <Ionicons name='settings' size={size} color={color} />
            }
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default _layout

const styles = StyleSheet.create({
  footerContainer: {
    color: 'white',
  },
})