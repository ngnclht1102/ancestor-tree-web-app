import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as sc from '@/modules/app/screens'
import {
  navigationRef,
  isReadyRef
} from '@/modules/app/navigation/navigation-service'

import SplashScreen from '@/modules/app/splash'
import HomeScreen from '@/modules/home'

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

const MainStackConfig: { path: string; screens: any } = {
  path: '',
  screens: {}
}
MainStackConfig.screens[sc.SCREEN_SPLASH] = 'splash'
MainStackConfig.screens[sc.SCREEN_HOME] = 'home'

const linking = {
  prefixes: ['http://localhost:8080', 'myapp://'],
  screens: {
    Main: MainStackConfig
  }
}

const MainStackScreens = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name={sc.SCREEN_SPLASH} component={SplashScreen} />
      <MainStack.Screen name={sc.SCREEN_HOME} component={HomeScreen} />
    </MainStack.Navigator>
  )
}

export default function Root() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    }
  }, [])

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
    >
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreens}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
