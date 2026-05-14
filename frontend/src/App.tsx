import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Message {
  text: string;
  sender: string;
  self: boolean;
}

function App() {
  const [joined, setJoined] = useState(false);

  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {

  const params = new URLSearchParams(window.location.search);

  const room = params.get("room");

  if (room) {
    setRoomId(room);
  }

}, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((m) => [
        ...m,
        {
          text: data.message,
          sender: data.name,
          self: data.name === name,
        },
      ]);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [name]);

  const joinRoom = () => {
    if (!roomId || !name) return;

    wsRef.current?.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId,
          name,
        },
      })
    );

    setJoined(true);
  };

  const sendMessage = () => {
    if (!input) return;

    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: input,
          name,
        },
      })
    );

    setInput("");
  };

  if (!joined) {
    return (
      <div className="h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="bg-zinc-900 p-8 rounded-3xl w-[350px] space-y-5 shadow-2xl">

          <h1 className="text-2xl font-bold text-center">
            Join Chat Room
          </h1>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              bg-zinc-800
              p-3
              rounded-xl
              outline-none
              border border-zinc-700
            "
          />

          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="
              w-full
              bg-zinc-800
              p-3
              rounded-xl
              outline-none
              border border-zinc-700
            "
          />

          <button
            onClick={joinRoom}
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              transition
              p-3
              rounded-xl
              font-semibold
              cursor-pointer
            "
          >
            Join Room
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 flex flex-col text-white">

      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">

  <div>
    <h1 className="font-bold text-lg">
      Room: {roomId}
    </h1>

    <p className="text-sm text-zinc-400">
      Logged in as {name}
    </p>
  </div>

  <button
    onClick={async () => {
  try {
    const shareLink = `${window.location.origin}/?room=${roomId}`;

    await navigator.clipboard.writeText(shareLink);

    toast.success("Share link copied to clipboard");
  } catch (err) {
    toast.error("Unable to create share link");
    console.error("Copy failed:", err);
  }
}}
    className="
      bg-zinc-800
      hover:bg-zinc-700
      transition
      px-4
      py-2
      rounded-xl
      text-sm
      cursor-pointer
    "
  >
    Share
  </button>
  <Toaster />

</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.self ? "justify-end" : "justify-start"
            }`}
          >

            <div
              className={`
                max-w-[280px]
                px-4
                py-2
                rounded-2xl
                shadow-md
                break-words
                ${
                  msg.self
                    ? "bg-green-600 rounded-br-sm"
                    : "bg-blue-600 rounded-bl-sm"
                }
              `}
            >

              <p className="text-xs text-zinc-200 mb-1">
                {msg.self?"Me":msg.sender}
              </p>

              <p>{msg.text}</p>

            </div>

          </div>
        ))}

      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800">

        <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-2xl">

          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1
              bg-transparent
              outline-none
              text-white
              placeholder:text-zinc-500
              px-2
            "
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="
              bg-green-600
              hover:bg-green-700
              transition
              px-5
              py-2
              rounded-xl
              font-medium
              cursor-pointer
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;

















// import { useEffect, useState, useRef } from 'react'
// import './App.css'
// function App() {
//   const[messages,setMessages]=useState(["hi there"]);
//   const wsRef=useRef<WebSocket | null>(null);
//   useEffect(()=>{
//     const ws=new WebSocket("http://localhost:8080")
//     ws.onmessage=(event)=>{
//       setMessages(m=>[...m,event.data])
//     }
//     wsRef.current=ws
//     ws.onopen=()=>{
//       ws.send(JSON.stringify({
//         type:"join",
//         payload:{
//           roomId:"red"
//         }
//       }))
//     }

//   },[])

//   return (
//     // <div className='bg-black h-screen flex flex-col'>
//     //   <div className='h-[70vh] bg-amber-200'>
//     //     {messages.map(messages => <div className='bg-white text-black w-[100px] rounded-md m-4 text-center'>{messages}</div>)}
//     //   </div>
//     //   <div className="bg-amber-50 mx-auto z-20">
//     //     <input className='outline-none border-none flex-1 p-2.5 bg-amber-900 h-8 text-white' type="text" />
//     //     <button className='cursor-pointer'>Send</button>
//     //   </div>
//     // </div>
//     <div className="h-screen bg-zinc-950 flex flex-col text-white">
//   <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
//     <h1 className="text-lg font-semibold">Chat Room</h1>

//     <div className="w-3 h-3 rounded-full bg-green-500" />
//   </div>
//   <div className="flex-1 overflow-y-auto p-4 space-y-4">

//     {messages.map((message, index) => (
//       <div
//         key={index}
//         className="flex justify-end"
//       >
//         <div
//           className="
//             max-w-[250px]
//             px-4
//             py-2
//             rounded-2xl
//             bg-blue-600
//             text-white
//             shadow-md
//             break-words
//           "
//         >
//           {message}
//         </div>
//       </div>
//     ))}

//   </div>

//   <div className="p-4 border-t border-zinc-800">
    
//     <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-2xl">

//       <input
//       id='messageinp'
//         type="text"
//         placeholder="Type a message..."
//         className="
//           flex-1
//           bg-transparent
//           outline-none
//           text-white
//           placeholder:text-zinc-500
//           px-2
//         "
//       />

//       <button
//         className="
//           bg-blue-600
//           hover:bg-blue-700
//           transition
//           px-5
//           py-2
//           rounded-xl
//           font-medium
//           cursor-pointer
//         "
//         onClick={()=>{
//           //@ts-ignore
//           const msg=document.getElementById("messageinp")?.value;
//           wsRef.current?.send(JSON.stringify({
//             type:"chat",
//             payload:{
//               message:msg
//             }
//           }))
//         }}
//       >
//         Send
//       </button>

//     </div>

//   </div>

// </div>
//   )
// }

// export default App
