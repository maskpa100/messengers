import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDialogue,
  updateMessagesForUser,
} from "./store/slices/dialoguesSlice";
import { RootState } from "./store/store";
import { setWebSocket } from "./store/slices/authSlice";

interface Request {
  action: string;
}

interface WebSocketContextType {
  request: Request;
  dataFromServer: any; // Замените на нужный тип данных
  updateRequest: (newRequest: Request) => void;
  sendMessage: (message: any) => void; // Функция для отправки произвольных сообщений
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [request, setRequest] = useState<Request>({ action: "home" });
  const [dataFromServer, setDataFromServer] = useState<any>(null); // Состояние для данных от сервера
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.auth.userId);
  useEffect(() => {
    if (userId !== 0) {
      const ws = new WebSocket(`ws://localhost:8080?token=${token}`); // Замените на URL вашего WebSocket сервера
      setSocket(ws);

      ws.onopen = () => {
        console.log("Установлено соединение с WebSocket");
        dispatch(setWebSocket({ webSocket: true }));
        ws.send(JSON.stringify({ type: "request", request }));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Сообщение, полученное от сервера:", message);
        if (message.type === "NewMessage") {
          const dialogue = {
            dialog_userId: Number(message.content.dialog_userId),
            userId: message.content.userId,
            dialog_user: message.content.dialog_user,
            messages: message.content.messages,
          };
          console.log("ooo");

          dispatch(addDialogue(dialogue));
        }
        if (message.type === "delivered") {
          console.log("все прочитаные");
          dispatch(
            updateMessagesForUser({
              dialog_userId: message.result.dialog_user,
              from_user: userId,
              updatedMessage: { delivered: true }, // Изменение поля "delivered" на true
            })
          );
        }
        setDataFromServer(message); // Обновляем состояние данными от сервера
      };
      ws.onerror = (error) => {
        console.error("Ошибка WebSocket :", error);
      };

      ws.onclose = (event) => {
        console.log("Соединение с WebSocket закрыто:", event);
        console.log("Причина закрытия:", event.reason);
      };
    }
  }, [request, token, userId]);

  const updateRequest = (newRequest: Request) => {
    setRequest(newRequest);
    if (socket) {
      socket.send(JSON.stringify({ type: "request", request: newRequest }));
    }
  };

  // Функция для отправки произвольных сообщений
  const sendMessage = (message: any) => {
    if (socket) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ request, dataFromServer, updateRequest, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export default WebSocketProvider;
