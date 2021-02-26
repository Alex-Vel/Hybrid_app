import React, { useState } from 'react'
import { Text, View, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const CreatePosting = (props) => {

  const [postingTitle, setPostingTitle] = useState(""); 
  const [postingDescription, setPostingDescription] = useState("");  
  const [postingLocation, setPostingLocation] = useState("");  
  const [postingCategory, setPostingCategory] = useState("");  
  const [postingPrice, setPostingPrice] = useState(""); 
  const [postingShipping, setPostingShipping] = useState(""); 
  
  return (
 
    <View style={{ alignItems: 'center', flex: 1, marginTop: 30, flexDirection:"column"}}>        
  
        <SafeAreaView style={{ flex: 2, flexDirection: 'column', height: 40, width: '90%', justifyContent: 'center', marginBottom: 40}}>

          <View style={{flex: 1, width:"100%"}}>
            <Text> Posting Title</Text>
          <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingTitle(value) }
            maxLength={30}
            value={ postingTitle}>
          </TextInput> 
          </View>

          <View style={{flex: 1, width:"100%", height: 50}}>
            <Text> Posting Description</Text>
          <TextInput style={{ borderWidth: 1, borderColor: 'black', backgroundColor: 'white', height:50 }}
            onChangeText={ value => setPostingDescription(value) }
            maxLength={255}
            value={ postingDescription }>
          </TextInput> 
          </View>

          <View style={{flex: 1, width:"100%"}}>
            <Text> Posting Price</Text>
          <TextInput style={{ borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingPrice(value) }
            value={ postingPrice }
            maxLength={20}
            keyboardType = {'numeric'}>            
          </TextInput> 
          </View>

          <View style={{flex: 1, width:"100%"}}>
            <Text> Location</Text>
          <TextInput style={{ borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingLocation(value) }
            maxLength={55}
            value={ postingLocation }>
                    
          </TextInput> 
          </View>

            <View style={{flex: 1, width:"100%"}}>
            <Text> Category</Text>
          <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingCategory(value) }
            maxLength={55}
            value={ postingCategory }>
          </TextInput> 
          </View>
          <View style={{flex: 1, width:"100%"}}>
            <Text> shipping method</Text>
          
            <DropDownPicker
            items={[
            {label: 'Send it by mail', value: 'Mail delivery'},
            {label: 'Pickup only', value: 'pickup only'},
            {label: 'home delivery', value: 'Delivered'},
            {label: 'send it through the portal', value: 'Portal'},
            ]}
            defaultValue={postingShipping}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
            justifyContent: 'flex-start'
            }}
             dropDownStyle={{backgroundColor: '#fafafa'}}
             onChangeItem={item => setPostingShipping(item.value) }
          />

          {/* <TextInput style={{  borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setPostingShipping(value) }
            value={ postingShipping }>
          </TextInput>         */}
          </View>



           
          <TouchableHighlight style={ {flex: 1, width:"100%",  backgroundColor: 'blue'}} onPress={ () => props.onPostingCreate(postingTitle,postingDescription,postingLocation,postingCategory,postingPrice, postingShipping) }>
            <View style={ {flex: 1, width:"100%",  backgroundColor: 'blue',} }>
              <Text style={{ color: 'white', padding: 10,fontSize:24, textAlign:'center' }}>Make the Posting</Text>
            </View>
          </TouchableHighlight>
          </SafeAreaView>
        
        </View>     
      
  )
}

export default CreatePosting



