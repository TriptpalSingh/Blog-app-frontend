import React, { useContext, useRef, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import './addBlog.css';
import loginContextImport from '../../context/login/loginContext';
import userContextImport from '../../context/user/userContext';

function AddBlog() {
    const navigate = useNavigate();
    const titleRef = useRef();
    const descRef = useRef();
    const imgUrlRef = useRef();
    const contentRef = useRef();

    const navActive = ({ isActive }) => {
        return {
            color: isActive ? "#f43f5e" : null,
        };
    };

    const loginContext = useContext(loginContextImport);
    const userContext = useContext(userContextImport);

    const handleAddBlog = (e)=>{
        e.preventDefault();
        const title = titleRef.current.value;
        const desc = descRef.current.value;
        const imgUrl = imgUrlRef.current.value;
        const content = contentRef.current.value;
        // console.log({
        //     title, desc, imgUrl, content
        // })

        if(imgUrl == ""){
            axios.post("http://localhost:5000/api/blogs/addBlog", {
                title, desc, content
            }).then((res)=>{
                navigate("/UserBlogs")
                // console.log(res.data);
            })
            
            return;
        }

        axios.post("http://localhost:5000/api/blogs/addBlog", {
            title, desc, imgUrl, content
        }).then((res)=>{
            // console.log(res.data);
            navigate("/UserBlogs")
        })
        navigate("/UserBlogs")

    }

    const handleLogOut = async (e)=>{
        e.preventDefault();
        axios.get("http://localhost:5000/api/auth/logout");
        loginContext.setLoggedIn(false);
        userContext.setUser({
          name: "",
          username: ""
        })
        navigate('/');
        // window.location.reload(true);
      }


    const l_style = {
    position:"absolute",
    right:"50px"
    }

    return (
        <>
            <div className='blogs__header '>
                <div className="navbar flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5 lg:gap-0">

                    <ul className="menu flex gap-5">
                         <li>
                                <NavLink
                                    style={navActive}
                                    end
                                    to="/"
                                    className="text-4xl text-gray-800 hover:text-gray-800 duration-300 mr-20"

                                >
                                    BlogApp
                                </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={navActive}
                                end
                                to="/"
                                className="text-gray-400 hover:text-gray-600 duration-300"

                            >
                                All Blogs
                            </NavLink>
                        </li>

                        {loginContext.loggedIn ? (
                            <li>
                                <NavLink
                                    style={navActive}
                                    end
                                    to="/UserBlogs"
                                    className="text-gray-400 hover:text-gray-600 duration-300"

                                >
                                    {userContext.user.name}'s Blogs
                                </NavLink>
                            </li>
                        ) : (
                                < li >
                            <NavLink
                                style={navActive}
                                end
                                to="/UserBlogs"
                                className="text-gray-400 hover:text-gray-600 duration-300"

                            >
                                Your Blogs
                            </NavLink>
                            </li>
                        )}

                        <li>
                            <NavLink
                                style={navActive}
                                to="/addBlog"
                                className="text-gray-400 hover:text-gray-600 duration-300"
                            >
                                Add Blog
                            </NavLink>
                        </li>
                        <li>
                            {loginContext.loggedIn ? <NavLink
                            style={l_style}
                                end
                                to="/"
                                className="text-gray-400 hover:text-gray-600 duration-300"
                                onClick={handleLogOut}
                            >
                                Logout
                            </NavLink> :
                            <NavLink
                            style={l_style}
                                end
                                to="/Login"
                                className="text-gray-400 hover:text-gray-600 duration-300"
                            >
                                Login
                            </NavLink>}
                        </li>


                    </ul>
                </div>
            </div>
            {loginContext.loggedIn ? (
                <div className="scale-in-center flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <div className="bg-white rounded-2xl shadow-2xl flex w-5/5 max-w-4x1">
                        <div className="w-5/5  p-5">
                            <div className="py-10 px-12">
                                <h2 className="text-3xl font-bold text-[#fbc9cc] mb-2">Enter Information About The Blog</h2>
                                <div className="border-2 w-10 border-[#fbc9cc] inline-block mb-2"></div>

                                <div className="flex flex-col items-center ">
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        <input ref={titleRef} type="text" name="name" placeholder="Blog Title" className="bg-gray-100 outline-none text-md flex-1" />
                                    </div>
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        
                                        <input ref={descRef} type="text" name="username" placeholder="Blog Description" className="bg-gray-100 outline-none text-md flex-1" />
                                    </div>
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        <input ref={imgUrlRef} type="email" name="email" placeholder="Image URL" className="bg-gray-100 outline-none text-md flex-1" />
                                    </div>
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        <textarea ref={contentRef} type="password" name="password" placeholder="Blog Content" className="bg-gray-100 outline-none text-md flex-1" />
                                    </div>

                                    <a href="#" className="border-2 border-[#fbc9cc] text-[#fbc9cc] rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-[#fbc9cc]" onClick={handleAddBlog}>Add Blog</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ) : (
                <div className='userBlogs__loginFail'>
                    <p className="text-2xl lg:text-4xl font-semibold text-rose-300">
                        You are not logged in. To view your blogs, please log in.
                    </p>
                </div>
            )}

        </>
    )
}

export default AddBlog