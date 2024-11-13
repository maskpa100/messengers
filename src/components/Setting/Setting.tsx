import { useRef, useState } from "react";
import s from "./Setting.module.scss";
import ModalImg from "../ModalImg/ModalImg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAvatar } from "../../store/slices/authSlice";

const Setting: React.FC = () => {
  const [croppedImg, setCroppedImg] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [noImg, setNoImg] = useState(false);
  const [modal, setModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const token = Cookies.get("token");
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget;

    const data = {
      family: formData.get("family"),
      name: formData.get("name"),
      avatar: croppedImg,
      city: formData.get("city"),
    };
    try {
      const response = await fetch(`${apiUrl}/setting/update-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === "ok") {
        console.log("Данные отправлены");
        console.log(result);
        dispatch(setAvatar({ avatar: result.avatar }));
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className={s.setting}>
      <h2>Настройки пользователя</h2>
      <div className={s.upload}>
        {modal && (
          <ModalImg
            setModal={setModal}
            image={selectedImage}
            setCroppedImg={setCroppedImg}
            setNoImg={setNoImg}
          />
        )}
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
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.block}>
          <label htmlFor="family">Фамилия:</label>
          <input
            id="family"
            type="text"
            name="family"
            placeholder="Введите фамилию"
            defaultValue={auth.family}
            required
          />
        </div>
        <div className={s.block}>
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Введите имя"
            defaultValue={auth.name}
            required
          />
        </div>
        <div className={s.block}>
          <label htmlFor="city">Город:</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Введите город"
            defaultValue={auth.city}
            required
          />
        </div>
        <button className={s.button} type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Setting;
