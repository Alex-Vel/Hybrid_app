import React, { useState } from 'react'
import { Text, View, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native'


const EditPosting = (props) => {

  const [postingTitle, setPostingTitle] = useState(props.posting.title); 
  const [postingDescription, setPostingDescription] = useState(props.posting.description);  
  const [postingLocation, setPostingLocation] = useState(props.posting.location);  
  const [postingCategory, setPostingCategory] = useState(props.posting.category);  
  const [postingPrice, setPostingPrice] = useState(String(props.posting.price)); 
  const [postingShipping, setPostingShipping] = useState(props.posting.shipping_method); 
  
  return (
 
    <View style={{ alignItems: 'center', flex: 1, marginTop: 30, flexDirection:"column"}}>        
  
        <View style={{ flex: 4, flexDirection: 'column', height: 40, width: '90%', justifyContent: 'center', marginBottom: 40}}>

          <View style={{flex: 1, width:"100%"}}>
            <Text> Posting Title</Text>
          <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingTitle(value) }
            value={ postingTitle}>
          </TextInput> 
          </View>

          <View style={{flex: 1, width:"100%"}}>
            <Text> Posting Description</Text>
          <TextInput style={{ borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingDescription(value) }
            value={ postingDescription }>
          </TextInput> 
          </View>

          <View style={{flex: 1, width:"100%"}}>
            <Text> Posting Price</Text>
          <TextInput style={{ borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingPrice(value) }
            value={ postingPrice }
            keyboardType = {'numeric'}>            
          </TextInput> 
          </View>

          <View style={{flex: 1, width:"100%"}}>
            <Text> Location</Text>
          <TextInput style={{ borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingLocation(value) }
            value={ postingLocation }>
          </TextInput> 
    </View>

    <View style={{flex: 1, width:"100%"}}>
            <Text> Category</Text>
          <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingCategory(value) }
            value={ postingCategory }>
          </TextInput> 
          </View>

          <View style={{flex: 1, width:"100%"}}>
            <Text> shipping method</Text>
          <TextInput style={{  borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingShipping(value) }
            value={ postingShipping }>
          </TextInput>        
          </View>
           
          <TouchableHighlight style={ {flex: 1, width:"100%",  backgroundColor: 'blue'}} onPress={ () => props.onEditPosting(props.posting.posting_id, postingTitle,postingDescription,postingLocation,postingCategory,postingPrice,postingShipping) }>
            <View style={ {flex: 1, width:"100%",  backgroundColor: 'blue',} }>
              <Text style={{ color: 'white', padding: 10 }}>Save</Text>
            </View>
          </TouchableHighlight>
          </View>
        
        </View>     
      
  )
}

export default EditPosting



