import React, { Component, useState } from 'react'
import { Text, View, Button, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native'
import SinglePosting from './SinglePosting'
import CreatePosting from './CreatePosting'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MyPostings = (props) => {

  
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={{ alignItems: 'center', flex: 1, marginTop: 30, flexDirection:"column"}}>   
     
    <Text style={{ flex: 1}} >Create new posting</Text>
    <Stack.Navigator>

      <Stack.Screen name="Create Posting">
      { props => <CreatePosting {...props} onPostingCreate={ props.onPostingCreate}/>}
      </Stack.Screen>
      </Stack.Navigator>

        {/* <CreatePosting {...props}></CreatePosting> */}

        <Text style={{ fontSize: 25 }}>Postings</Text>
        {
          props.postings.map(posting => <SinglePosting key={posting.posting_id} {...posting} viewDetailedView={props.viewDetailedView}></SinglePosting>)
          // props.postings.map(t => <Text key={t.id}>{ t.description }</Text>)
        }
      </View>
      </ScrollView>
      </SafeAreaView>
  )
}

export default MyPostings




