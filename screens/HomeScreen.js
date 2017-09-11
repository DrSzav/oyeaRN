import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
//import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { SpecialEyeball } from '../components/SpecialEyeball';
import { ChompMenu } from '../components/ChompMenu';
import { PlayerList } from '../components/PlayerList';
import { Broadcast } from '../components/Broadcast';
import {isSignedIn} from '../src/authentication/auth';
import {SignIn} from '../screens/SignIn';
import {FriendManager} from '../screens/FriendManager'
import utils from '../src/utils';
import Events from 'react-native-simple-events';

export default class HomeScreen extends React.Component {

  constructor(){
      super();
      this.state = {ready: false,signedIn:false, mouthOpen: false}
  }

  componentDidMount(){
      StatusBar.setHidden(true);

        isSignedIn((err, result) => {
            this.setState({signedIn: result, ready: true});
            console.log('IssignedIn' + result);
            console.log(err);
        })
  }

  signedIn(value){
    this.setState({signedIn:value});
    console.log('signedIn' + value);
  }

  signOut(){
    utils.removeEmailUserID(() => {
      console.log('user credentials cleared');   
    });
    this.setState({signedIn:false});
  }

  back(){
    this.setState({addFriends:false});
  }

  addFriends(){
    this.setState({addFriends:true});
    this.setState({mouthOpen:false});
    Events.trigger('Mouth', {mouthOpen:false});
  }

  openMenu(){
    if(this.state.mouthOpen){
        this.setState({mouthOpen:false});
        Events.trigger('Mouth', {mouthOpen:false});
    }
    else{
        this.setState({mouthOpen:true});
        Events.trigger('Mouth', {mouthOpen:true});
    }
  }

  render() {
    if(this.state.signedIn){
   
    
       if(this.state.addFriends){
        return (
          <View style={styles.container}>
          <TouchableOpacity onPress={this.back.bind(this)}>
          <SpecialEyeball/>
          <ChompMenu signOut={this.signOut.bind(this)}/>
          </TouchableOpacity>
          <FriendManager userID={this.state.signedIn}/> 
          </View>
         );
      }

      return (
      <View style={styles.container}>
          <TouchableOpacity onPress={this.openMenu.bind(this)}>
            <SpecialEyeball/>
            <ChompMenu 
              signOut={this.signOut.bind(this)}
              addFriends={this.addFriends.bind(this)}
              />
          </TouchableOpacity>
          <PlayerList/>
          <Broadcast/>
      </View>
      );

    }
  else{
     return (
     <SignIn signedIn={this.signedIn.bind(this)}/> 
    );
  }
  
  }


}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.Width,
    height: Layout.window.height,
    backgroundColor:Colors.primaryColor,
    flex:1
  },
  
  contentContainer: {
    paddingTop: 30,
    backgroundColor: Colors.primaryColor,
  },
  
});
