// RNPasswordExample/app/SignIn.js
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View,
      TouchableOpacity, Dimensions, TextInput, ScrollView,Keyboard } from 'react-native';
import React ,{ Component } from 'react';
import { SpecialEyeball } from '../components/SpecialEyeball';
import Colors from '../constants/Colors';
import {getSession} from '../src/authentication/auth';
import Toast from 'react-native-root-toast';
import Layout from '../constants/Layout';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Config from '../awsconfiguration.json';



const { width } = Dimensions.get('window');
const toastStyle = {
  backgroundColor:Colors.primaryColor,
  textColor:Colors.secondaryColor}

export class FriendManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    getSession(this.getSessionCallback.bind(this))
  }



getSessionCallback(err,result){
  if(err){
    console.log('err:' + err);
  }
  else{
    this.sessionToken = result.getIdToken().getJwtToken();
  }

}
// Make the call to obtain credentials
   // AWS.config.loadFromPath('./awsconfiguration.json');
   // console.log(Config)



  addFriend(){
  

    var myCredentials = new AWS.CognitoIdentityCredentials(Config.CredentialsProvider.CognitoIdentity);
    
    var myConfig = new AWS.Config(Config);
    myConfig.update({accessKeyId: 'anything', secretAccessKey: 'anything'})
    
    myConfig.update({sessionToken: myCredentials});
    ddb = new AWS.DynamoDB(myConfig);
    
    var params = {
      TableName: 'Friends',
      Item: {
        'userId' : {S: '001'},
        'CUSTOMER_NAME' : {S: 'Richard Roe'},
      }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }


  render() {

  return (
    <KeyboardAwareScrollView style={styles.container} >
    
   

      <View style={{flexDirection:'column',height:Layout.height,alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.headingStyle}>Friends</Text>
        
       <View style={styles.inputView}><TextInput
        style={styles.input}
        onChangeText={(username) => this.setState({username})}
        placeholder="add user"
        placeholderTextColor={Colors.secondaryColor}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType='done'
      /></View>

        <TouchableOpacity style={styles.button} onPress={this.addFriend.bind(this)}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>
        {/*<View style={styles.diamond}></View> */}
      </View>
    
  </KeyboardAwareScrollView>
  )
  }
}


const ELEMENT_WIDTH = width - 40;
const styles = StyleSheet.create({
  container: {
    height: Layout.height,
    //position:'absolute',
    top:105,
    flex:1,
    zIndex:-99999
  },

headingStyle:{
  fontSize:50,
  fontWeight:'bold',
  color:Colors.secondaryColor,
  margin:10}
,
regStyle:{
  fontSize:20,
  fontWeight:'bold',
  color:Colors.secondaryColor,
  margin:10}
,


    button:{
    backgroundColor: Colors.primaryColor,
  
    borderColor: Colors.secondaryColor,
    borderWidth: 3,
    padding: 20,
    alignItems: 'center',
    justifyContent:'center',
    width:120,
    height:120,
    borderRadius:100,
    marginTop:20,
    margin:20
  },
    input: {
    height:35,
    width: 250,
    fontSize: 20,

    color:Colors.secondaryColor,
    //padding: 10,
  //  backgroundColor: '#FFFFFF',
    borderColor: '#888888',

  //  marginTop: 2,
    //marginBottom: 2,
    textAlign:'center',
     },
   
  inputView:{

    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 3,

    height:35
  },

  buttonText: {
  //  height:30,
    color:  Colors.secondaryColor,
    fontWeight: '800',
    fontSize: 16,
    textAlign:'center'
    //textDecorationLine:'underline'

  },

});