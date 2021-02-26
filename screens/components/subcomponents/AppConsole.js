import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const AppConsole = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ flex: 1, fontSize: 50, fontWeight: "700", textAlign:"center"}}>
        Bazaar App
      </Text>
      <View style={{flex:2}}>
      <Image
            source={require('../../../assets/bazaar.png')}
            style={{ width: 200, height: 200}}
          ></Image>
           </View>
      <View style={{ flex: 5, flexDirection: "column" }}>
        <View style={{ flex: 1 }}>
          <Button

            title="Go to my postings"
            onPress={() => props.navigation.navigate("MyPostings")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
       
            title="Create a posting"
            onPress={() => props.navigation.navigate("CreatePosting")}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Button

            title="Look for postings"
            onPress={() => props.navigation.navigate("SearchPostings")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Logout" onPress={props.onLogout} />
        </View>
      </View>
    </View>
  );
};

export default AppConsole;
