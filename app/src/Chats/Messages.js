import React, { Component } from 'react'

import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'

class Message extends Component {

    getImageSrc(avatar) {
        switch (avatar) {
            case 1:
                return img1

            case 2:
                return img2

            case 3:
                return img3

            case 4:
                return img4

            case 5:
                return img5

            default:
                return img1
        }
    }

    render() {
        return (
            <div>
                <div className="message">
                    <div className="avatar">
                        <img src={this.getImageSrc(this.props.content.avatar)} />
                    </div>
                    <div className="message-placeholder">
                        {this.props.content.message}
                    </div>
                </div>
                <div className="timestamp">
                    {this.props.content.timestamp}
                </div>
            </div>
        )
    }
}

export default Message