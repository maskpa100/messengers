import Cookies from "js-cookie";
import s from "./Search.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

type User = {
  id: number;
  family: string;
  email: string;
  name: string;
  avatar: string;
  city: string;
};
const Search: React.FC = () => {
  const token = Cookies.get("token");
  const [users, setUsers] = useState<User[]>();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget;

    const params = {
      family: formData.get("family"),
      name: formData.get("name"),
      city: formData.get("city"),
    };

    // Фильтруем объект, исключая null или пустые значения, и приводим все к строкам
    const filteredParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => value) // Оставляем только непустые значения
        .map(([key, value]) => [key, String(value)]) // Приводим значения к строкам
    );

    // Формируем строку запроса
    const queryString = new URLSearchParams(filteredParams).toString();

    console.log(queryString);

    try {
      const response = await fetch(`${apiUrl}/search?${queryString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setUsers(result.users);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className={s.search}>
      <form onSubmit={handleSubmit}>
        <div className={s.block}>
          <input type="text" name="family" placeholder="фамилия" />
        </div>
        <div className={s.block}>
          <input type="text" name="name" placeholder="имя" />
        </div>
        <div className={s.block}>
          <input type="text" name="city" placeholder="город" />
        </div>
        <button type="submit">Поиск</button>
      </form>
      <div className={s.users}>
        {users?.map((user) => (
          <div className={s.user} key={user.id}>
            <div className={s.left}>
              <img src={`${apiUrl}/uploads/${user.avatar}`} alt="photo" />
            </div>
            <div className={s.right}>
              <span className={s.name}>
                {user.family} {user.name}
              </span>
              <div className={s.city}>{user.city}</div>

              <Link to={`/dialog/${user.id}`}>Написать сообщения</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
