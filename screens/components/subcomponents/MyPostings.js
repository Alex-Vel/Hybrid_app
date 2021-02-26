import React, { Component, useState, useEffect } from 'react'
import { Text, View, Button, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native'
import SinglePosting from './SinglePosting'
import CreatePosting from './CreatePosting'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();


const MyPostings = (props) => {


  useEffect(() => {
    props.getPostings();
  }, [props.getPostings]);


  
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={{ alignItems: 'center', flex: 1, marginTop: 30, flexDirection:"column"}}>   
    <Button
       
       title="Refresh my postings"
       onPress={() => props.getPostings()}
     />


        <Text style={{ fontSize: 25 }}>Postings</Text>
        {
          props.postings.map(posting => 
          <SinglePosting key={posting.posting_id} 
            {...posting} 
            {...props}
            onDeletePosting={props.onDeletePosting} 
            viewDetailedView={props.viewDetailedView}>
            </SinglePosting>)
        }

      </View>
      </ScrollView>
      </SafeAreaView>
  )
}

export default MyPostings




