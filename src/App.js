import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  state = { loggedIn: null };

  componentWillMount() {
      firebase.initializeApp({
      apiKey: 'AIzaSyD4rlMpuDsqDnMMnKEXb0OlUuaq8Wcxvg8',
      authDomain: 'authentication-a8767.firebaseapp.com',
      databaseURL: 'https://authentication-a8767.firebaseio.com',
      projectId: 'authentication-a8767',
      storageBucket: 'authentication-a8767.appspot.com',
      messagingSenderId: '890004212011'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });		
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
              <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                  Log out
                </Button>
              </CardSection>
            );
      case false:
        return <LoginForm />;
      default:
        return <View style={styles.spinnerStyle}><Spinner size="large" /></View>;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
};
export default App;
