import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";

const AuthCheck: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/auth/verify-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(res.ok);
        console.log(data.valid);
        console.log(data);

        if (!res.ok || !data.valid) {
          // Токен невалидный
          Cookies.remove("token");
          navigate("/login");
        } else {
          dispatch(
            setCredentials({
              userId: data.userInfo.userId,
              username: data.userInfo.name,
              avatar: data.userInfo.avatar,
            })
          );

          navigate("/dialog");
        }
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        navigate("/login");
      }
    };

    checkToken();
  }, []);

  return null;
};

export default AuthCheck;
