import { useRef, useState } from "react";
import s from "./Setting.module.scss";
import ModalImg from "../ModalImg/ModalImg";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Setting: React.FC = () => {
  const [croppedImg, setCroppedImg] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [noImg, setNoImg] = useState(false);
  const [modal, setModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("Картинка добавлена:", file);
      setModal(true);
    } else {
      console.log("Картинка не выбрана");
    }
  };
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleDeleteImg = () => {
    setCroppedImg("");
    setSelectedImage("");
  };

  return (
    <div className={s.setting}>
      <h2>Настройки пользователя</h2>
      {modal && (
        <ModalImg
          setModal={setModal}
          image={selectedImage}
          setCroppedImg={setCroppedImg}
          setNoImg={setNoImg}
        />
      )}
      <div className={s.form}>
        <input
          className={s.inputFile}
          type="file"
          ref={inputRef}
          onChange={handleImageUpload}
        />
        {croppedImg != "" ? (
          <div className={s.imgUpload}>
            <IoIosCloseCircleOutline
              className={s.close}
              onClick={handleDeleteImg}
            />
            <img
              src={croppedImg}
              className={s.img}
              width={64}
              height={52}
              alt="photo"
            />
          </div>
        ) : (
          <button className={s.button} onClick={handleClick}>
            Загрузить изображение
          </button>
        )}

        <div className={s.block}>
          <label htmlFor="family">Фамилия:</label>
          <input id="family" type="text" placeholder="Введите фамилию" />
        </div>
        <div className={s.block}>
          <label htmlFor="name">Имя:</label>
          <input id="name" type="text" placeholder="Введите имя" />
        </div>
        <div className={s.block}>
          <label htmlFor="city">Город:</label>
          <input id="city" type="text" placeholder="Введите город" />
        </div>
        <button className={s.button}>Сохранить</button>
      </div>
    </div>
  );
};

export default Setting;
