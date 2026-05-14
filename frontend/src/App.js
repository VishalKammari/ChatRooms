import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import './App.css';
function App() {
    const [messages, setMessages] = useState(["hi there"]);
    const wsRef = useRef();
    useEffect(() => {
        const ws = new WebSocket("http://localhost:8080");
        ws.onmessage = (event) => {
            setMessages(m => [...m, event.data]);
        };
        wsRef.current = ws;
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: "red"
                }
            }));
        };
    }, []);
    return (
    // <div className='bg-black h-screen flex flex-col'>
    //   <div className='h-[70vh] bg-amber-200'>
    //     {messages.map(messages => <div className='bg-white text-black w-[100px] rounded-md m-4 text-center'>{messages}</div>)}
    //   </div>
    //   <div className="bg-amber-50 mx-auto z-20">
    //     <input className='outline-none border-none flex-1 p-2.5 bg-amber-900 h-8 text-white' type="text" />
    //     <button className='cursor-pointer'>Send</button>
    //   </div>
    // </div>
    _jsxs("div", { className: "h-screen bg-zinc-950 flex flex-col text-white", children: [_jsxs("div", { className: "p-4 border-b border-zinc-800 flex items-center justify-between", children: [_jsx("h1", { className: "text-lg font-semibold", children: "Chat Room" }), _jsx("div", { className: "w-3 h-3 rounded-full bg-green-500" })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: messages.map((message, index) => (_jsx("div", { className: "flex justify-end", children: _jsx("div", { className: "\n            max-w-[250px]\n            px-4\n            py-2\n            rounded-2xl\n            bg-blue-600\n            text-white\n            shadow-md\n            break-words\n          ", children: message }) }, index))) }), _jsx("div", { className: "p-4 border-t border-zinc-800", children: _jsxs("div", { className: "flex items-center gap-3 bg-zinc-900 p-2 rounded-2xl", children: [_jsx("input", { id: 'messageinp', type: "text", placeholder: "Type a message...", className: "\n          flex-1\n          bg-transparent\n          outline-none\n          text-white\n          placeholder:text-zinc-500\n          px-2\n        " }), _jsx("button", { className: "\n          bg-blue-600\n          hover:bg-blue-700\n          transition\n          px-5\n          py-2\n          rounded-xl\n          font-medium\n          cursor-pointer\n        ", onClick: () => {
                                //@ts-ignore
                                const msg = document.getElementById("message")?.value;
                                ws.current.send(JSON.stringify({
                                    type: "chat",
                                    payload: {
                                        message: msg
                                    }
                                }));
                            }, children: "Send" })] }) })] }));
}
export default App;
//# sourceMappingURL=App.js.map