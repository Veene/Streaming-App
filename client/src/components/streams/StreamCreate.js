import React from 'react'
//reduxForm is a function similar to connect() -> allows mapstatetoprops and action creators
import { connect } from 'react-redux'
import { createStream } from '../../actions'
import { Redirect } from 'react-router-dom'
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    //redux-form handles the event and preventDefault, so we dont have to worry about it so basically we use the builtin handleSubmit
    //which we get on this whole file because of reduxForm connect() style. handleSubmit throws the values entered back as object
    //{title:EXAMPLE, description:EXAMPLE}
    console.log(formValues)
    this.props.createStream(formValues)
  }
  render() {
    return ( 
      <div>
        <h2>Stream Create</h2>
        <StreamForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default connect(null, { createStream })(StreamCreate)