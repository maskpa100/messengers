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
function App() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/registration";
  return (
    <div className={s.App}>
      <Header />
      <div className={s.mainContainer}>
        {!isLoginPage && (
          <AuthCheck>
            <Sidebar />
          </AuthCheck>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/dialog"
            element={
              <AuthCheck>
                <Dialogues />
              </AuthCheck>
            }
          />
          <Route
            path="/dialog/:id"
            element={
              <AuthCheck>
                <Dialogues />
              </AuthCheck>
            }
          />
          <Route
            path="/setting"
            element={
              <AuthCheck>
                <Setting />
              </AuthCheck>
            }
          />
          <Route
            path="/search"
            element={
              <AuthCheck>
                <Search />
              </AuthCheck>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
