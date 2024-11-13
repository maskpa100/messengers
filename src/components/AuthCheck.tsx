import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth, setCredentials } from "../store/slices/authSlice";

const AuthCheck: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");

      try {
        const res = await fetch(`/auth/verify-token`, {
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
          dispatch(setAuth({ auth: "no" }));
        } else {
          dispatch(
            setCredentials({
              userId: data.userInfo.userId,
              email: data.userInfo.email,
              name: data.userInfo.name,
              family: data.userInfo.family,
              avatar: data.userInfo.avatar,
              city: data.userInfo.city,
              auth: "yes",
            })
          );
        }
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        navigate("/login");
        dispatch(setAuth({ auth: "no" }));
      }
    };

    checkToken();
  }, [dispatch]);

  return null;
};

export default AuthCheck;
