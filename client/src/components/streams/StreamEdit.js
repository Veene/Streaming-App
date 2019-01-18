import React from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }
  render() {
    console.log(this.props)
    if(!this.props.stream) {
      return <div>LOADING..</div>
    }
    return ( 
      <div>
        <h2>StreamEdit</h2>
        <div>TITLE: {this.props.stream.title}</div>
      </div>
    )
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}
export default connect(mapStateToProps, { fetchStream })(StreamEdit)