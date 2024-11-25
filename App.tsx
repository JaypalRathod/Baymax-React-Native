import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import { Platform, StatusBar } from 'react-native'
import { batteryOptimizationCheck, powerManagerCheck, requestPermission } from './src/notification/NotificationPermission';
import './src/notification/NotificationListeners';
import { registeringAllTriggres } from './src/notification/registerTriggers';
import { setCategories } from './src/notification/Notificationinitial';

const App = () => {

  const permissionChecks = async () => {
    requestPermission();
    registeringAllTriggres();
    setCategories();
    if (Platform.OS === 'android') {
      batteryOptimizationCheck();
      powerManagerCheck();
    }
  }

  useEffect(() => {
    permissionChecks()
  }, [])

  return (
    <>
      <Navigation />
      <StatusBar hidden />
    </>
  )
}

export default App