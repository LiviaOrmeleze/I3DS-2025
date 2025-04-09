import React, { useEffect, useRef, useState } from "react";

const Chat = (props) => {
  const [messagesList, setMessagesList] = useState([]);
  const messageRef = useRef();
  const bottonRef = useRef();

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      setMessagesList((current) => [...current, data]);
    });
    return () => props.socket.off("receive_message");
  }, [props.socket]);

  useEffect(() => {
    bottonRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  const handleSubmit = () => {
    if (
      messagesList.map(
        (message) => message.author == "undefined" && window.location.reload()
      )
    );
    const message = messageRef.current.value;
    if (!message.trim()) return;

    props.socket.emit("message", message);

    messageRef.current.value = "";
    messageRef.current.focus();
  };

  return (
    <div
      id="chat-container"
      style={{ width: "400px", height: "600px" }}
      className="m-4 bg-warning rounded-4 p-3 d-flex flex-column"
    >
      <div
        id="chat-body"
        className="d-flex flex-column overflow-y-hidden h-100 gap-3"
      >
        {messagesList.map((message, authorId) => (
          <div
            className={`${
              message.authorId == props.socket.id
                ? "align-self-end ms-5 bg-info-subtle text-secondary"
                : "align-self-start me-5 bg-warning-subtle text-secondary"
            } rounded-3 p-2 `}
            key={authorId}
          >
            <div id="author" className="fw-bold">
              {message.author}
            </div>
            <div id="message-text">{message.text}</div>
          </div>
        ))}
        <div ref={bottonRef} />
        {/*Delimita a parte de baixo das mensagens*/}
      </div>

      <div id="chat-footer" className="input-group">
        <input
          ref={messageRef}
          autoFocus
          id="msgUser"
          className="form-control"
          type="text"
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key == "Enter" && handleSubmit()}
        />

        <button
          className="input-group-text bg-secondary m-0 input-group-tent"
          id="basic-addon1"
          onClick={() => handleSubmit()}
        >
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
