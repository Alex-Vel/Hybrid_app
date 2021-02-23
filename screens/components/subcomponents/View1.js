import React from 'react'
import { View, Text, Button } from 'react-native'

const View1 = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 50, fontWeight: '700' }}>Application content</Text>
      <Text>You have successfully logged in</Text>
      <Button
        title="Go to my postings"
        onPress={() => props.navigation.navigate('MyPostings')}
      />
        <Button
        title="Look for postings"
        onPress={() => props.navigation.navigate('searchPostings')}
      />
      <Button
        title="Logout"
        onPress={ props.onLogout }
      />
    </View>
  )
}

export default View1
