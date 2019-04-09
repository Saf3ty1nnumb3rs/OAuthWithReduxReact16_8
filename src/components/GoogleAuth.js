import React, { Component } from 'react';

class GoogleAuth extends Component {

  state = {
    isSignedIn: null
  };

  componentDidMount() {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId: '377297891095-k2ectsfu4impsipv1cr723lmegjboga6.apps.googleusercontent.com',
        scope: 'email'
      });
      this.setSignInState();
    });
  }

  setSignInState = () => {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.setState({
      isSignedIn: this.auth.isSignedIn.get()
    });
    this.auth.isSignedIn.listen(this.onAuthChange);
  }

  onAuthChange = () => {
    this.setState({
      isSignedIn: this.auth.isSignedIn.get()
    });
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
      <button onClick={this.onSignOutClick} className="ui red google button">
        <i className="google icon" />
        Sign Out
      </button>
      )
    } else {
      return (
      <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
}

export default GoogleAuth;