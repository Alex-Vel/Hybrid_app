//imports
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import MainScreen from "./screens/MainScreen";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();

function App() {
  //const Stack = createStackNavigator();
  const apiURI = "https://web-interfaces-test.herokuapp.com";

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Main"
            options={{
             
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" color={color} size={size} />
              )
            }}>
                  { props => <WelcomeScreen
                          {...props}
                          apiURI={ "https://web-interfaces-test.herokuapp.com" }
                        />}
            </Tab.Screen>
          
          <Tab.Screen
            name="Secondary"
            component={MainScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-list" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 18,
  },
});

export default App;
