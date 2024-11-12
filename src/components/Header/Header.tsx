import { useSelector } from "react-redux";
import s from "./Header.module.scss";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RootState } from "../../store/store";
import { useLocation } from "react-router-dom";
const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const notAuth = auth.auth && auth.auth === "no";
  return (
    <>
      <div className={s.header}>
        <div className={s.left}>
          <BiMessageSquareDetail />
          <p>Веб мессенджер</p>
        </div>
        {notAuth && (
          <div className={s.right}>
            <a href="/login">Авторизация</a>
            <a href="/registration">Регистрация</a>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
