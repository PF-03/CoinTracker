import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import estilos from "./chatSocket.module.css";
import foro from "../../assets/foro.png";

import send from "../../assets/send.png";


const socket = io(`${import.meta.env.VITE_SERVER_API}`); //puente de conexion con el back

export default function ChatSocket() {
  const user = useSelector((state: any) => state.user);
  const [texting, setTexting] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const recibir = (message) => {
      console.log(message);
      setMessages([...messages, message]);
      setTexting("");
    };
    socket.on("message", recibir);
    let texto = (usuario) => {
      setTexting(usuario);
    };
    socket.on("typing", texto);
    return () => {
      socket.off("message", recibir);
      socket.off("typing", texto);
    };
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let envio = {
      from: user.username
        ? user.username
        : user[0]?.username
        ? user.username
        : "User",
      body: message,
    };
    socket.emit("message", envio);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    let usuario = user.username
      ? user.username
      : user[0]?.username
      ? user.username
      : "User";
    socket.emit("typing", usuario);
  };

  return (
    <div className={estilos.caja}>
      <div className={`${estilos.boxPrincipal} ${modal && estilos.open} `}>
        <form onSubmit={handleSubmit} className={estilos.form}>
          <div className={estilos.contenedor}>
            <div className={estilos.foro}>
              <p>
                <strong>.</strong>
              </p>{" "}
              <p>
                <strong>.</strong>
              </p>{" "}
              <p>
                <strong>.</strong>
              </p>
            </div>
            <ul>
              {messages.map((el, index) => (
                <div
                  key={index}
                  className={`${estilos.message} ${(user?.username ||
                    user[0]?.username) === el.from && estilos.me} ${"me" ===
                    el.from && estilos.me}`}
                >
                  <p className={estilos.from}>
                    <strong>{el.from}</strong>:
                  </p>
                  <p>{el.body}</p>{" "}
                </div>
              ))}
            </ul>
            {texting && <p className={estilos.typing}>{texting}</p>}
          </div>
          <div className={estilos.enviar}>
            <input
              type="text"
              name="message"
              onChange={handleChange}
              placeholder="Typing message..."
              value={message}
            />
            <button className={estilos.button}>
              <img src={send} alt="send" />
            </button>
          </div>
        </form>
      </div>
      <div className={estilos.chat} onClick={() => setModal(!modal)}>
        <img src={foro} alt="chat" />
      </div>
    </div>
  );
}
