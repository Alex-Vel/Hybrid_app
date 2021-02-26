import React from "react";
import { View, TouchableHighlight, Text, Image } from "react-native";

export default function SinglePosting(props) {
  return (
    // <View style={{borderWidth:1, margin:5}}>
    <TouchableHighlight
    style={{ flexDirection: "row", borderWidth: 1, margin: 20, padding: 10 }}
      onPress={() => props.viewDetailedView(props.posting_id)}
    >
      <>
      {/* <View style={{flexDirection:'row',borderWidth:1, margin:5}}> */}
      <View style={{ flex: 1, width:50, height: 50, alignItems:"center", alignContent:"center" }}>
      <Image source={{uri:props.image_link}} style={{ width: 60, height: 60}}></Image>
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{fontWeight:'bold'}}>{props.title}</Text>
        <Text>{props.description}</Text>
        <Text style={{fontWeight:'bold'}}>Category: </Text>
        <Text>{props.category}</Text>
        <Text style={{fontWeight:'bold'}}>location: </Text>
        <Text>{props.location}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
      <Text style={{fontWeight:'bold'}}>Shipping method: </Text>
        <Text>{props.shipping_method}</Text>
        <Text style={{fontWeight:'bold'}}>Asking price: </Text>
        <Text>{props.price + " € "}</Text>


      </View>
      </>
      {/* </View> */}
    </TouchableHighlight>
    //</View>
  );
}
