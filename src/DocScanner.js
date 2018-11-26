/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  CameraRoll,
  Platform,
  Alert,
  ImageStore
} from 'react-native';
import Scanner from 'react-native-document-scanner';

export default class DocScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      flashEnabled: false,
      useFrontCam: false,
    };
  }

  renderDetectionType() {
    switch (this.state.lastDetectionType) {
      case 0:
        return "Correct rectangle found"
      case 1:
        return "Bad angle found";
      case 2:
        return "Rectangle too far";
      default:
        return "No rectangle detected yet";
    }
  }

  _saveImage() {
    //var Base64Code = base64Image.split("data:image/png;base64,"); //base64Image is my image base64 string
    //const dirs = RNFetchBlob.fs.dirs;
    //var path = dirs.DCIMDir + "/image.png";
    if (Platform.OS === 'android') {
      // RNFetchBlob
      //   .config({
      //     fileCache : true,
      //     appendExt : 'jpg'
      //   })
      //   .fetch('GET', image.urls.small)
      //   .then((res) => {
      //     CameraRoll.saveToCameraRoll(res.path())
      //       .then(Alert.alert('Success', 'Photo added to camera roll!'))
      //       .catch(err => console.log('err:', err))
      //   })
    } else {
      //ImageStore.getBase64ForTag(this.state.image, (base64Data) => { 
      //}, (reason) => console.error(reason))
      console.log('Converteddd')
      console.log(this.state.image)
      CameraRoll.saveToCameraRoll(`data:image/jpeg;base64,${this.state.image}`)
      //.then((res) => {
      //  console.log("saved image")
      //  console.log(res)
      //})
      .catch(err => console.log('err:', err))
      //.then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.image ?
          <Image style={{ flex: 1, width: 300, height: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.image}`}} resizeMode="contain" /> :
          <Scanner
            useBase64
            onPictureTaken={data => this.setState({ image: data.croppedImage })}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={this.state.flashEnabled}
            useFrontCam={this.state.useFrontCam}
            brightness={0.2}
            saturation={0}
            quality={0.5}
            contrast={1.2}
            onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
            detectionCountBeforeCapture={10}
            detectionRefreshRateInMS={50}
            saveInAppDocument={false}
            style={styles.scanner}
          />
        }
        {/* <Text style={styles.instructions}>
          ({this.state.stableCounter || 0} correctly formated rectangle detected
        </Text> */}
        <Text style={styles.instructions}>
          {this.renderDetectionType()}
        </Text>
        {this.state.image === null ?
          null :
          <View>
          <TouchableOpacity style={styles.newPic} onPress={() => this.setState({ image: "" })}>
            <Text>Take another picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newPic} onPress={() => this._saveImage()}>
            <Text>Save Picture!</Text>
          </TouchableOpacity>
          </View>
        }

        <TouchableOpacity style={[styles.button, styles.left]} onPress={() => this.setState({ flashEnabled: !this.state.flashEnabled })}>
          <Text>📸 Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.right]} onPress={() => this.setState({ useFrontCam: !this.state.useFrontCam })}>
          <Text>📸 Front Cam</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  newPic: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 20,
    bottom: 20,
    height: 40,
    width: 120,
    backgroundColor: '#FFF',
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scanner: {
    flex: 1,
    width: 400,
    height: 200,
    borderColor: 'orange',
    borderWidth: 1
  }
});