import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues)
  }
  render() {
    // console.log(this.props)
    if(!this.props.stream) {
      return <div>LOADING..</div>
    }
    const { title, description } = this.props.stream
    return ( 
      <div>
        <h2>Edit The Stream</h2>
        <StreamForm onSubmit={this.onSubmit} initialValues={{title: title, description: description}}/>
      </div>
    )
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)