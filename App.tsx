import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default App;