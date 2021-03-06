import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'


export default class ImagePick extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isSubmitting: false,
      apiURI : this.props.apiURI
    }
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if(pickerResult.cancelled)
    {
      alert('Image picker cancelled or failed');
      return;
    }

    const fileNameSplit = pickerResult.uri.split('/');
    const fileName = fileNameSplit[fileNameSplit.length - 1];

    let postForm = new FormData();
    postForm.append('images', {
      uri: pickerResult.uri,
      name: fileName,
      type: 'image/jpeg'
    });
   // postForm.append('foo', 'bar');
    this.setState({ isSubmitting: true })
console.log(this.props.apiURI);
console.log(this.props.jwt);
console.log(this.props.posting.posting_id);

    axios.post( this.props.apiURI + "/postings/images/" + this.props.posting.posting_id,
        postForm,{
        headers: { 
        'Content-Type': `multipart/form-data; boundary=${postForm._boundary}`,
        "Authorization": "Bearer " + this.props.jwt,
    }})      
      .then(response => {
        //success
        alert("Image upload completed");
        this.setState({ isSubmitting: false })
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "AppConsole" }],
        })
        this.props.navigation.navigate("MyPostings");
    })
    .catch(response => {
        //handle error
        console.log(response);
        alert("Image upload failed");
        this.setState({ isSubmitting: false })
    });
}


  render() {
    return (
      <View>
   
        { this.state.isSubmitting ? <ActivityIndicator /> :
          <TouchableOpacity onPress={this.openImagePickerAsync} style={{ borderWidth: 1, borderColor: 'black', padding: 5}}>
          <Text>Choose a photo to upload to this posting</Text>
        </TouchableOpacity>
        }

      </View>
    )
  }
}
