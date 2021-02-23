import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import View1 from './subcomponents/View1'
import MyPostings from './subcomponents/MyPostings'
import axios from "axios";

const Stack = createStackNavigator();

export default class PostingsApp extends Component {

  constructor(props) {

    super(props);
    this.state = {
      postings: [],
    }    
  }

  componentDidMount() {
    console.log('getting postings for..' + this.props.user_id);
    console.log('with jwt..' + this.props.jwt);
    
    axios.get(this.props.apiURI + '/postings/user/' + this.props.user_id, {
      headers: {
       'Authorization': 'Bearer ' + this.props.jwt
      }
    })
    .then(response => {
      if (response.status != 200) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      console.log(response.data);
      this.setState({ postings: response.data.postings})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
   // this.getPostings();
  }
  

  getPostings() {
    console.log('getting postings for..' + this.props.user_id);
    axios.get(this.props.apiURI + '/postings/user/' + this.props.user_id, {
      headers: {
       'Authorization': 'Bearer ' + this.props.jwt
      }
    })
    .then(response => {
      if (response.status != 200) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      console.log(response.data);
      this.setState({ postings: response.data.postings})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }

  onPostingCreate = (title, description, location, category, price, shipping_method) => {
    let posting_config = {};
    price = parseFloat(price);

    axios.post(this.props.apiURI + '/postings',{
      title: title,
      description: description,
      location: location,
      category: category,
      price: price,
      shipping_method: shipping_method,
      posting_config : posting_config
    },
    {
    headers: {
      "Authorization": "Bearer " + this.props.jwt,
     }
    })

    .then(response => {
      if (response.status != 201) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      else{
      this.getPostings();
      }
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="View1">
          { props => <View1 {...props} onLogout={ this.props.onLogout }/>}
        </Stack.Screen>
        <Stack.Screen name="MyPostings" options={{ title: 'My Postings' }} >    
          {/* { props => <MyPostings {...props} postings={ this.state.postings } onPostingCreate={ this.onPostingCreate }/>} */}
          { props => <MyPostings {...props} postings={ this.state.postings } onPostingCreate={ this.onPostingCreate }/>}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
}
