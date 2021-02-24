import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import View1 from './subcomponents/View1'
import MyPostings from './subcomponents/MyPostings'
import CreatePosting from './subcomponents/CreatePosting'
import SearchPostings from './subcomponents/SearchPostings'
import DetailedView from './subcomponents/DetailedView'
import ImagePick from './subcomponents/ImagePick'
import axios from "axios";
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const Stack = createStackNavigator();

export default class PostingsApp extends Component {

  constructor(props) {

    super(props);
    this.state = {
      postings: [],
      freshPostings: [],
      singlePosting: null,
      selectedPosting: null,
      searchedPostings : []
    }    
  }

  componentDidMount() {
    // console.log('getting postings for..' + this.props.user_id);
    // console.log('with jwt..' + this.props.jwt);
    
    // axios.get(this.props.apiURI + '/postings/user/' + this.props.user_id, {
    //   headers: {
    //    'Authorization': 'Bearer ' + this.props.jwt
    //   }
    // })
    // .then(response => {
    //   if (response.status != 200) {
    //     throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
    //   }
    //   console.log(response.data);
    //   this.setState({ postings: response.data.postings})
    // })
    // .catch(error => {
    //   console.log("Error message:")
    //   console.log(error.message)
    // });
    this.getPostings();
    this.getFreshPostings();
  }

  
  //get user postings
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
      this.setState({ searchedPostings: response.data.postings})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }    

  //get postings with query params

  searchPostings = (location , category) =>
{
  console.log('location: ' + location);
console.log('category: ' + category);
  axios.get(this.props.apiURI + '/postings/search/', { params: { location: location, category : category} })
  .then(response => {
    if (response.status != 200) {
      throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
    }
    this.setState({searchedPostings: response.data.postings})
    console.log(response.data)
  
})
.catch(error => {
  console.log("Error message:")
  console.log(error.message)
});
}
  

  viewDetailedView = (posting_id) => {
    axios.get(this.props.apiURI + '/postings/' + posting_id)
    .then(response => {
      if (response.status != 200) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      this.setState({selectedPosting: response.data})
      console.log(response.data)
      this.props.navigation.navigate('DetailedView');
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
          { props => <MyPostings {...props} postings={ this.state.postings } viewDetailedView={this.viewDetailedView}/>}
        </Stack.Screen>

        <Stack.Screen name="SearchPostings" options={{ title: 'Browse Postings' }} >    
          {/* { props => <MyPostings {...props} postings={ this.state.postings } onPostingCreate={ this.onPostingCreate }/>} */}
          { props => <SearchPostings {...props} postings={ this.state.searchedPostings } searchPostings={this.searchPostings} viewDetailedView={this.viewDetailedView}/>}
        </Stack.Screen>

        <Stack.Screen name="DetailedView" options={{ title: 'Posting Details' }} >    
          {/* { props => <MyPostings {...props} postings={ this.state.postings } onPostingCreate={ this.onPostingCreate }/>} */}
          { props => <DetailedView {...props} jwt={this.props.jwt} apiURI={this.props.apiURI} posting={this.state.selectedPosting}/>}
        </Stack.Screen>

        <Stack.Screen name="ImagePick" options={{ title: 'Posting Details' }} >    
          {/* { props => <MyPostings {...props} postings={ this.state.postings } onPostingCreate={ this.onPostingCreate }/>} */}
          { props => <ImagePick {...props} />}
        </Stack.Screen>


        <Stack.Screen name="CreatePosting" options={{ title: 'Create a posting' }} >    
          {/* { props => <MyPostings {...props} postings={ this.state.postings } onPostingCreate={ this.onPostingCreate }/>} */}
          { props => <CreatePosting {...props} onPostingCreate={ this.onPostingCreate }/>}
        </Stack.Screen>
        
      </Stack.Navigator>
    )
  }
}

