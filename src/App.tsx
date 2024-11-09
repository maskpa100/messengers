import React from "react";
import logo from "./logo.svg";
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
import Dialog from "./components/Dialog/Dialog";
function App() {
  return (
    <div className={s.App}>
      <Header />
      <div className={s.mainContainer}>
        <Sidebar />
        <Routes>
          <Route path="/dialog" element={<Dialogues />} />
          <Route path="/dialog/:id" element={<Dialogues />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
