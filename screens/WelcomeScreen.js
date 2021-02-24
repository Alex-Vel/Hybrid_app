import React, { Component } from "react";
import { Button, View, Text,  ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import jwt_decode from 'jwt-decode';
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import SignUpCompleted from "./components/SignUpCompleted";
import LoadingScreen from "./components/LoadingScreen";
import PostingsApp from "./components/PostingsApp";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const Stack = createStackNavigator();
const secureStoreTokenName = "emptyToken";
const secureUserId = "emptyid";


export default class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCheckingTokenStorage: true,
      activeJWT: null,
      apiURI: props.apiURI,
      user_id: null,
    };
  }


  // componentDidMount() {
  //   // Check for stored JWT when the application loads
  //   SecureStore.getItemAsync(secureStoreTokenName)
  //     .then(response => {
  //       console.log(response);
  //       if(response != "emptyToken" && response != null){
  //       console.log("SecureStore get jwt success") 
  //       var decoded = jwt_decode(response);
  //       console.log(decoded.iat * 1000);
  //       console.log(decoded.exp * 1000);
  //       console.log(Date.now());
  //       if (Date.now() >= decoded.exp * 1000) {
  //         this.setState({  isCheckingTokenStorage: false })
  //       }
  //       else
  //       {
  //       console.log("setting user info with"+ decoded.user.id);
  //       this.setState({user_id: decoded.user.id })        
  //       this.setState({ activeJWT: response, isCheckingTokenStorage: false })
  //       }
  //     }})
  //     .catch(error => {
  //       console.log("SecureStore.getItemAsync error")
  //       console.log(error);
  //     });
  // } 
  componentDidMount() {
    // Check for stored JWT when the application loads
    SecureStore.getItemAsync(secureStoreTokenName)
      .then(response => {
        console.log("SecureStore.getItemAsync success") 
        if(response != null){

          var decoded = jwt_decode(response);
          console.log(decoded.iat * 1000);
          console.log(decoded.exp * 1000);
          console.log(Date.now());
            if (Date.now() <= decoded.exp * 1000) {
            console.log("setting user info with"+ decoded.user.id); 
            this.setState({ activeJWT: response, isCheckingTokenStorage: false,user_id: decoded.user.id  })
            }
            this.setState({isCheckingTokenStorage: false })
        }    
  
      })
      .catch(error => {
        console.log("SecureStore.getItemAsync error")
        console.log(error);
      });
  }


  
  onLoginReceiveJWT = (responseJWT) => {
    // Deal with successful login by storing the token into secure store
    SecureStore.setItemAsync(secureStoreTokenName, responseJWT)
      .then(response => {
        console.log(response);
        var decoded = jwt_decode(responseJWT);
        console.log(decoded);
        this.setState({ activeJWT: responseJWT, isCheckingTokenStorage: false, user_id: decoded.user.id })
        console.log("user id is..");
        console.log(decoded.user.id);
      })    


  }

  setUserId = (jwt) =>
  {
    var decoded = jwt_decode(jwt);
    console.log("setting user info with"+ decoded.user.id);
    this.setState({user_id: decoded.user.id })
  }

  authLogic = () => {

    const checkingForTokenStorage = (
      <Stack.Screen name="Loading" component={LoadingScreen} />
    )


    const authScreens = (
      <>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
        >
          { props => <LoginScreen {...props} onLoginReceiveJWT={ this.onLoginReceiveJWT } apiURI={ this.props.apiURI }></LoginScreen> }
        </Stack.Screen>
        <Stack.Screen
          name="Signup"
          options={{
            headerShown: false,
          }}
        >
          { props => <SignUpScreen {...props} apiURI={ this.props.apiURI }></SignUpScreen>}
        </Stack.Screen>
        <Stack.Screen
          name="SignupCompleted"
          options={{
            headerShown: false,
          }}
        >
          { props => <SignUpCompleted {...props}></SignUpCompleted>}
        </Stack.Screen>
      </>
    );

    const app = (
      <Stack.Screen 
        name="PostingsApp" 
        options={{
          headerShown: false,
        }}>
          { props => <PostingsApp 
                        {...props} 
                        jwt={ this.state.activeJWT } 
                        apiURI={ this.props.apiURI }
                        onLogout={ this.onLogout }
                        user_id={this.state.user_id}
                      ></PostingsApp>}
      </Stack.Screen>
    )

    if(this.state.isCheckingTokenStorage)
    {
      console.log('Checking is token stored');

      return checkingForTokenStorage;
    }
    else
    {
      if(this.state.activeJWT != null)
      {
        console.log('JWT Token found, displaying application logged in views');
        console.log(this.state.activeJWT);
        return app;
      }
      else
      {
        console.log('JWT Token not found, displaying application authentication views');
        return authScreens;
      }
    }
 
  }

  onLogout = () => {
    console.log("Logout clicked");
    this.setState({ activeJWT: null });
    SecureStore.deleteItemAsync(secureStoreTokenName);
   
  }

  render() {
    return (
      <View style={{ flex: 1}}>
   
          <Stack.Navigator>
            { this.authLogic() }
          </Stack.Navigator>
  
      </View>
    )
  }
}
