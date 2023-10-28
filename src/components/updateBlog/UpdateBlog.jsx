import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import './updateBlog.css';
import axios from 'axios';
import loginContextImport from '../../context/login/loginContext';
import userContextImport from '../../context/user/userContext';

function UpdateBlog() {
    const location = useLocation();
    const navigate = useNavigate();
    const titleRef = useRef();
    const descRef = useRef();
    const imgUrlRef = useRef();
    const contentRef = useRef();

    const [preValues, setPreValues] = useState({});
    const id = location.state.id;
    // console.log(id);
    useEffect(()=>{
        axios.put('https://triluxo-assignment-backend.vercel.app/api/blogs/openBlog', {
            id
        }).then((res)=>{
            setPreValues(res.data);
        })
    },[])

    const navActive = ({ isActive }) => {
        return {
            color: isActive ? "#f43f5e" : null,
        };
    };

    const loginContext = useContext(loginContextImport);
    const userContext = useContext(userContextImport);

    const handleChangeTitle = (e)=>{
        setPreValues({
            title:e.target.value
        })
        
    }

    const handleChangeDesc = (e)=>{
        setPreValues({
            desc:e.target.value
        })
    }

    const handleChangeImgUrl = (e)=>{
        setPreValues({
            imgUrl:e.target.value
        })
    }

    const handleChangeContent = (e)=>{
        setPreValues({
            content:e.target.value
        })
    }

    

    const handleUpdateBlog = (e)=>{
        e.preventDefault();
        const title = titleRef.current.value;
        const desc = descRef.current.value;
        const imgUrl = imgUrlRef.current.value;
        const content = contentRef.current.value;

        axios.put("https://triluxo-assignment-backend.vercel.app/api/blogs/updateBlog", {
            id, title, desc, imgUrl, content
        }).then((res)=>{
            // console.log(res.data);
            navigate("/UserBlogs")
        })

    }

    return (
        <>
            <div className='blogs__header '>
                
            </div>
            {loginContext.loggedIn ? (
                <div className="scale-in-center flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <div className="bg-white rounded-2xl shadow-2xl flex w-5/5 max-w-4x1">
                        <div className="w-5/5  p-5">
                            <div className="py-10 px-12">
                                <h2 className="text-3xl font-bold text-[#fbc9cc] mb-2">Enter The Updated Information About The Blog</h2>
                                <div className="border-2 w-10 border-[#fbc9cc] inline-block mb-2"></div>

                                <div className="flex flex-col items-center ">
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        <input ref={titleRef} type="text" name="name" placeholder="Blog Title" value={preValues.title} className="bg-gray-100 outline-none text-md flex-1" onChange={handleChangeTitle}/>
                                    </div>
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        
                                        <input ref={descRef} type="text" name="username" value={preValues.desc} placeholder="Blog Description" className="bg-gray-100 outline-none text-md flex-1" onChange={handleChangeDesc}/>
                                    </div>
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        <input ref={imgUrlRef} type="email" name="email" value={preValues.imgUrl} placeholder="Image URL" className="bg-gray-100 outline-none text-md flex-1" onChange={handleChangeImgUrl}/>
                                    </div>
                                    <div className="bg-gray-100 w-full p-2 flex items-center mb-5">
                                        <textarea ref={contentRef} type="password" value={preValues.content} name="password" placeholder="Blog Content" className="bg-gray-100 outline-none text-md flex-1" onChange={handleChangeContent}/>
                                    </div>

                                    <a href="#" className="border-2 border-[#fbc9cc] text-[#fbc9cc] rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-[#fbc9cc]" onClick={handleUpdateBlog}>Update Blog</a>
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

export default UpdateBlog