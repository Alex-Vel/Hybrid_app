//imports
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Ionicons } from "react-native-vector-icons";


function App() {
  //const Stack = createStackNavigator();
  const apiURI = "https://web-interfaces-test.herokuapp.com";

  return (
    <View style={styles.container}>
      <NavigationContainer>
      <WelcomeScreen apiURI={ "https://web-interfaces-test.herokuapp.com" }></WelcomeScreen>
      </NavigationContainer>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default App;

          {/* <Tab.Screen
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
          /> */}