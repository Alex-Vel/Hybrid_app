import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native'
import SinglePosting from './SinglePosting'

const SearchPostings= (props) => {

  useEffect(() => {
    props.getFreshPostings();
  }, [props.getFreshPostings]);


const [locationString, setLocationString] = useState(""); 
const [categoryString, setCategoryString] = useState(""); 
const [browseAll, setAllBool] = useState(false); 
const [searchBool, setSearchBool] = useState(false); 
const [freshBool, setFreshBool] = useState(true); 

function searchResult()
{
  if(browseAll)
  {
    return( 
    <Text style={{ fontSize: 25, textAlign:"center"}}>All postings:</Text>
    )
  }
  else if (searchBool)
  {
    return (
    <Text style={{ fontSize: 25, textAlign:"center"}}>Search Postings:</Text>
    )
  }
else if (freshBool)
{ 
  return (
  <Text style={{ fontSize: 25, textAlign:"center"}}>Fresh Postings:</Text>
  )
}
}

function getAllHandler()
{
  if(!browseAll)
  {
    props.getAllPostings();
    setAllBool(true);
    setSearchBool(false);
    setFreshBool(false);
  }

}

function searchHandler()
{

     if(locationString || categoryString){
     props.searchPostings(locationString,categoryString);
     setAllBool(false);
     setSearchBool(true);
     setFreshBool(false);
  
}
}
function freshButtonHandler()
{
  if(!freshBool)
  {
  setAllBool(false);
  setSearchBool(false);
  setFreshBool(true);
  } 
}


function changeButton()
{
  if(!browseAll)
  {
    return(
     
      <View style={{flex:1, marginTop: 15, width:"80%", flexDirection:"column", justifyContent:"center"}}>
      <TouchableHighlight style={ {flex: 1, width:"100%",  backgroundColor: 'blue'}} onPress={ () => getAllHandler()}>
        <View style={ {flex: 1, width:"100%",  backgroundColor: 'blue', justifyContent:"center"} }>
        <Text style={{ color: 'white', padding: 10, textAlign:"center", fontSize:24 }}>Browse All</Text>
        </View>
      </TouchableHighlight>
      </View>
      
    )
  }
  else
  {
    return(
     
      <View style={{flex:1, marginTop: 15, width:"80%", flexDirection:"column", justifyContent:"center"}}>
      <TouchableHighlight style={ {flex: 1, width:"100%",  backgroundColor: 'blue'}} onPress={ () => freshButtonHandler()}>
        <View style={ {flex: 1, width:"100%",  backgroundColor: 'blue', justifyContent:"center"} }>
        <Text style={{ color: 'white', padding: 10, textAlign:"center", fontSize:24 }}>Browse Fresh</Text>
        </View>
      </TouchableHighlight>
      </View>

    )
  }
}

function PostingsHandler()
{

  if (searchBool)
  {
    return (
      props.postings.map(posting => <SinglePosting style={{flex:1}}key={posting.posting_id} {...posting} viewDetailedView={props.viewDetailedView}></SinglePosting>)
    )
  }
  else if(browseAll)
  {
  return (
    props.allPostings.map(posting => <SinglePosting style={{flex:1}}key={posting.posting_id} {...posting} viewDetailedView={props.viewDetailedView}></SinglePosting>)
    )
  }
  else
  {
    return (
      props.freshPostings.map(posting => <SinglePosting style={{flex:1}}key={posting.posting_id} {...posting} viewDetailedView={props.viewDetailedView}></SinglePosting>)
    )

  }

}

    return (
      
        <View style={{ alignItems: 'center', flex: 1, marginTop: 30, flexDirection:"column", justifyContent:"flex-start"}}>  

            <View style={{flex:1, width:"80%"}}>
            <Text>Category: </Text>
            <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setCategoryString(value) }
            value={ categoryString}>
          </TextInput> 

          <Text>Location: </Text>
            <TextInput style={{borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            onChangeText={ value => setLocationString(value) }
            value={ locationString}>
          </TextInput> 
          </View>
         

          <View style={{flex:1, marginTop: 15, width:"80%", flexDirection:"column", justifyContent:"center"}}>
          <TouchableHighlight style={ {flex: 1, width:"100%",  backgroundColor: 'blue'}} onPress={ () => searchHandler()}>
            <View style={ {flex: 1, width:"100%",  backgroundColor: 'blue', justifyContent:"center"} }>
              <Text style={{ color: 'white', padding: 10, textAlign:"center", fontSize:24 }}>Search</Text>
            </View>
          </TouchableHighlight>
          </View>

          {changeButton()}

          <View style={{flex: 1, justifyContent:"center"}}> 
          {searchResult()}
          {/* <Text style={{ fontSize: 25, textAlign:"center"}}>Postings:</Text> */}

          </View>
          <View style={{flex:4, flexDirection:"column", width:"100%", justifyContent:"flex-start"}}>
          <SafeAreaView>
            <ScrollView>
                {/* fresh or searched */}
                 {PostingsHandler()}  
            </ScrollView>
          </SafeAreaView>

    
         </View>
        </View>
    )
}

export default SearchPostings
