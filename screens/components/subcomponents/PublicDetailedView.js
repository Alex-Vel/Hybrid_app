import React from "react";
import { View, Text, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import ImagePick from "./ImagePick";

export default function DetailedView(props) {
  function postingImage(props) {
    if (props.posting.image_link != null) {
      return (
        <>
          <Image
            source={{ uri: props.posting.image_link }}
            style={{ width: 200, height: 200 }}
          ></Image>
       
        </>
      );
    } else {
      return (
        <>
             <Text>Item has no image</Text>
        </>
      );
    }
  }
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        marginTop: 30,
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <View style={{ flex: 1, width: 80, alignItems:"center", marginBottom:20}}>{postingImage(props)}</View>


      <View style={{flex:2,justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontWeight:"bold", marginTop:5}}>Title:</Text>
          <Text>{props.posting.title}</Text>
          <Text style={{fontWeight:"bold", marginTop:5}}>Description:</Text>
          <Text>{props.posting.description}</Text>
          <Text style={{fontWeight:"bold", marginTop:5}}>Asking price:</Text>
          <Text>{props.posting.price} €</Text>
          <Text style={{fontWeight:"bold", marginTop:5}}>Delivery method:</Text>
          <Text>{props.posting.shipping_method}</Text>
          <Text style={{fontWeight:"bold", marginTop:5}}>Category:</Text>
          <Text>{props.posting.category}</Text>
      
          </View>

      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-evenly",
          width:'70%'
        }}
      >
        <View style={{flex:1, margin: 10}}>
        <Button
          title="Buy posting"
        />
         </View>



      </View>
    </View>
  );
}
