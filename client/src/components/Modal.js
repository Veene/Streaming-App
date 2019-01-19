import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
  return ReactDOM.createPortal(
    //first part creates the modal with the help of semantic ui, second element is the reference to where you want to put it
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  )
}

export default Modal