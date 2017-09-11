import React from 'react';
import { Text,
  Image,
  View,
  StyleSheet,
  Animated,
  Easing, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import Events from 'react-native-simple-events';

export class ChompMenu extends React.Component {
     state = {
        openWide: new Animated.Value(0),  // Initial value for opacity: 0
    
     }
 componentDidMount() { Events.on('Mouth','chompMenu', this.mouthState.bind(this)) }
    
 componentWillUnmount() { Events.rm('Mouth','chompMenu') }

  mouthState(data){
    console.log('menu recieves:' + data.mouthOpen)
    if(data.mouthOpen){
      this.openMouth();
    }
    else{
    this.closeMouth();
    }
  }

  openMouth(){
    
     Animated.timing(                  // Animate over time
      this.state.openWide,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000, 
        Easing: Easing.linear             // Make it take a while
      }
    ).start();
  }

  closeMouth(){
     Animated.timing(                  // Animate over time
      this.state.openWide,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 500, 
        Easing: Easing.linear             // Make it take a while
      }
    ).start();
  }



  render() {
    return (
      <View style={styles.container}>
      <View
        {...this.props}
        style={styles.mouthTop}
      >
        <View style={[styles.upperTooth,{left:7}]}>
        </View>
         <View style={[styles.upperTooth,{left:50}]}>
        </View>
          <View style={[styles.upperTooth,{right:7}]}>
        </View>
         <View style={[styles.upperTooth,{right:50}]}>
        </View>
      </View>

        <Animated.View style={[styles.mouthBottom,{marginTop:this.state.openWide.interpolate({
           inputRange: [0, 1],
           outputRange: [-220, 0],
          }),
          height:this.state.openWide.interpolate({
           inputRange: [0, 1],
           outputRange: [230, 260],
          })
           }]}>

            <TouchableOpacity onPress={this.props.addFriends}>
            <View style={styles.menuItem}><Image source={require('../assets/images/friends.png')} /><Text style={styles.menuItemText}>Friends</Text></View>
           </TouchableOpacity>

            <View style={styles.menuItem}><Image source={require('../assets/images/channels.png')} /><Text style={styles.menuItemText}>Channels</Text></View>
            <View style={styles.menuItem}><Image source={require('../assets/images/mute.png')} /><Text style={styles.menuItemText}>Mute</Text></View>
            
            <TouchableOpacity onPress={this.props.signOut}><View style={styles.menuItem}>
              <Image source={require('../assets/images/signout.png')} /><Text style={styles.menuItemText}>Sign Out</Text>
             
            </View>
             </TouchableOpacity>

          <Animated.View style={[styles.bottomTooth,{left:23} ]}/>
          <Animated.View style={[styles.bottomTooth,{left:65}]}/>
          <Animated.View style={[styles.bottomTooth,{right:23}]}/>
          <Animated.View style={[styles.bottomTooth,{right:65}]}/>


        </Animated.View>
   
      </View>
    );
  }
}
const styles = StyleSheet.create({
   container: {
    width: Layout.width,
    height: Layout.height,
    position:'absolute',
    top:100,
    zIndex:-999,
    flex:1
  },
  menuItemText:{
    fontSize:40,
    fontWeight:'bold',
    color:Colors.secondaryColor,
    marginLeft:20
  },
  menuItem:{
    backgroundColor:'transparent',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    zIndex:60
  },
  mouthTop: {
    backgroundColor:'white',
    left:0,
    width: Layout.window.width,
    height: 0,
    borderTopWidth:5,
    borderTopColor: Colors.secondaryColor,
    zIndex:50,
    position:'absolute',
  },
    mouthBottom: {
    position:'absolute',
    marginTop: -160,
    height:400,
    width: Layout.window.width,
    borderBottomWidth:5,
    borderBottomColor: Colors.secondaryColor,
    alignItems:'flex-start',
    paddingLeft:50,
    paddingTop:30,
    paddingBottom:30,
    zIndex:-2000,
    backgroundColor:Colors.primaryColor
,
  },
  upperTooth:{
    position:'absolute',
    borderTopWidth:5,
    borderTopColor: Colors.secondaryColor,
    borderLeftWidth:5,
    borderLeftColor: Colors.secondaryColor,
    width:25,
    height:25,
    top:-12,
    transform:[
       {scaleY:1.5},
      {rotate:'225deg'},
     
    ]
  },
    bottomTooth:{
    position:'absolute',
    borderTopWidth:5,
    borderTopColor: Colors.secondaryColor,
    borderLeftWidth:5,
    borderLeftColor: Colors.secondaryColor,
    width:25,
    height:25,
    bottom:-12,
    transform:[
       {scaleY:1.5},
      {rotate:'45deg'},
     
    ],
  }

});


