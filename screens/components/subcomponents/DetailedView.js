import React from 'react'
import { View, Text } from 'react-native'

export default function DetailedView(props) {
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
      </View>
        </View>
    )
}
