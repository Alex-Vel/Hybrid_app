import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AppConsole from './subcomponents/AppConsole'
import MyPostings from './subcomponents/MyPostings'
import CreatePosting from './subcomponents/CreatePosting'
import SearchPostings from './subcomponents/SearchPostings'
import DetailedView from './subcomponents/DetailedView'
import ImagePick from './subcomponents/ImagePick'
import EditPosting from './subcomponents/EditPosting'
import DeletePosting from './subcomponents/DeletePosting'
import PublicDetailedView from './subcomponents/PublicDetailedView'

import axios from "axios";
import { get } from 'react-native/Libraries/Utilities/PixelRatio'
import jwt_decode from 'jwt-decode';

const Stack = createStackNavigator();

export default class PostingsApp extends Component {

  constructor(props) {

    super(props);
    this.state = {
      postings: [],
      freshPostings: [],
      singlePosting: null,
      selectedPosting: null,
      searchedPostings : [],
      allPostings: []
    }    
  }

  componentDidMount() {
    //check if token is valid
    this.checkToken();
    //get user postings
    this.getPostings();
    //get new postings

  }

  //check if jwt is still valid
  checkToken()
  {
    var decoded = jwt_decode(this.props.jwt);
      if (Date.now() >= decoded.exp * 1000) 
      {
        alert("session expired, login again");
        this.props.onLogout();
      }
    

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

  //get user postings
  getPostings = () => {
    console.log('getting postings for..' + this.props.user_id);
    axios.get(this.props.apiURI + '/postings/user/' + this.props.user_id, {
      headers: {
       'Authorization': 'Bearer ' + this.props.jwt
      }
    })
    .then(response => {
      if (response.status != 200 && response.status != 304) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      console.log(response.data);
      this.setState({ postings: response.data.postings})
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
      this.setState({ postings: []})
    });
  }

  //get postings by creation date
  getFreshPostings = () =>
  {
    console.log('getting fresh postings');
    axios.get(this.props.apiURI + '/postings/fresh')
    .then(response => {
      if (response.status != 200 && response.status != 304) {
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

  //delete posting
  deletePosting = (posting_id) =>
  {
    console.log('Deleting posting.. ' + posting_id);
    axios.delete(this.props.apiURI + '/postings/' + posting_id,{ 
    headers: {
      "Authorization": "Bearer " + this.props.jwt,
     }
    })
    .then(response => {
      if (response.status != 200) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      else{
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "AppConsole" }],
        })
      this.props.navigation.navigate("MyPostings")
      }
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }    

  //edit posting

  editPosting = (posting_id, title, description, location, category, price, shipping_method) => {
    price = parseFloat(price);
    let posting_config = {};

    axios.put(this.props.apiURI + '/postings/' + posting_id,{
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
      if (response.status != 200) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      else{
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "AppConsole" }],
        })
      this.props.navigation.navigate("MyPostings")
      }
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

viewEditView = (posting_id) => {
  axios.get(this.props.apiURI + '/postings/' + posting_id)
  .then(response => {
    if (response.status != 200) {
      throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
    }
    this.setState({selectedPosting: response.data})
    console.log(response.data)
    
    this.props.navigation.navigate('EditPosting');
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
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "AppConsole" }],
      })
      this.props.navigation.navigate("MyPostings")
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

        <Stack.Screen name="AppConsole" options={{ title: 'Application Home' }} >
          { props => <AppConsole {...props} onLogout={ this.props.onLogout }/>}
        </Stack.Screen>

        <Stack.Screen name="MyPostings" options={{ title: 'My Postings' }} >    
          { props => <MyPostings {...props} postings={ this.state.postings }  getPostings={this.getPostings} viewDetailedView={this.viewDetailedView}/>}
        </Stack.Screen>

        <Stack.Screen name="SearchPostings" options={{ title: 'Browse Postings' }} >    
          { props => <SearchPostings {...props} postings={ this.state.searchedPostings } 
          getFreshPostings={this.getFreshPostings} freshPostings={this.state.freshPostings}
          getAllPostings={this.getAllPostings} allPostings={this.state.allPostings}
          searchPostings={this.searchPostings} 
          viewDetailedView={this.viewPublicDetailedView}/>}
        </Stack.Screen>

        <Stack.Screen name="DetailedView" options={{ title: 'Posting Details' }} >    
          { props => <DetailedView {...props} jwt={this.props.jwt} getPostings={this.getPostings} apiURI={this.props.apiURI} posting={this.state.selectedPosting}/>}
        </Stack.Screen>

        <Stack.Screen name="PublicDetailedView" options={{ title: 'Posting Details' }} >    
          { props => <PublicDetailedView {...props}  posting={this.state.selectedPosting}/>}
        </Stack.Screen>

        <Stack.Screen name="ImagePick" options={{ title: 'Posting Details' }} >    
          { props => <ImagePick {...props} />}
        </Stack.Screen>

        <Stack.Screen name="EditPosting" options={{ title: 'Edit Posting' }} >    
          { props => <EditPosting {...props} jwt={this.props.jwt} getPostings={this.getPostings} onEditPosting={this.editPosting} apiURI={this.props.apiURI} posting={this.state.selectedPosting}/>}
        </Stack.Screen>

        <Stack.Screen name="DeletePosting" options={{ title: 'Delete the Posting' }} >    
          { props => <DeletePosting {...props} jwt={this.props.jwt} getPostings={this.getPostings} onDeletePosting={this.deletePosting} apiURI={this.props.apiURI} posting={this.state.selectedPosting}/>}
        </Stack.Screen>

        <Stack.Screen name="CreatePosting" options={{ title: 'Create a posting' }} >    
          { props => <CreatePosting {...props} onPostingCreate={ this.onPostingCreate }/>}
        </Stack.Screen>
        
      </Stack.Navigator>
    )
  }
}

