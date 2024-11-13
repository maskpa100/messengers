import { Link } from "react-router-dom";
import s from "./Modal.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};
function Modal(props: Props) {
  const { setModal } = props;
  return (
    <div className={s.modal}>
      <div className={s.content}>
        <h3>Вы успешно зарегистрировались</h3>
        <Link to="/login" className={s.button}>
          Авторизироваться
        </Link>
        <IoIosCloseCircleOutline
          className={s.close}
          onClick={() => {
            setModal(false);
          }}
        />
      </div>
    </div>
  );
}
export default Modal;
