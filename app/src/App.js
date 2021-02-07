import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './Chats/Chat'
import AvatarModal from './Chats/AvatarModal'

import io from 'socket.io-client';
const serverUrl = 'http://localhost:8000'

class App extends Component {
  state = {
    socketId : null,
    adminId : null,
    messages : [],
    isAdmin : false,
    adminRequest : false,
    showModal: false,
    adminAvatar: null
  }
  socket;

  componentDidMount() {
    var socket = io(serverUrl);
    socket.on("connect", () => {
      console.log(socket.id);
      this.setState({socketId: socket.id})
    });

    socket.on('adminId', (admin) => {
      console.log("Admin id is :: ", admin);
      if(this.state.socketId === admin.id) {
        this.setState({isAdmin: true, adminId: admin.id, showModal: true})
      } else {
        this.setState({isAdmin: false, adminId: admin.id})
      }
    });

    socket.emit('msgHistoryRequest')

    socket.on('msgHistory', (messages) => {
      this.setState({messages: [...messages]})
    })

    socket.on('newMessage', (messages) => {
      this.setState((prevState) => ({messages: [...prevState.messages, messages]}))
    })

    socket.on('newAdminUpdateStatus', (statusObj) => {
      if (statusObj.status) {
        this.setState({isAdmin: true, adminAvatar: statusObj.avatar, adminId: statusObj.id})
      } else {
        this.setState({isAdmin: false, adminAvatar: statusObj.avatar, adminId: statusObj.id})
      }
    })

    socket.on('newAdminRequest', (status) => {
      if(status) {
        this.setState({adminRequest: true, showModal: true})
      } else {
        this.setState({adminRequest: false, showModal: false})
      }
    })

    this.socket = socket
  }

  avatarClicked(img) {
    console.log("Clicked image is :: ", img);
    if (this.state.adminRequest) {
      this.socket.emit('updateNewAdmin', {id: this.state.socketId, avatar : img})
    } else {
      this.socket.emit('updateAdminAvatar', img)
    }
    this.setState({showModal: false})
  }

  updateNewMessage(msg) {
    console.log("New message received :: ", msg);
    let timestamp = new Date()
    let formatedMsg = {
        avatar: this.state.adminAvatar,
        message: msg,
        timestamp: timestamp.toDateString(),
        sender: this.state.adminId
    }
    this.socket.emit('addNewMsg', formatedMsg)
  }

  render() {
    return (
      <div className="App">
        <header className="App-body">
            <Chat updateNewMessage={this.updateNewMessage.bind(this)} messages={this.state.messages} isAdmin={this.state.isAdmin}/>
        </header>
        <AvatarModal showModal={this.state.showModal} avatarClicked={this.avatarClicked.bind(this)} />
      </div>
    )
  }
}

export default App;
