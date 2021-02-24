import React from 'react'
import { View, Text, Image } from 'react-native'
import ImagePick from './ImagePick'


export default function DetailedView(props) {

    function postingImage(props)
    {
        if (props.posting.image_link)
        {
            return (
            <View style={{flex:1}}> 
            <Image source={{uri:props.posting.image_link}} style={{ width: 200, height: 200}}></Image>
            </View>
            )
        }
        else
        {   
            return (<>
            
            <ImagePick {...props}></ImagePick>
            </>)
        }
    }
    
    
    return (
        <View style={{ alignItems: 'center', flex: 1, marginTop: 30, width:"80%", flexDirection:"column"}}>  
        <View style={{flexDirection:'row'}}>
               
        <View style={{ flex: 1, flexDirection: "column" }}>
        <Text>{props.posting.title}</Text>
        <Text>{props.posting.description}</Text>
        <Text>{props.posting.price}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text>{props.posting.shipping_method}</Text>
        <Text>{props.posting.category}</Text>
 
      </View>
      {postingImage(props)}
      </View>
        </View>
    )
}
