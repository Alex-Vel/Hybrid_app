import React, { Component, useState } from 'react'
import { Text, View, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native'


const CreatePosting = (props) => {

  const [postingTitle, setPostingTitle] = useState(""); 
  const [postingDescription, setPostingDescription] = useState("");  
  const [postingLocation, setPostingLocation] = useState("");  
  const [postingCategory, setPostingCategory] = useState("");  
  const [postingPrice, setPostingPrice] = useState(""); 
  const [postingShipping, setPostingShipping] = useState(""); 
  
  return (
    <View style={{ alignItems: 'center', flex: 1, marginTop: 30, flexDirection:"column"}}>        
    <Text style={{ flex: 1}} >Create new posting</Text>
        <View style={{ flex: 1, flexDirection: 'row', height: 40, width: '90%', justifyContent: 'center', marginBottom: 40}}>

          <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingTitle(value) }
            value={ postingTitle}>
          </TextInput> 
          <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingDescription(value) }
            value={ postingDescription }>
          </TextInput> 
          <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingPrice(value) }
            value={ postingPrice }>
          </TextInput> 
          <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingLocation(value) }
            value={ postingLocation }>
          </TextInput> 
          <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingCategory(value) }
            value={ postingCategory }>
          </TextInput> 
          <TextInput style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingShipping(value) }
            value={ postingShipping }>
          </TextInput>        
           
          <TouchableHighlight onPress={ () => props.onPostingCreate(postingTitle,postingDescription,postingLocation,postingCategory,postingPrice, postingShipping) }>
            <View style={ { flex: 1, backgroundColor: 'blue',} }>
              <Text style={{ color: 'white', padding: 10 }}>Save</Text>
            </View>
          </TouchableHighlight>
        </View>   
        </View>     
  )
}

export default CreatePosting



