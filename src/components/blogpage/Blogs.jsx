import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import './blogs.css';
import axios from 'axios';
import Blog from '../blog/Blog';
import userContextImport from '../../context/user/userContext';
import loginContextImport from '../../context/login/loginContext';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const userContext = useContext(userContextImport);
    const loginContext = useContext(loginContextImport);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/blogs/showAllBlogs").then((res) => {
            // console.log(blogs)
            setBlogs(res.data);
            // console.log(blogs);
        })
    }, [])

    const navActive = ({ isActive }) => {
        return {
            color: isActive ? "#f43f5e" : null,
        };
    };

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
                            end
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
                                className="text-gray-400 hover:text-gray-600 duration-300 ml-60"
                            >
                                Login
                            </NavLink>}
                        </li>

                </ul>
            </div>
        </div >
            <div className='blogs__outer'>
                {
                    blogs.map((blog) => <Blog title={blog.title} author={blog.author} desc={blog.desc} date={blog.date} imgUrl={blog.imgUrl} id={blog._id} />)
                }
            </div>

        </>
    )
}

export default Blogs