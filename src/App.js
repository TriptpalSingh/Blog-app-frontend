import { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Blogs from "./components/blogpage/Blogs";
import UserBlogs from "./components/userBlogs/UserBlogs";
import AddBlog from "./components/addBlog/AddBlog";
import OpenBlog from "./components/openBlog/OpenBlog";
import UpdateBlog from "./components/updateBlog/UpdateBlog";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import LoginState from "./context/login/loginState";
import BlogState from "./context/blogs/blogState";
import UserState from "./context/user/userState";


const App = () => {
  

  return (
    <>
      <LoginState>
        <UserState>
          <BlogState>
            <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
              
              <Routes>
                
                <Route
                  exact path="/"
                  element={<Blogs />}
                />
                <Route
                  exact path="/UserBlogs"
                  element={<UserBlogs />}
                />
                <Route
                  exact path="/addBlog"
                  element={<AddBlog />}
                />
                <Route
                  exact path="/updateBlog"
                  element={<UpdateBlog />}
                />
                <Route
                  exact path="/openBlog"
                  element={<OpenBlog />}
                />
                <Route
                  path="/Login"
                  element={<Login />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </BlogState>
        </UserState>
      </LoginState>
    </>
  );
};

export default App;
