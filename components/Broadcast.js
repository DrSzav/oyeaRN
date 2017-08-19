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
export class Broadcast extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      broadcastList: ""
    }
    this.OyeaAudio = new OyeaAudio();
  }

  componentDidMount() { Events.on('selectedList','broadcast', this.updateList.bind(this)) }

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
            onPressIn={this.startRecording.bind(this)}
            onPressOut={this.stopRecording.bind(this)}
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
