import { useState } from "react";
import s from "./Registration.module.scss";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

function Registration() {
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [visibilityPassword2, setVisibilityPassword2] = useState(false);
  const [typePassword, setTypePassword] = useState("password");
  const [typePassword2, setTypePassword2] = useState("password");

  const handleShowPassword2 = () => {
    setVisibilityPassword2(true);
    setTypePassword2("text");
  };
  const handleHidePassword2 = () => {
    setVisibilityPassword2(false);
    setTypePassword2("password");
  };

  const handleShowPassword = () => {
    setVisibilityPassword(true);
    setTypePassword("text");
  };
  const handleHidePassword = () => {
    setVisibilityPassword(false);
    setTypePassword("password");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      family: formData.get("family"),
      name: formData.get("name"),
      city: formData.get("city"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);
  };
  return (
    <div className={s.registration}>
      <div className={s.login}>
        <form onSubmit={handleSubmit}>
          <h1>Регистрация</h1>
          <div className={s.block}>
            <label htmlFor="family">Фамилия:</label>
            <input
              id="family"
              type="text"
              name="family"
              placeholder="Введите фамилию"
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
              required
            />
          </div>
          <div className={s.block}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Введите email"
              required
            />
          </div>
          <div className={s.block}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type={typePassword}
              name="password"
              placeholder="Введите passwors"
              required
            />
            {!visibilityPassword && <BiShow onClick={handleShowPassword} />}
            {visibilityPassword && <BiHide onClick={handleHidePassword} />}
          </div>
          <div className={s.block}>
            <label htmlFor="password">Повторите password:</label>
            <input
              id="password"
              type={typePassword2}
              name="password2"
              placeholder="Повторите passwors"
              required
            />
            {!visibilityPassword2 && <BiShow onClick={handleShowPassword2} />}
            {visibilityPassword2 && <BiHide onClick={handleHidePassword2} />}
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
