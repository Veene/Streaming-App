import React from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'
import { Link } from 'react-router-dom'

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams()
  }
  renderAdmin = (stream) => {
    if(stream.userId === this.props.currentUserId) {
      return <div className="right floated content">
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">EDIT</Link>
        <button className="ui button negative">DELETE</button>
      </div>
    }
  }
  renderStreams = () => {
    return this.props.streams.map((stream) => {
      return (
        
          <div className="item" key={stream.id}>
            {this.renderAdmin(stream)}
            <i className="large middle aligned icon camera"></i>
            <div className="content">
              {stream.title}
              <div className="description">{stream.description}</div>
              
            </div>
          </div>
      )
    })
  }
  renderCreate() {
    if(this.props.isSignedIn) {
      return (
        <div>
          <Link className="ui button primary right floated" to="/new">
            CREATE STREAM
          </Link>
        </div>
      )
    }
  }
  render() {
    return ( 
      <div>
        <h2>StreamList </h2>
        <div className="ui celled list">{this.renderStreams()}</div>
         {this.renderCreate()}
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.id,
    isSignedIn: state.auth.isSignedIn
  }
}
export default connect(mapStateToProps, { fetchStreams })(StreamList)