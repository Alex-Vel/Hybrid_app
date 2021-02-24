import React from "react";
import { View, TouchableHighlight, Text } from "react-native";

export default function SinglePosting(props) {
  return (
    // <View style={{borderWidth:1, margin:5}}>
    <TouchableHighlight
    style={{ flexDirection: "row", borderWidth: 1, margin: 5 }}
      onPress={() => props.viewDetailedView(props.posting_id)}
    >
      <>
      {/* <View style={{flexDirection:'row',borderWidth:1, margin:5}}> */}
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text>{props.title}</Text>
        <Text>{props.description}</Text>
        <Text>{props.price}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text>{props.shipping_method}</Text>
        <Text>{props.category}</Text>
      </View>
      </>
      {/* </View> */}
    </TouchableHighlight>
    //</View>
  );
}
