import React from 'react'

class GoogleAuth extends React.Component {
  componentDidMount() {
    //load google client library -> takes some time to load up
    window.gapi.load('client:auth2', () => {
      //initalizes the library via callback AFTER the library code loads up
      window.gapi.client.init({
        clientId: '725906302840-uvrnup1pconorv8ktd6r2h5sctol3oea.apps.googleusercontent.com',
        scope: 'email'
      })
    })
  }
  render() {
    return (
      <div>Google Auth</div>
    )
  }
}
export default GoogleAuth