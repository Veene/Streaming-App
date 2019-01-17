import React from 'react'
//reduxForm is a function similar to connect() -> allows mapstatetoprops and action creators
import { Field, reduxForm } from 'redux-form'

class StreamCreate extends React.Component {
  //formprops have all the functions (onChange etc,) also value, but it is up to us to make the final connections
  //we are destructuring formProps now instead of adding {...formProps.input} into <input />
  renderInput({ input, label }) {
    return(
      <div className="field">
        <label>{label}</label>
        <input {...input} />
      </div>
    )
  }
  onSubmit(formValues) {
    //redux-form handles the event and preventDefault, so we dont have to worry about it so basically we use the builtin handleSubmit
    //which we get on this whole file because of reduxForm connect() style. handleSubmit throws the values entered back as object
    //{title:EXAMPLE, description:EXAMPLE}
    console.log(formValues)
  }
  render() {
    //TONS of different props from the redux-form lib, pick the right one //Reminder! Field needs its attributes name, etc,etc component is necessary
    //component needs to be shown, so you need to have the component made in advance and pass it in
    // console.log(this.props)
    return ( 
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
        <Field name="title" component={this.renderInput} label="Enter Title"/>
        <Field name="description" component={this.renderInput} label = "Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}
  

export default reduxForm({
  //value of form is usually just a name for what it is being used
  form: 'streamCreate'
})(StreamCreate)