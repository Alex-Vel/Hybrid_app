import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const View1 = (props) => {
  return (
    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 50, fontWeight: '700' }}>Application content</Text>
      <Text>You have successfully logged in</Text>
      <Button
      style={styles.Button}
        title="Go to my postings"
        onPress={() => props.navigation.navigate('MyPostings')}
      />
      <Button
      style={styles.Button}
        title="Create a posting"
        onPress={() => props.navigation.navigate('CreatePosting')}
      />
        <Button
        style={styles.Button}
        title="Look for postings"
        onPress={() => props.navigation.navigate('SearchPostings')}
      />
      <Button
      style={styles.Button}
        title="Logout"
        onPress={ props.onLogout }
      />
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
    Button: {
    backgroundColor: 'rgb(0, 153, 51)',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10,
    color:"red"
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});

export default View1

