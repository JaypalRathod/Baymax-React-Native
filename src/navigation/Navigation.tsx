import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import BaymaxScreen from '../screens/BaymaxScreen';
import { navigationRef } from '../utils/NavigationUtils';


const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='SpalshScreen'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SpalshScreen" component={SplashScreen} />
        
        <Stack.Screen
          options={{
            animation: 'fade'
          }}
          name="BaymaxScreen"
          component={BaymaxScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation