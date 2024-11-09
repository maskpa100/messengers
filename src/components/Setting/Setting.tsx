import s from "./Setting.module.scss";
const Setting: React.FC = () => {
  return (
    <div className={s.setting}>
      <h2>Настройки пользователя</h2>
      <div className={s.form}>
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
        <button>Сохранить</button>
      </div>
    </div>
  );
};

export default Setting;
