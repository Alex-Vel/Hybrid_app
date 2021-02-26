import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableHighlight,
} from "react-native";


const SignUpScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [location, setLocation] = useState("");

  function signupPressed() {
    if(!username || !password || !email || !birth_date || !location)
    {
      alert("please fill in all the boxes")
    }
    else
    {

    fetch(props.apiURI + "/users", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        location: location,
        birth_date: birth_date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok == false) {
          alert("Username already exists")
          // throw new Error(
          //   "HTTP Code " +
          //     response.status +
          //     " - " +
          //     JSON.stringify(response.json())
          // );
          return;
        }
        return response.json();
      })
      .then((json) => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "SignupCompleted" }],
        });
      })
      .catch((error) => {
        console.log("Error message:");
        console.log(error.message);
      });
  }
}

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Sign Up</Text>
      <Text>Please enter your username</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="username"
        onChangeText={(value) => setUsername(value)}
      />
      <Text>Please enter your email</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
      />
      <Text>Please enter your password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
      />
      <Text>Please enter your location</Text>
      <TextInput
        style={styles.input}
        value={location}
        placeholder="location"
        onChangeText={(value) => setLocation(value)}
      />
      <Text>Please enter your birth date</Text>

      <TextInput
        style={styles.input}
        value={birth_date}
        placeholder="DD-MM-YYYY"
        keyboardType = {'numeric'}
        onChangeText={(value) => setBirthDate(value)}
      />
      
      <TouchableHighlight onPress={() => signupPressed()}>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign up</Text>
        </View>
      </TouchableHighlight>


      <TouchableHighlight         onPress={() =>
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        }>
        <View style={styles.secondaryButton}>
          <Text style={styles.primaryButtonText}>Cancel</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
  
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    marginBottom: 20,
    color: "black",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    width: "90%",
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: "rgb(153, 51, 51)",
    height: 60,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius:20,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "rgb(0, 153, 51)",
    height: 60,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius:20,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default SignUpScreen;
