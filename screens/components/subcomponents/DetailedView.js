import React from "react";
import { View, Text, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import ImagePick from "./ImagePick";

export default function DetailedView(props) {
  function postingImage(props) {
    if (props.posting.image_link != null) {
      return (
        <>
        <View style={{flexDirection:'row'}}> 
          <Image
            source={{ uri: props.posting.image_link }}
            style={{flex: 1, width: 200, height: 200 }}
          ></Image>
          <View style={{flex:1}}> 
          <Text>Change picture</Text>
          <ImagePick {...props}></ImagePick>
          </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <ImagePick {...props} ></ImagePick>
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
        <View style={{ flex: 1, width: 350, alignItems:"center", marginBottom:20}}>{postingImage(props)}</View>


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
          title="Edit Posting"
          onPress={() => props.navigation.navigate("EditPosting")}
        />
         </View>
         <View style={{flex:1, margin: 10}}>
        <Button
          title="Delete Posting "
          color="red"
          onPress={() => props.navigation.navigate("DeletePosting")}
        />
          </View>


      </View>
    </View>
  );
}
