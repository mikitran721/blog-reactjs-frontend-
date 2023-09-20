import "./App.css";
import "./css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Dashboar from "./components/Dashboard";
// import Login from "./components/Login";
import Login from "./components/Login.js";
import Register from "./components/Register";
import PrivateRoutes from "./layouts/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Layout from "./layouts/Layout";
import { toast } from "react-toastify";
import UserList from "./components/user/UserList";
import UserAdd from "./components/user/UserAdd";
import UserUpdate from "./components/user/UserUpdate";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import PostList from "./components/post/PostList";
import PostAdd from "./components/post/PostAdd";
import PostUpdate from "./components/post/PostUpdate";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboar />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/edit/:id" element={<UserUpdate />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/add" element={<UserAdd />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/post/add" element={<PostAdd />} />
            <Route path="/post/edit/:id" element={<PostUpdate />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
