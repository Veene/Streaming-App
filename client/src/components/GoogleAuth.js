import React from 'react'

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  }
  componentDidMount() {
    //load google client library -> takes some time to load up
    window.gapi.load('client:auth2', () => {
      //initalizes the library via callback AFTER the library code loads up
      //init is a google auth requirement to allow proper use of the oAuth (ITS ALSO A PROMISE WOHOO)
      window.gapi.client.init({
        clientId: '725906302840-uvrnup1pconorv8ktd6r2h5sctol3oea.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        //add auth to GoogleAuth class
        this.auth = window.gapi.auth2.getAuthInstance()
        //with this setState we can monitor when we need component to re-render (when it changes to true)
        this.onAuthChange()
        //set up eventlistener built in google
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }
  //because its a callback function requires arrow to bind this
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get()})
  }
  onSignInClick = () => {
    this.auth.signIn()
  }
  onSignOutClick = () => {
    this.auth.signOut()
  }
  renderAuthButton() {
    if(this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
      return (
        <button 
        className="ui red google button"
        //SIGN OUT OF GOOGLE oAUTH
        onClick={this.onSignOutClick}
        >
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button 
        className="ui green google button"
        //SIGN IN TO GOOGLE oAUTH
        onClick={this.onSignInClick}
        >
          <i className="google icon" />
          Sign In
        </button>
      )
    }
  }
  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}
export default GoogleAuth