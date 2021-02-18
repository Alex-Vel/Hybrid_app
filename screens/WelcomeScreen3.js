import React from "react";
import { Button, View, Text } from "react-native";

const WelcomeScreen = (props) =>
 {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Main Screen</Text>
      <Text>{props.apiURI}</Text>
      <Button
        title="Go to welcome screen"
        onPress={() => props.navigation.navigate("Home")}
      />
    </View>
  );
}
export default WelcomeScreen