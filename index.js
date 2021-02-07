const io = require('socket.io')();
var admin = {};
var messages = []

io.on('connection', (client) => {
    console.log(client.id);
    if(!admin.id) {
        admin.id = client.id   // Setting admin on first connection
    }

    client.emit('adminId', admin); // sending connected client the admin information

    client.on('updateAdminAvatar', (avatarId) => {
        admin.avatar = avatarId  //update admin avatar
    })

    client.on('msgHistoryRequest', () => {
        client.join("room1");  // Adding client to chat room
        client.emit('msgHistory', messages) // Sending connected client all history message on request
    })

    client.on('addNewMsg', (newMsg) => {
        console.log("New message received :: ", newMsg);
        messages.push(newMsg)     // Addming new message to history array of messages
        io.emit('newMessage', newMsg) // Sending all the connected clients with the new message
    })

    client.on('disconnect', () => {  // on any client disconnect
        console.log('user disconnected :: ', client.id);
        if(admin.id === client.id) {    // validate id to check if admin left
            admin = {}
            io.emit("newAdminRequest", true);  // triggering all connected user with admin left info
        }
    });

    client.on('updateNewAdmin', (newAdminObj) => {  // updating new admin
        if (!admin.id) {
            admin.id = newAdminObj.id
            admin.avatar = newAdminObj.avatar
            client.emit('newAdminUpdateStatus', {
                status: true,
                ...admin
            })
            io.emit("newAdminRequest", false);
        } else {
            client.emit('newAdminUpdateStatus', {
                status: false,
                ...admin
            })
        }
    })
});


const port = 8000;
io.listen(port, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
console.log('listening on port ', port);