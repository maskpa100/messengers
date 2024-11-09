import s from "./Header.module.scss";
import { BiMessageSquareDetail } from "react-icons/bi";
const Header: React.FC = () => {
  return (
    <>
      <div className={s.header}>
        <BiMessageSquareDetail />
        <p>Веб мессенджер</p>
      </div>
    </>
  );
};

export default Header;
