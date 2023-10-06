import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import io from "socket.io-client";

// const socket = io("http://localhost:3001");
const socket = io("/");

export default function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [clientes, setClientes] = useState([]);
    const room = 'js'

    useEffect(() => {
        socket.on("recived_msg", (data) => {
            console.log(data)
            setMessages(state => [...state, {
                msg: data.msg,
                user: data.user,
                from: data.from
            }]);
        })
        //     socket.emit('join_room', { user });
        return () => {
            socket.off("recived_msg")
        };
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = {
            msg: message,
            from: 'Me',
            user: user,
            chatRooms: 'js'
        };
        setMessages(state => [newMessage, ...state]);
        setMessage("");
        socket.emit("message", newMessage);
    };
    console.log(message)
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                    Bienvenido !
                    # {user}
                </h2>
            </div>
            <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
                <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                        {messages.map((mess, i) => {
                            return (<div className={`flex w-full mt-2 space-x-3 max-w-xs ${mess.user === user ? "ml-auto justify-end" : "justify-content-start"}`}>
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full  ${mess.user === user ? "bg-blue-900" : "bg-purple-900"} `}></div>
                                <div>
                                    <div className={`  ${mess.user === user ? "bg-blue-200" : "bg-purple-300"} p-3 rounded-r-lg rounded-bl-lg`}>
                                        <p className="text-sm">{mess.msg}</p>
                                    </div>
                                    <span class="text-xs text-white-500 leading-none">{mess.user}</span>
                                </div>
                            </div>)
                        })}



                    </div>
                    <div className="bg-gray-300 p-4">
                        <form onSubmit={handleSubmit}>
                            <input className="flex items-center h-10 w-full rounded px-3 text-sm" name="message"
                                type="text"
                                placeholder="Escribe tu mensaje.."
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                autoFocus />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}