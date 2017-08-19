import React from 'react';
import { Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Easing } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import Events from 'react-native-simple-events';

var fakeFriends =[];
const imgIcon = require('../assets/images/play-icon.png');

for(let i = 0; i < 20; i++){
  let user = 'user' + i;
  let newMessages = i;
  let selected = false;
  fakeFriends.push({username:user,newMessages:newMessages,selected:false});
}


export class PlayerList extends React.Component {
     state = {
        openWide: new Animated.Value(0),  // Initial value for opacity: 0
        friends:fakeFriends,
     }

  selectAll(){
    let arr = this.state.friends;
    let len = arr.length;
    let list = '';
    for(let i = 0; i < len; i++){
        arr[i].selected = true;
        list = list + arr[i].username + ','
    }
    this.setState({friends:arr});
    Events.trigger('selectedList', {friends:list});
  }

  selectNone(){
    let arr = this.state.friends;
    let len = arr.length;
    for(let i = 0; i < len; i++){
        arr[i].selected = false;
    }

    this.setState({friends:arr});
    Events.trigger('selectedList', {friends:''});
  }


  
  selectItem(item){
   /// item.selected = !item.selected;
      let arr = this.state.friends;
      arr[item].selected = !arr[item].selected ;
      this.setState({friends:arr});
      let len = arr.length;
      let list = '';
        for(let i = 0; i < len; i++){
            if(arr[i].selected){
                list = list + arr[i].username + ','
            }
        }
      console.log('passing' + list);
      Events.trigger('selectedList', {friends:list});
  }

 
  renderPlayers(){

  let Arr = this.state.friends.map((current, i) => {
    let newMessages = null;
    if(current.newMessages){
      newMessages = 
      <TouchableOpacity>
        <View style={styles.playContainer}>
          <View style={current.selected ? styles.rightToothSelected : styles.rightTooth }></View>
          <Text style={ current.selected ? styles.playCountSelected : styles.playCount}>{current.newMessages}</Text>
        </View>
        </TouchableOpacity>
    } 
    return(
   
      <TouchableOpacity 
      style={ current.selected ? styles.playerBoxSelected : styles.playerBox  } 
      key={i + 'row'} onPress={this.selectItem.bind(this,i)} >
      <View  key={i + 'name'} style={styles.nameHolder}>
          <Text style={  current.selected ? styles.usernameTextSelected : styles.usernameText }>{current.username}</Text>
      </View>
       {newMessages}
      </TouchableOpacity>
     
      )
    }
  );
  return(<View>{Arr}</View>);
    //var source =
}
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <TouchableHighlight>
          <View style={styles.headerBox}>
            
          <Text style={styles.headerText}>auto play:on</Text>
          </View>
        </TouchableHighlight>

        {this.renderPlayers()}

      <View style={styles.footerBox}>
        <TouchableOpacity style={styles.footerButton} onPress={this.selectAll.bind(this)}>
        <Text style={styles.headerText}>select all</Text>
        </TouchableOpacity>


 
        <TouchableOpacity style={styles.footerButton} onPress={this.selectNone.bind(this)}>
        <Text style={styles.headerText}>clear</Text>
        </TouchableOpacity>
      </View>

     </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
   container: {
   // width: Layout.width,
     height: Layout.height,
    //position:'absolute',
    top:105,
    flex:1,
    zIndex:-99999
   
  },
  contentContainer:{
     alignItems:'center',
    // flex:1,
     paddingBottom:340,
     paddingTop:20
  },
  playContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'flex-end',
  },
  playCount:{
    fontSize:25,
    color:Colors.secondaryColor,
    width:40,
    textAlign:'center'
  },
  playCountSelected:{
    fontSize:25,
    color:Colors.primaryColor,
    width:40,
    textAlign:'center'
  },
  headerText:{
    fontSize:25,
    fontWeight:'bold',
    color:Colors.secondaryColor,
    padding:10,
    backgroundColor:'transparent'
  },
   headerBox:{
      borderWidth:2,
      borderRadius:20,
      borderColor:Colors.secondaryColor,
      marginBottom:10
  },
    footerButton:{
      borderWidth:2,
      borderRadius:20,
      borderColor:Colors.secondaryColor,
      margin:5
  },
  footerBox:{
     // borderWidth:2,
      flexDirection:'row',
      borderRadius:20,
      borderColor:Colors.secondaryColor,
      marginTop:5
  },
  playerBox:{
    borderRadius:10,
    borderWidth:2,
    width:300,
    height:50,
    borderColor:Colors.secondaryColor,
    margin:3,
    alignItems:'center',
    justifyContent:'space-between',
    flex:1,
    flexDirection:'row'
  },
  playerBoxSelected:{
    borderRadius:10,
    //borderWidth:2,
    width:300,
    height:40,
    backgroundColor:Colors.secondaryColor,
    margin:3,
    alignItems:'center',
    justifyContent:'space-between',
    flex:1,
    flexDirection:'row'
  },
  usernameText:{
    fontSize:20,
    fontWeight:'bold',
    color:Colors.secondaryColor,
    backgroundColor:'transparent',
    margin:10
  },
    usernameTextSelected:{
    fontSize:20,
    fontWeight:'bold',
    color:Colors.primaryColor,
    backgroundColor:'transparent',
    marginLeft:10
  },
   nameHolder:{
    alignItems:'center',
    justifyContent:'center'
  },
      rightTooth:{
    borderTopWidth:5,
    borderTopColor: Colors.secondaryColor,
    borderLeftWidth:5,
    borderLeftColor: Colors.secondaryColor,
    width:25,
    height:25,
    right:10,
    transform:[
       {scaleX:1.2},
      {rotate:'135deg'},
     
    ]},
        rightToothSelected:{
    borderTopWidth:5,
    borderTopColor: Colors.primaryColor,
    borderLeftWidth:5,
    borderLeftColor: Colors.primaryColor,
    width:25,
    height:25,
    right:10,
    transform:[
       {scaleX:1.2},
      {rotate:'135deg'},
     
    ],
  }
});


