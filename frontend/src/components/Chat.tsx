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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!name) {
      navigate("/");
      return;
    }
    const ws = new WebSocket("https://chatrooms-gq4l.onrender.com");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId, name },
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: { message: input, name },
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
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="z-10 border-b border-black/10 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between  shrink-0">
        <div className="min-w-0 flex-1">
          <h1 className="font-mono text-sm sm:text-lg truncate">
            Room:{" "}
            <span className="font-semibold">{roomId}</span>
          </h1>
          <p className="text-black/50 text-xs font-mono truncate">
            Logged in as {name}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Share button */}
          <button
            onClick={copyShareLink}
            className="bg-black text-white px-3 py-1.5 rounded-2xl hover:opacity-90 transition cursor-pointer font-mono text-sm flex items-center gap-1.5"
          >
            <IoMdShare className="text-base" />
            <span className="hidden xs:inline sm:inline">Share</span>
          </button>
          <a
            href="https://github.com/VishalKammari/ChatRooms"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black/10 rounded-2xl px-2.5 py-2 flex items-center gap-2 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="bg-black text-white p-1.5 rounded-xl">
              <FaGithub size={14} />
            </div>
          </a>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-black/30 font-mono text-sm mt-8">
            No messages yet. Say hi!
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[65%] px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl break-words shadow-sm ${
                msg.self
                  ? "bg-black text-white rounded-br-sm"
                  : "bg-zinc-100 text-black rounded-bl-sm"
              }`}
            >
              <p
                className={`text-[10px] sm:text-xs mb-1 font-mono ${
                  msg.self ? "text-white/60" : "text-black/40"
                }`}
              >
                {msg.self ? "Me" : msg.sender}
              </p>
              <p className="font-mono text-sm leading-snug">{msg.text}</p>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-black/10 px-3 pb-30 sm:px-4 sm:py-3 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-1 h-10 sm:h-12 border border-black/10 rounded-2xl px-3 sm:px-4 outline-none font-mono text-sm sm:text-base"
          />
          <button
            onClick={sendMessage}
            className="h-10 sm:h-12 px-4 sm:px-6 bg-black text-white rounded-2xl hover:opacity-90 transition cursor-pointer font-mono text-sm sm:text-base shrink-0"
          >
            Send
          </button>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Chat;