import { Link, useNavigate } from "react-router-dom";
import s from "./Sidebar.module.scss";
import { CiSettings } from "react-icons/ci";
import { TbMessageCircle } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import Cookies from "js-cookie";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;

  const exit = () => {
    Cookies.remove("token");
    navigate("/login");
    dispatch(setAuth({ auth: "no" }));
  };
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <>
      <div className={s.sidebar}>
        <div className={s.info}>
          <img src={`${apiUrl}/uploads/${auth.avatar}`} alt="photo" />
          <div className={s.name}>
            {auth.family} {auth.name}
          </div>
          <div className={s.city}>{auth.city}</div>
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
            <li onClick={exit}>
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
