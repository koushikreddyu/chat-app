import React, { Component } from 'react'

import Message from './Messages'

var messages = [
    {
        avatar: 1,
        message: "Your Message goes here Your Message goes here Your Message goes here Your Message goes here",
        timestamp: "07-02-2021 11:21 PM",
        sender: "some id of sender here"
    },
    {
        avatar: 2,
        message: "Your Message goes here Your Message goes here Your Message goes here Your Message goes here",
        timestamp: "07-02-2021 11:21 PM",
        sender: "some id of sender here"
    },
    {
        avatar: 3,
        message: "Your Message goes here Your Message goes here Your Message goes here Your Message goes here",
        timestamp: "07-02-2021 11:21 PM",
        sender: "some id of sender here"
    },
    {
        avatar: 4,
        message: "Your Message goes here Your Message goes here Your Message goes here Your Message goes here",
        timestamp: "07-02-2021 11:21 PM",
        sender: "some id of sender here"
    },
    {
        avatar: 5,
        message: "Your Message goes here Your Message goes here Your Message goes here Your Message goes here",
        timestamp: "07-02-2021 11:21 PM",
        sender: "some id of sender here"
    }
]

class MessageContainer extends Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    
    render() {

        let msg = this.props.messages.map((m, i) => {
            return (
                <Message content={m} key={i} />
            )
        })
        let divClass
        this.props.isAdmin ?  divClass = "message-container" : divClass = "message-container full-container"
        return (
            <div className={divClass}>
                {msg}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

export default MessageContainer