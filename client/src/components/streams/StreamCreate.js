import React from 'react'
//reduxForm is a function similar to connect() -> allows mapstatetoprops and action creators
import { Field, reduxForm } from 'redux-form'

class StreamCreate extends React.Component {
  //formprops have all the functions (onChange etc,) also value, but it is up to us to make the final connections
  //we are destructuring formProps now instead of adding {...formProps.input} into <input /> meta holds errors, label keeps track of field labels
  renderInput = ({ input, label, meta }) => {
    // console.log(meta)
    return(
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {meta.touched &&
          (meta.error && <span>{meta.error}</span>)}
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
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title"/>
        <Field name="description" component={this.renderInput} label = "Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

//the way redux-form validates form values
const validate = (values) => {
  const errors = {}
  if(!values.title) {
    //only runs if user does not enter title
    errors.title = "Title is Required"
  }
  if(!values.description) {
    errors.description = "Description is Required"
  }
  return errors
}

//links this component to redux state by using reduxForm the same way connect does. It sets up streamCreate inside form state
export default reduxForm({
  form: 'streamCreate', // a unique identifier for this form
  validate: validate, // <--- validation function given to redux-form
})(StreamCreate)