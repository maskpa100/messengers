import s from "./App.module.scss";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dialogues from "./components/Dialogues/Dialogues";
import Setting from "./components/Setting/Setting";
import Search from "./components/Search/Search";
import Login from "./components/Login/Login";
function App() {
  return (
    <div className={s.App}>
      <Header />
      <div className={s.mainContainer}>
        <Login />
        {/*
        <Sidebar />
        <Routes>
          <Route path="/dialog" element={<Dialogues />} />
          <Route path="/dialog/:id" element={<Dialogues />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        */}
      </div>
    </div>
  );
}

export default App;
