import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");

      try {
        const res = await fetch("http://localhost:5000/auth/verify-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.valid) {
          // Токен невалидный
          Cookies.remove("token");
          navigate("/login");
        } else {
          dispatch(
            setCredentials({
              userId: data.userInfo.userId,
              email: data.userInfo.email,
              name: data.userInfo.name,
              family: data.userInfo.family,
              avatar: data.userInfo.avatar,
              city: data.userInfo.city,
            })
          );
        }
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        navigate("/login");
      }
    };

    checkToken();
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default AuthCheck;
