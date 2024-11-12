import s from "./App.module.scss";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dialogues from "./components/Dialogues/Dialogues";
import Setting from "./components/Setting/Setting";
import Search from "./components/Search/Search";
import Login from "./components/Login/Login";
import AuthCheck from "./components/AuthCheck";
import Registration from "./components/Registration/Registration";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuth = auth.auth && auth.auth === "yes";
  return (
    <div className={s.App}>
      <AuthCheck />
      <Header />

      <div className={s.mainContainer}>
        {isAuth && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dialog" element={isAuth && <Dialogues />} />
          <Route path="/dialog/:id" element={isAuth && <Dialogues />} />
          <Route path="/setting" element={isAuth && <Setting />} />
          <Route path="/search" element={isAuth && <Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
