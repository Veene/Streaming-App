import React from 'react'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'
import { connect } from 'react-redux'

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }
  onSubmit = () => {
    this.props.deleteStream(this.props.match.params.id)
  }
  renderContent() {
    if(!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }
    return `Are you sure you want to delete stream with title: ${this.props.stream.title}?`
  }
  render() {
    const actions = (
      <React.Fragment>
        <button onClick={this.onSubmit} className="ui button negative">Delete</button>
        <button onClick={() => history.push('/')} className="ui button">Cancel</button>
      </React.Fragment>
    )
    return ( 
        <Modal 
          title="Delete Stream"
          content={this.renderContent()}
          actions={actions}
          onDismiss={() => history.push('/')}
        />
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
