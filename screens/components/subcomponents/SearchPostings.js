import React, { useState } from 'react'
import { Text, View, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native'
import SinglePosting from './SinglePosting'

const SearchPostings= (props) => {

const [locationString, setLocationString] = useState(""); 
const [categoryString, setCategoryString] = useState(""); 

    return (
        <View style={{ alignItems: 'center', flex: 1, marginTop: 30, flexDirection:"column"}}>  

            <View style={{flex:1}}>
            <Text>Category: </Text>
            <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setCategoryString(value) }
            value={ categoryString}>
          </TextInput> 
            </View>

            <View style={{flex:1}}>
          <Text>Location: </Text>
            <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setLocationString(value) }
            value={ locationString}>
          </TextInput> 
          </View>

          <View style={{flex:1}}>
          <TouchableHighlight style={ {flex: 1, width:"100%",  backgroundColor: 'blue'}} onPress={ () => props.searchPostings(locationString,categoryString) }>
            <View style={ {flex: 1, width:"100%",  backgroundColor: 'blue',} }>
              <Text style={{ color: 'white', padding: 10 }}>Save</Text>
            </View>
          </TouchableHighlight>
          </View>
          <Text style={{ fontSize: 25 }}>Postings</Text>
        {
          props.postings.map(posting => <SinglePosting key={posting.posting_id} {...posting} viewDetailedView={props.viewDetailedView}></SinglePosting>)
          // props.postings.map(t => <Text key={t.id}>{ t.description }</Text>)
        }
        </View>
    )
}

export default SearchPostings
