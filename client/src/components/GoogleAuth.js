import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut} from '../actions'

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
        //gets true or false
        this.onAuthChange(this.auth.isSignedIn.get())
        //set up eventlistener built in google will trigger this.onAuthChange with adding argument true or false
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }
  // received a boolean from this.auth.isSignedIn.listen
  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn()
    } else {
      this.props.signOut()
    }
  }
  onSignInClick = () => {
    this.auth.signIn()
  }
  onSignOutClick = () => {
    this.auth.signOut()
  }
  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
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
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)