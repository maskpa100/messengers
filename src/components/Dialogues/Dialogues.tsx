import { Link, useParams } from "react-router-dom";
import s from "./Dialogues.module.scss";
import Dialog from "../Dialog/Dialog";
import { Messages, setDialogues } from "../../store/slices/dialoguesSlice";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useWebSocket } from "../../WebSocketProvider";
const Dialogues: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { sendMessage, dataFromServer } = useWebSocket();
  const webSocket = useSelector((state: RootState) => state.auth.webSocket);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (loading && webSocket) {
      const message = {
        type: "request",
        request: {
          action: "dialogues",
        },
      };
      console.log(message);

      sendMessage(message);
      setLoading(false);
    }
  }, [webSocket]);
  useEffect(() => {
    if (dataFromServer && dataFromServer.result) {
      if (dataFromServer.type === "dialogues") {
        dispatch(setDialogues(dataFromServer.result));
      }
    }
  }, [dataFromServer, dispatch]);

  const dialogues = useSelector(
    (state: RootState) => state.dialogues.dialogues
  );
  const auth = useSelector((state: RootState) => state.auth);

  function countUnreadMessages(
    messages: Messages[],
    from_user: number,
    to_user: number
  ): number {
    return messages.filter(
      (msg) => msg.from_user === from_user && !msg.delivered
    ).length;
  }

  function timeFormat(dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString("ru-RU", { month: "short" });
    return `${day} ${month}`;
  }

  return (
    <>
      <div className={s.dialogues}>
        <ul>
          {dialogues &&
            dialogues.length > 0 &&
            dialogues.map((item) => {
              if (item.messages.length > 0) {
                return (
                  <Link
                    key={item.dialog_userId}
                    to={`/dialog/${item.dialog_userId}`}>
                    <li>
                      <div className={s.left}>
                        <div className={s.photo}>
                          <img
                            src={`${apiUrl}/uploads/${item.dialog_user.avatar}`}
                            alt="photo"
                          />
                        </div>
                        <div className={s.message}>
                          <div
                            className={
                              s.name
                            }>{`${item.dialog_user.name} ${item.dialog_user.family}`}</div>
                          <div className={s.text}>
                            {item.messages.length > 0
                              ? auth.userId ===
                                  item.messages[item.messages.length - 1]
                                    .from_user && "Вы: "
                              : ""}
                            {item.messages.length > 0 &&
                              item.messages[
                                item.messages.length - 1
                              ].message.slice(0, 25) +
                                (item.messages[item.messages.length - 1].message
                                  .length > 25
                                  ? "..."
                                  : "")}
                          </div>
                        </div>
                      </div>
                      <div className={s.time}>
                        <span>
                          {timeFormat(
                            item.messages[item.messages.length - 1].time
                          )}
                        </span>
                        {countUnreadMessages(
                          item.messages,
                          item.dialog_userId,
                          auth.userId
                        ) > 0 && (
                          <div className={s.unread}>
                            {countUnreadMessages(
                              item.messages,
                              item.dialog_userId,
                              auth.userId
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  </Link>
                );
              }
            })}
        </ul>
      </div>
      {id ? <Dialog /> : <div className={s.messages}>Выберите диалог</div>}
    </>
  );
};

export default Dialogues;
