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
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { SpecialEyeball } from '../components/SpecialEyeball';
import { ChompMenu } from '../components/ChompMenu';
import { PlayerList } from '../components/PlayerList';
import { Broadcast } from '../components/Broadcast';
import {isSignedIn} from '../src/authentication/auth';
import {SignIn} from '../screens/SignIn'


export default class HomeScreen extends React.Component {

  constructor(){
      super();
      this.state = {ready: false,signedIn:false}
  }

  componentDidMount(){
      StatusBar.setHidden(true);

        isSignedIn((err, result) => {
            this.setState({signedIn: result, ready: true});
            console.log(result);
            console.log(err);
        })
  }

  render() {
    if(this.state.signedIn){
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={this.openMenu}><SpecialEyeball/></TouchableOpacity>
          <ChompMenu/>
          <PlayerList/>
          <Broadcast/>
      </View>
    );
    }
  else{
     return (
     <SignIn/> 
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
