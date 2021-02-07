import React, { Component } from 'react'
import MessageContainer from './MessageContainer'
import InputContainer from './InputContainer'

class Chat extends Component {
    passNewMessage(msg) {
        this.props.updateNewMessage(msg)
    }
    render() {
        return (
            <div className="chart-container">
                <MessageContainer messages={this.props.messages} />
                {this.props.isAdmin ? <InputContainer passNewMessage={this.passNewMessage.bind(this)} /> : null }
            </div>
        )
    }
}

export default Chat