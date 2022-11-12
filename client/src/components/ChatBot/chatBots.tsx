import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

class Chatbot extends React.Component {
  render() {
    return (
      <div>
        <ThemeProvider
          theme={{
            background: "#000000",
            headerBgColor: "#6A1FF6",
            headerFontColor: "#C6C6C6",
            headerFontSize: "15px",
            botBubbleColor: "#4C18AD",
            botFontColor: "#C6C6C6",
            userBubbleColor: "#7F7489",
          }}
        >
          <ChatBot
            style={{ width: 400 }}
            steps={[
              {
                id: "0",
                message: "Hello! what your name?",
                trigger: "respues",
              },
              {
                id: "respues",
                user: true,
                trigger: "user",
              },
              {
                id: "user",
                message: "Hi {previousValue}, nice to meet you!",
                trigger: "hi",
              },
              {
                id: "hi",
                message: "En que te puedo ayudar?",
                trigger: "5",
              },
              {
                id: "5",
                options: [
                  {
                    value: "1",
                    label: "¿Como puedo verificarme?",
                    trigger: "6",
                  },
                  {
                    value: "2",
                    label: "¿donde puedo ver las noticias?",
                    trigger: "7",
                  },
                ],
              },
              {
                id: "6",
                message: "Anda a la seccion de Profile, ahi lo podes hacer!!",
                trigger: "8",
              },
              {
                id: "7",
                message: "Anda a la seccion de News, ahi lo podes hacer!!",
                trigger: "8",
              },
              {
                id: "8",
                message: "Necesitas algo mas?",
                trigger: "9",
              },
              {
                id: "9",
                options: [
                  { value: "1", label: "Si", trigger: "10" },
                  {
                    value: "2",
                    label: "No",
                    trigger: "11",
                  },
                ],
              },
              {
                id: "10",
                message: "Cuentame, en que te puedo ayudar?",
                trigger: "12",
              },
              {
                id: "11",
                message: "Nos vemos luego!!",
                end: true,
              },
              {
                id: "12",
                message: "Chao",
                end: true,
              },
            ]}
          />
        </ThemeProvider>
      </div>
    );
  }
}
export default Chatbot;
