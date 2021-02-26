import React from 'react'
import { View, Text, Button } from 'react-native'

export default function DeletePosting(props) {
    return (
        <View>
            <Text>Are you Sure you want to delete the Posting?</Text>

            <View style={{flexDirection:'row', justifyContent:"space-evenly"}}>
            <Button
                    title="Yes, Delete posting"
                      onPress={() => props.onDeletePosting(props.posting.posting_id)}
             />
                <Button
                    title="No, don't delete"
                      onPress={() => props.navigation.navigate("MyPostings")}
             />

            </View>
        </View>
    )
}
