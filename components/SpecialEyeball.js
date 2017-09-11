import React from 'react';
import { Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import Events from 'react-native-simple-events';

export class SpecialEyeball extends React.Component {
  state = {
    eyeX: new Animated.Value(0),  // Initial value for opacity: 0
    mouthOpen: false
  }
 componentDidMount() {
    Animated.loop(Animated.timing(                  // Animate over time
      this.state.eyeX,            // The animated value to drive
      {
        toValue: 100,                   // Animate to opacity: 1 (opaque)
        duration: 5000, 
        Easing: Easing.linear             // Make it take a while
      }
    )
    ).start();
                          // Starts the animation
  }

  eyePress() {
    if(this.state.mouthOpen){
        this.setState({mouthOpen:false});
        Events.trigger('Mouth', {mouthOpen:false});
    }
    else{
        this.setState({mouthOpen:true});
        Events.trigger('Mouth', {mouthOpen:true});
    }
    console.log(this.state.mouthOpen);
    
  }

  render() {
    return (
   
      <View {...this.props} style={styles.centerEye}>
        <View
          style={styles.eyeContainer}
        >
        
          <Animated.View style={[styles.pupil,{
          transform:[
            {translateX:
            this.state.eyeX.interpolate({
              inputRange: [0, 20,80, 100],
              outputRange: [0, -10, 10,0]
            })},
            {scaleY:  this.state.eyeX.interpolate({
              inputRange: [0, 20,50,80,100],
              outputRange: [3, 2.7, 3,2.7, 3]
              })}
            ]
          }]}>
          </Animated.View>
        
          </View>
        </View>
   
    );
  }
}
const styles = StyleSheet.create({
  centerEye:{
    position:'absolute',
    width:Layout.window.width,
    height:100,
    alignItems:'center',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primaryColor,
    zIndex:200
  },
  eyeContainer: {
    width:70,
    height:70,
    backgroundColor: Colors.secondaryColor,
    borderRadius:100,
     transform: [
      {scaleX: 1.2}
    ],
    alignItems:'center',
    justifyContent:'center',
    zIndex:200
  },
    pupil: {
    width:23,
    height:23,
    backgroundColor: Colors.primaryColor,
    borderRadius:100,
     transform: [
      
    ]
  },

});


