// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/contexts/AuthContext";
import AuthNavigator from "./src/navigation/AuthNavigator";
import HomeScreen from "./src/screens/HomeScreen";
import NotesScreen from "./src/screens/NotesScreen";
import AuthScreen from "./src/screens/AuthScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
       <AuthNavigator />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Notes App",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            title: "My Notes",
          }}
        />
         <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </AuthProvider>
  );
}