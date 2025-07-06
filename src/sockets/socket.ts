import {io, Socket} from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;

export const socket : Socket = io(URL , {
    // transports : ["websocket"],
    withCredentials : true
});

interface DmMessageData {
    roomId : string,
    senderId : string,
    receiverId : string,
    username : string,
    text : string,
    image? : string
}

interface RoomMessageData {
    roomId: string; 
    senderId: string;
    username: string;
    text: string;
    image?: string;
}
  
export interface FormattedMessage {
    roomId : string
    senderId: string;
    receiverId? : string
    username: string;
    text: string;
    time: string;
    messageType?: string;
    imageUrl?: string;
}

  
export const joinRoom = (roomId : string) => {
    console.log("join")
    socket.emit('joinDmRoom',roomId)
}

export const sendMessage = (message : DmMessageData) => {
    socket.emit('dmMessage' , {
        event : 'dmMessage',
        data : message
    })
}

export const onMessage = (callback : (msg : FormattedMessage) => void) => {
    socket.on('message' , (msg) => {
        // console.log(msg);
        callback(msg)
    });
}

export const offMessage = () => {
    socket.off("message")
}

export const SendMessageToRoom = (message : RoomMessageData) => {
    socket.emit('roomMessage', {
        event : 'roomMessage',
        data : message
    })
}