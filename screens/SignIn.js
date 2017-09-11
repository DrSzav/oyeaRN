// RNPasswordExample/app/SignIn.js
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View,
      TouchableOpacity, Dimensions, TextInput, ScrollView,Keyboard } from 'react-native';
import React ,{ Component } from 'react';
import { SpecialEyeball } from '../components/SpecialEyeball';
import Colors from '../constants/Colors';
import {onSignIn, onRegister, onVerify,resendConfirmation} from '../src/authentication/auth';
import Toast from 'react-native-root-toast';
const { width } = Dimensions.get('window');
const toastStyle = {
  backgroundColor:Colors.primaryColor,
  textColor:Colors.secondaryColor}


export class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forgottenPassword:false,
      email: '',
      password: '',
      username: '',
      error: null, // added this
      createAccount:false,
      signIn:true,
      verificationCode:'',
      verify:false
    };
  }


  Nevermind(){
    this.setState({forgottenPassword:false});
    this.setState({createAccount:false});
    this.setState({verify:false});
  }

  renderInputs(){
    if(this.state.forgottenPassword){
      return(
      <View style={{height:120,marginTop:40,alignItems:'center'}}>

        <View style={styles.inputView}><TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            placeholder="Email"
            placeholderTextColor={Colors.secondaryColor}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            multiline={false}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType='done'
          /></View>

      </View>
      )
    }


    if(this.state.createAccount){
    return(
  <View style={{height:120,alignItems:'center',marginTop:40}}>

    <View style={styles.inputView}><TextInput
        style={styles.input}
        onChangeText={(email) => this.setState({email})}
        placeholder="Email"
        placeholderTextColor={Colors.secondaryColor}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        multiline={false}
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType='done'
      /></View>

      <View style={styles.inputView}><TextInput
        style={styles.input}
        onChangeText={(password) => this.setState({password})}
        placeholder="Password"
        placeholderTextColor={Colors.secondaryColor}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        multiline={false}
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType='done'
      />

      <View style={styles.inputView}><TextInput
          style={styles.input}
          onChangeText={(username) => this.setState({username})}
          placeholder="Username"
          placeholderTextColor={Colors.secondaryColor}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          multiline={false}
          onSubmitEditing={Keyboard.dismiss}
          returnKeyType='done'
        /></View>

      </View>


      </View>
    );
  }

   if(this.state.verify){
    return(
      <View style={{height:120,alignItems:'center',marginTop:40}}>
        <View style={styles.inputView}><TextInput
            key={'verify'}
            style={styles.input}
            onChangeText={(username) => this.setState({username})}
            placeholder="username"
             placeholderTextColor={Colors.secondaryColor}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            multiline={false}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType='done'
          /></View>
          <View style={styles.inputView}><TextInput
            style={styles.input}
            onChangeText={(verificationCode) => this.setState({verificationCode})}
            placeholder="Code..."
            placeholderTextColor={Colors.secondaryColor}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            multiline={false}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType='done'
            keyboardType="numeric"
          /></View>
          </View>
    )

  }

  if(this.state.signIn){
    return(
      <View style={{height:120,alignItems:'center',marginTop:40}}>
        <View style={styles.inputView}><TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            placeholder="Email"
             placeholderTextColor={Colors.secondaryColor}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            multiline={false}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType='done'
          /></View>
          <View style={styles.inputView}><TextInput
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            placeholder="Password"
             placeholderTextColor={Colors.secondaryColor}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            multiline={false}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType='done'
          /></View>
          </View>
    )

  }

  




  }

  renderUsernameInput(){
    if(this.state.createAccount){
    return(
    <View style={styles.inputView}><TextInput
        style={styles.input}
        onChangeText={(username) => this.setState({username})}
        placeholder="username"
        placeholderTextColor={Colors.secondaryColor}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType='done'
      /></View>
    )
  }
  }

  resetPassword(){
      const {email}  = this.state;
      Accounts.forgotPassword( {email},this.resetPasswordCallback.bind(this) );
  }

  renderButtons(){

    if(this.state.forgottenPassword){
      return(
      <View style={{height:270,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     
      <View style={{flex:3}}>

      <TouchableOpacity style={styles.button} onPress={this.Nevermind.bind(this)}>
          <Text style={styles.buttonText}>Never Mind</Text>
        </TouchableOpacity>
      </View>

    
      <View style={{flex:3}}>
      <TouchableOpacity style={styles.button} onPress={this.resetPassword.bind(this)}>
        <Text style={styles.buttonText}>Email Me</Text>
      </TouchableOpacity>



      </View>
     
      </View>
    )}
    if(this.state.createAccount){
      return(
      <View style={{height:270,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <View style={{flex:3}}>
      <TouchableOpacity style={styles.button} onPress={this.onCreateAccount.bind(this)}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      </View>
      <View style={{flex:3}}>
      <TouchableOpacity style={styles.button} onPress={this.Nevermind.bind(this)}>
          <Text style={styles.buttonText}>Never Mind</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
    }
   if(this.state.verify){
      return(
      <View style={{height:330,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <View style={{flex:3}}>
      <TouchableOpacity style={styles.button} onPress={this.verifyCode.bind(this)}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      </View>
         <View style={{flex:3}}>
      <TouchableOpacity style={styles.button} onPress={this.Nevermind.bind(this)}>
        <Text style={styles.buttonText}>Never Mind</Text>
      </TouchableOpacity>
      </View>
      <View style={{flex:3}}>
      <TouchableOpacity style={styles.button} onPress={this.resendCode.bind(this)}>
        <Text style={styles.buttonText}>Resend Code</Text>
      </TouchableOpacity>
      </View>
      </View>
    )
    }
    return(
    <View style={{height:270,flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
    
      <View style={{flex:3}}>
      <TouchableOpacity style={styles.button} onPress={this.SignIn.bind(this)}>
          <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>

      <View style={{flex:3}}>
        <TouchableOpacity style={styles.button} onPress={this.onCreateAccount.bind(this)}>
          <Text style={styles.buttonText}>New Account</Text>
        </TouchableOpacity>
      </View>
   
  
  
    </View>
    )
  }

  isValid() {
    const { email, password, username } = this.state;
    let valid = false;

    if (email.length > 3 && password.length > 3) {
      valid = true;
    }

    if (email.length === 0) {
      Toast.show('You must enter an email address',toastStyle);
    } else if (password.length === 0) {
      Toast.show('You must enter a password',toastStyle);
    }

    return valid;
  }

  resendCode(){
    resendConfirmation(this.state.username,this.resendCallback());
  }

  resendCallback(){

  }

  SignIn() {
     const { email, password } = this.state;
    onSignIn(this.state.email, this.state.password, (err) => {
          if(err) {
              this.setState({loading:false, 'error': err.message}, () => {
               Toast.show(err.message);  
              });
          } else {
              this.props.signedIn(true);
          }
      });
   }

   signInCallback(error){

       if (error) {
         if(error.reason){
           Toast.show(error.reason);
         }
       }
       else{
         this.props.signIn();
       }

   }

   forgottenPassword(){
      this.setState({forgottenPassword:true});
   }

   resetPasswordCallback(e){
     if (e) {
         Toast.show(e.reason);
     } else {
       Toast.show('email sent');
       this.setState({forgottenPassword:false});
     }
   }

   onCreateAccount() {
      if(!this.state.createAccount){
        this.setState({createAccount:true});
        return;
      }

    const { email, password,username } = this.state;

     if (this.isValid()) {
       onRegister( email, password,username ,this.createUserCallback.bind(this));
     }
   }

   createUserCallback(error){
      //Toast.show('callback hit');
      if(error){
          Toast.show(error.message); 
      }
      else{
        this.switchToVerify();
      }
   }

  switchToVerify(){
    this.setState({verify:true});
  }

  verifyCode(){
    onVerify(this.state.username, this.state.verificationCode, (err) => {
          if (err) {
              this.setState({loading:false, 'error': err.message}, () => {
                  this.render();
              });
          } else {
             
          }
      });
  }

  render() {


  let forgotPassword = this.state.forgottenPassword ? null : 
      <TouchableOpacity style={styles.forgottenPasswordButton} onPress={this.forgottenPassword.bind(this)}>
        <Text style={styles.forgottenPasswordText}>I forgot my password...</Text>
      </TouchableOpacity>
      ;
  let verify = (this.state.forgottenPassword || this.state.createAccount)? null : 
      <TouchableOpacity style={styles.verifyEmailButton} onPress={this.switchToVerify.bind(this)}>
        <Text style={styles.forgottenPasswordText}>Verify Email</Text>
      </TouchableOpacity>
      ;
  return (
    <KeyboardAwareScrollView style={styles.container} >
    
    <View style={{flexDirection:'column'}}>

      <View style={{flexDirection:'row',height:80,alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.headingStyle}>Oyea</Text>
        {/*<View style={styles.diamond}></View> */}
        <SpecialEyeball/>
      </View>

    {this.renderInputs()}
    {this.renderButtons()}

    </View>
  
      {forgotPassword}
      {verify}
    
  </KeyboardAwareScrollView>
  )
  }
}


const ELEMENT_WIDTH = width - 40;
const styles = StyleSheet.create({
  container: {
    
    backgroundColor: Colors.primaryColor,
    
    height:Dimensions.get('window').height,
  },

headingStyle:{
  fontSize:50,
  fontWeight:'bold',
  color:Colors.secondaryColor,
  margin:10}
,
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
   
  forgottenPasswordButton:{
      position:'relative',
      marginTop:10,
      alignSelf:'center',
      zIndex:999999,
     // backgroundColor: 'black',
      padding: 10,
      margin:10
  },
      verifyEmailButton:{
      position:'relative',
      marginTop:10,
      alignSelf:'center',
      zIndex:999999,
     // backgroundColor: 'black',
      padding: 10,
      margin:10
  },
  forgottenPasswordText:{
      color:Colors.secondaryColor,
      marginTop:0,
      textDecorationLine:'underline'
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