import React from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {
  constructor(props) {
    super(props)

    this.videoRef = React.createRef()
  }
  componentDidMount() {
    const { id } = this.props.match.params
  
    this.props.fetchStream(id)
    this.buildPlayer()
  }
  componentDidUpdate() {
    //just in case there was some error with loading we do a second try to load, (notice this.buildplayer())
    this.buildPlayer()
  }
  componentWillUnmount() {
    //remember to destroy the attachMediaElement + load
    this.player.destroy()
  }
  buildPlayer() {
    if(this.player || !this.props.stream) {
      return
    }
    const { id } = this.props.match.params

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()

  }
  render() {
    if(!this.props.stream) {
      return <div>LOADING..</div>
    }
    const { title, description } = this.props.stream
    return ( 
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls/>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)