import { useParams } from "react-router-dom";
import s from "./Dialog.module.scss";
import { IoIosMore } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addDialogue,
  updateMessagesForUser,
} from "../../store/slices/dialoguesSlice";
import { useWebSocket } from "../../WebSocketProvider";
import Cookies from "js-cookie";

const Dialog: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { sendMessage, dataFromServer } = useWebSocket();
  const { id } = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (loading) {
      const message = {
        type: "request",
        request: {
          action: "dialogue",
          dialog_user: String(id),
        },
      };
      console.log(message);

      sendMessage(message);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (dataFromServer && dataFromServer.type === "NewMessage") {
      console.log(
        `пришло сообшения от ${dataFromServer.content.dialog_userId}`
      );
      if (dataFromServer.content.dialog_userId === Number(id)) {
        const message = {
          type: "request",
          request: {
            action: "delivered",
            dialog_user: Number(id),
            userId: userId,
          },
        };
        sendMessage(message);
        dispatch(
          updateMessagesForUser({
            dialog_userId: id ? Number(id) : 0,
            from_user: id ? Number(id) : 0,
            updatedMessage: { delivered: true }, // Изменение поля "delivered" на true
          })
        );
      }
    }
  }, [dataFromServer]);

  useEffect(() => {
    if (loading === false) {
      if (dataFromServer && dataFromServer.result) {
        console.log(dataFromServer);
        if (dataFromServer.result.type === "dialogue") {
          // Проверяем, существует ли dialog_user и является ли он массивом
          const dialogUser = dataFromServer.result.dialog_user;
          console.log("dialogUser.id", dialogUser.id);

          if (dialogUser.id !== undefined) {
            const dialogue = {
              dialog_userId: dialogUser.id,
              dialog_user: dialogUser, // также один пользователь в диалоге
              messages: dataFromServer.result.messages,
              userId: dataFromServer.result.userId,
            };
            console.log(dialogue);

            // Диспатчим действие, только если данные соответствуют ожидаемой структуре
            dispatch(addDialogue(dialogue));
            dispatch(
              updateMessagesForUser({
                dialog_userId: id ? Number(id) : 0,
                from_user: id ? Number(id) : 0,
                updatedMessage: { delivered: true }, // Изменение поля "delivered" на true
              })
            );
          }
        }
      }
      setLoading(true);
    }
  }, [dataFromServer, dispatch, id]);

  const dialogues = useSelector(
    (state: RootState) => state.dialogues.dialogues
  );

  const resultDialogue =
    Array.isArray(dialogues) && id !== undefined
      ? dialogues.filter((item) => item.dialog_userId === Number(id))
      : [];

  // Функция для изменения высоты текстового поля
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Сброс высоты
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Установка новой высоты
    }
  };
  const hendleSend = () => {
    const message = {
      type: "request",
      request: {
        action: "addMessage",
        userId: id,
        content: value,
      },
    };
    console.log(message);
    setValue("");
    sendMessage(message);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Предотвращаем перенос строки
      hendleSend();
    }
  };

  useEffect(() => {
    handleInput(); // Установка начальной высоты
  }, [value]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  const messages =
    resultDialogue && resultDialogue.length > 0
      ? resultDialogue[0].messages
      : [];
  useEffect(() => {
    // Прокручиваем вниз при изменении списка сообщений
    scrollToBottom();
  }, [messages]);
  const auth = useSelector((state: RootState) => state.auth);

  if (resultDialogue.length === 0) {
    return (
      <div className={s.messages}>
        <div className={s.loading}>Loading...</div>
      </div>
    );
  }
  return (
    <>
      <div className={s.messages}>
        <div>
          <div className={s.header}>
            <div className={s.user}>
              <img
                src={`${apiUrl}/uploads/${resultDialogue[0]?.dialog_user.avatar}`}
                alt="photo"
              />
              <p
                className={
                  s.name
                }>{`${resultDialogue[0].dialog_user.name} ${resultDialogue[0].dialog_user.family}`}</p>
            </div>
            <div className={s.more}>
              <IoIosMore />
            </div>
          </div>
          <hr />
        </div>

        <div className={s.messageContainer} ref={containerRef}>
          {resultDialogue &&
            resultDialogue.length > 0 &&
            resultDialogue[0].messages &&
            resultDialogue[0].messages.length > 0 &&
            resultDialogue[0].messages.map((item) => (
              <div
                key={item.id}
                className={
                  item.to_user === Number(id) ? s.messageRight : s.messageLeft
                }>
                <div className={s.info}>
                  <img
                    src={`${apiUrl}/uploads/${
                      item.from_user === Number(id)
                        ? resultDialogue[0].dialog_user.avatar
                        : auth.avatar
                    }`}
                    alt="photo"
                  />
                  <div className={s.time}>00:00</div>
                </div>
                <div
                  className={`${s.text} ${
                    auth.userId === item.from_user && !item.delivered
                      ? s.unread
                      : s.read
                  }`}>
                  {item.message}
                </div>
              </div>
            ))}
        </div>
        <div className={s.chat}>
          <hr />
          <div className={s.send}>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              onInput={handleInput} // Обработчик для динамического изменения высоты
            />
            <VscSend onClick={hendleSend} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
