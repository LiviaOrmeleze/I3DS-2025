import React, { useEffect, useRef, useState } from "react";

const Chat = ({ nome }) => {
  const [messagesList, setMessagesList] = useState([]);
  const messageRef = useRef();
  const bottonRef = useRef();
  const socketRef = useRef(null);

  useEffect(() => {
    // Conectando ao servidor WebSocket
    socketRef.current = new WebSocket("ws://localhost:5044/ws");

    socketRef.current.onopen = () => {
      console.log("✅ Conectado ao servidor");
      // Envia o nome do usuário como primeira mensagem
      socketRef.current.send(nome);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessagesList((prev) => [...prev, data]);
    };

    socketRef.current.onclose = () => {
      console.log("🔌 Conexão encerrada");
    };

    return () => {
      socketRef.current.close();
    };
  }, [nome]);

  useEffect(() => {
    bottonRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  const handleSubmit = () => {
    const message = messageRef.current.value.trim();
    if (!message) return;

    const data = {
      text: message,
      author: nome,
    };

    socketRef.current.send(JSON.stringify(data));
    setMessagesList((prev) => [...prev, { ...data, self: true }]);
    messageRef.current.value = "";
    messageRef.current.focus();
  };

  return (
    <div id="chat-container" className="m-4 bg-warning rounded-5 p-3 d-flex flex-column">
      <div id="chat-body" className="d-flex flex-column overflow-y-hidden h-100 gap-3">
        {messagesList.map((msg, index) => (
          <div
            className={`${
              msg.author === nome || msg.self
                ? "align-self-end ms-5 bg-info-subtle text-secondary"
                : "align-self-start me-5 bg-warning-subtle text-secondary"
            } rounded-3 p-2`}
            key={index}
          >
            <div className="fw-bold">{msg.author}</div>
            <div>{msg.text}</div>
          </div>
        ))}
        <div ref={bottonRef} />
      </div>

      <div id="chat-footer" className="input-group">
        <input
          ref={messageRef}
          autoFocus
          className="form-control rounded-5 ms-2"
          type="text"
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="input-group-text btn btn-secondary m-0 ms-2 rounded-5"
          onClick={handleSubmit}
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
