import React, { Component } from 'react'

class InputContainer extends Component {
    constructor(props) {
        super(props);
        this.message = React.createRef();
    }

    sendMessageClicked(){
        console.log(this.message.current.value);
        this.props.passNewMessage(this.message.current.value)
    }
    
    render() {
        return (
            <div className="input-container">
                <input className="chat-input" ref={this.message} type="text" placeholder="Enter message..." />
                <button className="chat-send" onClick={this.sendMessageClicked.bind(this)}>Send</button>
            </div>
        )
    }
}

export default InputContainer