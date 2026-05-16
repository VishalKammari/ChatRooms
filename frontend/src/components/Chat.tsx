import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { IoMdShare } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";

interface Message {
  text: string;
  sender: string;
  self: boolean;
}

const Chat = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!name) {
      navigate("/");
      return;
    }
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId,
            name,
          },
        })
      );
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          sender: data.name,
          self: data.name === name,
        },
      ]);
    };
    ws.onclose = () => {
      console.log("Disconnected");
    };
    wsRef.current = ws;
    return () => {
      ws.close();
    };
  }, [roomId, name, navigate]);
  const sendMessage = () => {
    if (!input.trim()) return;
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
  const copyShareLink = async () => {
    try {
      const shareLink = `${window.location.origin}/chat/${roomId}`;
      await navigator.clipboard.writeText(shareLink);
      toast.success("Share link copied");
    } catch (err) {
      toast.error("Failed to copy link");
      console.error(err);
    }
  };
  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="border-b border-black/10 p-4 flex items-center justify-between">
        <div>
          <h1 className="font-mono text-lg sm:text-xl">
            Room: {roomId}
          </h1>
          <p className="text-black/50 text-sm font-mono">
            Logged in as {name}
          </p>
        </div>
        <div className="flex gap-1.5">
            <button onClick={copyShareLink} className="bg-black text-white px-3 py-1 rounded-2xl hover:opacity-90 transition cursor-pointer font-mono text-lg flex gap-2 items-center">
            <IoMdShare />
          Share
        </button>

        <a href="https://github.com/VishalKammari/ChatRooms" target="_blank" rel="noopener noreferrer" className='sm:top-5 sm:right-5 border border-black/10 rounded-2xl px-4 py-3 flex items-center gap-3 hover:shadow-md transition-all duration-200 bg-white'>
                <div className='bg-black text-white p-2 rounded-xl'>
                  <FaGithub size={18} />
                </div>
                <div className='leading-tight'>
                  <h1 className='font-mono text-sm'>
                    Vishal Kammari
                  </h1>
                </div>
        </a>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.self ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={` max-w-[80%] sm:max-w-[60%] px-4 py-3 rounded-2xl break-word shadow-sm ${ msg.self ? "bg-black text-white rounded-br-sm" : "bg-zinc-100 text-black rounded-bl-sm" }`}>
              <p className={` text-xs mb-1 font-mono ${ msg.self ? "text-white/60" : "text-black/40" }`}>
                {msg.self ? "Me" : msg.sender}
              </p>
              <p className="font-mono text-sm sm:text-base">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-black/10 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 h-12 border border-black/10 rounded-2xl px-4 outline-none font-mono"/>
          <button onClick={sendMessage} className="h-12 px-6 bg-black text-white rounded-2xl hover:opacity-90 transition cursor-pointer font-mono">
            Send
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default Chat;