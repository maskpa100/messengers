import { useParams } from "react-router-dom";
import s from "./Dialog.module.scss";
import { IoIosMore } from "react-icons/io";
import { useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";

const Dialog: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const { id } = useParams();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Предотвращаем перенос строки
      hendleSend();
    }
  };
  return (
    <>
      <div className={s.messages}>
        <div>
          <div className={s.header}>
            <div className={s.user}>
              <img src={`/photo/1.jpg`} alt="photo" />
              <p className={s.name}>{`Александр Владимирович`}</p>
            </div>
            <div className={s.more}>
              <IoIosMore />
            </div>
          </div>
          <hr />
        </div>

        <div className={s.messageContainer} ref={containerRef}>
          <div className={s.messageRight}>
            <div className={s.info}>
              <img src={`/photo/1.jpg`} alt="photo" />
              <div className={s.time}>00:00</div>
            </div>
            <div className={`${s.text} ${s.unread}`}>hi</div>
          </div>
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
