import { Link } from "react-router-dom";
import s from "./Sidebar.module.scss";
import { CiSettings } from "react-icons/ci";
import { TbMessageCircle } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className={s.sidebar}>
        <div className={s.info}>
          <img src="/photo/1.jpg" alt="photo" />
          <div className={s.name}>Александр Владимирович</div>
        </div>
        <div className={s.list}>
          <ul>
            <li>
              <Link to={`/dialog`}>
                <TbMessageCircle />
                <span>Диалоги</span>
              </Link>
            </li>
            <li>
              <Link to={`/setting`}>
                <CiSettings />
                <span>Настройка</span>
              </Link>
            </li>
            <li>
              <Link to={`/search`}>
                <CiSearch />
                <span>Поиск</span>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <IoMdExit />
              <span>Выход</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
