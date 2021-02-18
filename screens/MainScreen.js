import React from "react";
import { Button, View, Text } from "react-native";

const MainScreen = (props) =>
 {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Main Screen</Text>
      <Button
        title="Go to home screen"
        onPress={() => props.navigation.navigate("Home")}
      />
    </View>
  );
}
export default MainScreen