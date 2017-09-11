import React from 'react';
import { Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Easing } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Constants from '../constants/Constants';
import Events from 'react-native-simple-events';
import {OyeaAudio} from '../src/oyeaAudio.js';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';


export class Broadcast extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      broadcastList: "",
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
    }
   
  }

  async _record(){
    this.setState({recording: true});
    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }
  
  componentDidMount() { 
    Events.on('selectedList','broadcast', this.updateList.bind(this))
    prepareRecordingPath(this.state.audioPath);
  }

  componentWillUnmount() { Events.rm('selectedList','broadcast') }




   updateList(data){
    console.log('selected frends:' + data.friends);
    this.setState({broadcastList:data.friends});
  }

  startRecording(){
    this.OyeaAudio._stopPlaybackAndBeginRecording();
  }

  stopRecording(){
    this.OyeaAudio._stopRecordingAndEnablePlayback();
  }

  render() {
    return (
      <View style={styles.container}>

          <TouchableOpacity style={styles.broadcastButton}
            onPressIn={this._record.bind(this)}
            onPressOut={this._stop.bind(this)}
          >
            <Text style={styles.broadcastButtonText}>Broadcast</Text>
          </TouchableOpacity>


        <View style={styles.recievers}>
          <ScrollView style={styles.miniScroll} contentContainerStyle={styles.miniScrollContainer}>
            <Text style={styles.recieverText}>to: {this.state.broadcastList}</Text>
          </ScrollView>
        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
   container: {
    width: Layout.window.width,
    height: 70,
    position:'absolute',
    bottom:0,
    zIndex:999,
    flex:1,
    backgroundColor:Colors.secondaryColor
  },
   miniScroll: {
    width: Layout.window.width,
    height: 65,
    width:170,
    position:'absolute',
    bottom:0,
    zIndex:999,
    flex:1,
    backgroundColor:Colors.secondaryColor
  },
  broadcastButton:{
    borderRadius:100,
    backgroundColor:Colors.primaryColor,
    width:140,
    height:140,
    marginTop: -30,
    left:10,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:5,
    borderColor:Colors.secondaryColor
  },
  broadcastButtonText:{
    fontSize:25,
    color:Colors.secondaryColor,
    fontWeight:'bold',
    marginTop:-15,
    backgroundColor:'transparent'
  },
  recievers:{
    position:'absolute',
    //backgroundColor:'blue',
    height: 70,
    width:100,

    bottom:0,
    left:150,
    zIndex:10000
  },
    recieverText:{
    color:Colors.primaryColor,
    fontSize:15,
  }

});
