import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserContext from './Context/UserContext';
import { useState } from 'react';


const Stack = createNativeStackNavigator();

export default function App() {
  const [users, setUsers] = useState([]);
  return (
    <UserContext.Provider  value={{ users, setUsers }}>
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options ={{headerShown: false, headerLeft: null}} name="Login" component={LoginScreen} />
        <Stack.Screen options = {{headerLeft:null}} name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
