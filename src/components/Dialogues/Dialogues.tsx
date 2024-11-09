import { Link, useParams } from "react-router-dom";
import s from "./Dialogues.module.scss";
import Dialog from "../Dialog/Dialog";
const Dialogues: React.FC = () => {
  const dialogues = [
    {
      id: 1,
      message: "Привет как дела",
      ava: "1.jpg",
      name: "Серов Владимир",
      time: "14 сен",
      volume: 1,
    },
    {
      id: 2,
      message: "Ты где ?",
      ava: "2.jpg",
      name: "Смирнова Наталья",
      time: "15 авг",
      volume: 0,
    },
  ];
  const { id } = useParams();
  return (
    <>
      <div className={s.dialogues}>
        <ul>
          {dialogues.map((item, index) => (
            <Link key={index} to={`/dialog/${item.id}`}>
              <li>
                <div className={s.left}>
                  <div className={s.photo}>
                    <img src={`/photo/${item.ava}`} alt="photo" />
                  </div>
                  <div className={s.message}>
                    <div className={s.name}>{item.name}</div>
                    <div className={s.text}>{item.message}</div>
                  </div>
                </div>
                <div className={s.time}>
                  <span>{item.time}</span>
                  {item.volume > 0 && (
                    <div className={s.unread}>{item.volume}</div>
                  )}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {id ? <Dialog /> : <div className={s.messages}>Выберите диалог</div>}
    </>
  );
};

export default Dialogues;
