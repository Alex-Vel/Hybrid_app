import React, { useState } from 'react'
import { View, Text, TextInput, TouchableHighlight, Button, StyleSheet } from 'react-native'
import { Base64 } from 'js-base64'


const LoginScreen = (props) => {
  const [userName, setUserName] = useState("Tester2");
  const [password, setPassword] = useState("password123");

  function loginClick() {
    fetch(props.apiURI + '/users/login', {
      method: 'GET',
      headers: {
        "Authorization": "Basic " + Base64.encode(userName + ":" + password)
      }
    })
    .then(response => {
      if (response.ok == false) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      return response.json();
    })
    .then(json => {
      console.log("Login successful")
      console.log("Received following JSON");
      console.log(json);
      props.onLoginReceiveJWT(json.jwt);
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }

  return (
    <View style={ styles.screen }>
      <Text style={ styles.header }>User Login</Text>
      <Text style={ styles.text }>Username</Text>
      <TextInput
        style={ styles.input }
        value={ userName }
        placeholder="johndoe"
        onChangeText={ value => setUserName(value)}
      />
      <Text style={ styles.text }>Password</Text>
      <TextInput
        style={ styles.input }
        value={ password }
        placeholder="password"
        onChangeText={ value => setPassword(value)}
      />
      <TouchableHighlight style={{borderRadius:20}} onPress={ () => loginClick() }>
        <View style={ styles.primaryButton }>
          <Text style={ styles.primaryButtonText }>Login</Text>
        </View>
      </TouchableHighlight>
  
      <TouchableHighlight style={{borderRadius:20}}onPress={ () => props.navigation.navigate('Signup') }>
        <View style={ styles.secondaryButton }>
          <Text style={ styles.primaryButtonText }>Signup</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgb(51, 153, 255)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
    marginBottom: 20,
    color: 'white'
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20
  },
  primaryButton: {
    backgroundColor: 'rgb(0, 153, 51)',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,

    borderRadius:20
  },
  secondaryButton: {
    backgroundColor: 'rgb(153, 51, 51)',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,

    borderRadius:20
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});

export default LoginScreen
