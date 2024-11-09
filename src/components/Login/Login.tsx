import s from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { setCredentials } from "../../store/slices/authSlice";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        dispatch(
          setCredentials({
            userId: data.user.userId,
            username: data.user.username,
            avatar: data.user.avatar,
          })
        );
        Cookies.set("token", data.token); // Сохраняем токен
        navigate("/dialog");
      } else {
        console.error("Login failed:", data.message);
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className={s.login}>
      <form onSubmit={handleLogin}>
        <h1>Авторизация</h1>
        <div className={s.block}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={s.block}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Введите passwors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Авторизироваться</button>
      </form>
    </div>
  );
};

export default Login;
