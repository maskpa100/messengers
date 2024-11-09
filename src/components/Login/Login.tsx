import s from "./Login.module.scss";
const Login: React.FC = () => {
  return (
    <div className={s.login}>
      <div className={s.form}>
        <h1>Авторизация</h1>
        <div className={s.block}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" placeholder="Введите email" />
        </div>
        <div className={s.block}>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Введите passwors" />
        </div>
        <button>Авторизироваться</button>
      </div>
    </div>
  );
};

export default Login;
