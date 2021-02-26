import React, { Component } from "react";
import { View, Text } from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack'
import SearchPostings from "./subcomponents/SearchPostings"
import PublicDetailedView from "./subcomponents/PublicDetailedView"

const Stack = createStackNavigator();

export default class GuestView extends Component {
    constructor(props) {

        super(props);
        this.state = {
          freshPostings: [],
          selectedPosting: null,
          searchedPostings : [],
          allPostings: []
        }    
      }
    
      componentDidMount() {

        //get new postings
        this.getFreshPostings();
    
      }


      getAllPostings = () =>
      {
        axios.get(this.props.apiURI + '/postings/all')
        .then(response => {
          if (response.status != 200 && response.status != 304) {
            this.setState({allPostings: []})
            throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
          }
          else{
          this.setState({allPostings: response.data.postings})
          console.log(response.data)
          }
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
      }


      viewPublicDetailedView = (posting_id) => {
        axios.get(this.props.apiURI + '/postings/' + posting_id)
        .then(response => {
          if (response.status != 200) {
            throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
          }
          this.setState({selectedPosting: response.data})
          console.log(response.data)
          this.props.navigation.navigate('PublicDetailedView');
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
      } 
  //get postings by creation date
  getFreshPostings()
  {
    console.log('getting fresh postings');
    axios.get(this.props.apiURI + '/postings/fresh')
    .then(response => {
      if (response.status != 200) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      console.log(response.data);
      this.setState({ freshPostings: response.data.postings})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }   
  
  
  //get postings with query params

  searchPostings = (location , category) =>
{
  axios.get(this.props.apiURI + '/postings/search/', { params: { location: location, category : category} })
  .then(response => {
    if (response.status != 200) {
      this.setState({searchedPostings: []})
      throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
    }
    else{
    this.setState({searchedPostings: response.data.postings})
    console.log(response.data)
    }
})
.catch(error => {
    this.setState({searchedPostings: []})
  console.log("Error message:")
  console.log(error.message)
});
}

      render() {
        return (
       
        <Stack.Navigator>
           <Stack.Screen name="SearchPostings" options={{ title: 'Browse Postings' }} >    
          { props => <SearchPostings {...props} postings={ this.state.searchedPostings } 
          getFreshPostings={this.getFreshPostings} freshPostings={this.state.freshPostings}
          getAllPostings={this.getAllPostings} allPostings={this.state.allPostings}
          searchPostings={this.searchPostings} 
          viewDetailedView={this.viewPublicDetailedView}/>}
        </Stack.Screen>

        <Stack.Screen name="PublicDetailedView" options={{ title: 'Posting Details' }} >    
          { props => <PublicDetailedView {...props} jwt={this.props.jwt} getPostings={this.getPostings} apiURI={this.props.apiURI} posting={this.state.selectedPosting}/>}
        </Stack.Screen>
        </Stack.Navigator>
            
        )
      }
    }
    
    