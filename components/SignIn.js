//imports
import {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk/dist/aws-sdk-react-native';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'react-native-aws-cognito-js';

const appConfig = {
  region: 'us-west-2',
  IdentityPoolId: 'us-west-2:b7bd7e89-a641-4f85-b280-800017221401',
  UserPoolId: 'us-west-2_lKDF7ekEm',
  ClientId: 'j051p7t1oi8fsuhpprh7i9fpl',
}

//setting config
Config.region = appConfig.region;

//component:
state = {
  username: '',
  password: '',
}

login = () => {
  const { username, password } = this.state;
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const poolData = {
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId
  };
  const userPool = new CognitoUserPool(poolData);
  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: appConfig.IdentityPoolId,
        Logins: {
          [`cognito-idp.${appConfig.region}.amazonaws.com/${appConfig.UserPoolId}`]: result.getIdToken().getJwtToken()
        }
      });
      alert('Success');
      console.log(Config.credentials);
    },
    onFailure: (err) => {
      alert(err);
    },
  });
}
