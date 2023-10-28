import React, { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope, FaUserAlt } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import axios from 'axios';
import loginContextImport from '../context/login/loginContext';
import userContextImport from '../context/user/userContext';
import './login.css';


function Login() {
    const [signupToggle, setSignupToggle] = useState(false);
    const navigate = useNavigate();
    const loginContext = useContext(loginContextImport);
    const userContext = useContext(userContextImport);
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const usernameRef = useRef();
    const url = "mongodb://localhost:27017";
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    function submitBtn(e) {
        e.preventDefault();

    }

    const handleSignUpClick = (e) => {
        e.preventDefault();
        if (signupToggle) {
            setSignupToggle(false);
        }
        else {
            setSignupToggle(true);
        }
    }

    const accountSignUp = (e)=>{
        e.preventDefault();
        const name = nameRef.current.value;
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("https://triluxo-assignment-backend.vercel.app/api/auth/register", {
            name, username, email, password
        }).then((res)=>{
            setSignupToggle(false);
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // console.log({email, password});
        axios.post("https://triluxo-assignment-backend.vercel.app/api/auth/login", { email, password }).then((res) => {
            loginContext.setLoggedIn(true);
            userContext.setUser({
                name: res.data.user.name,
                username: res.data.username
            })
            navigate('/');

        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            {!signupToggle ?
                <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <div className="scale-in-center bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl my-10">
                        {/* SignIn section */}
                        <div className="w-3/5  p-5">
                            <div className="py-10">
                                <h2 className="text-3xl font-bold text-[#fbc9cc] mb-2">Sign in to Account</h2>
                                <div className="border-2 w-10 border-[#fbc9cc] inline-block mb-2"></div>
                                
                                <p className="text-gray-400 my-10">or use your email account</p>
                                <div className="flex flex-col items-center ">
                                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                        <FaRegEnvelope className="text-gray-400 m-2" />
                                        <input ref={emailRef} type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>
                                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                        <MdLockOutline className="text-gray-400 m-2" />
                                        <input ref={passwordRef} type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>
                                    <div classname="flex w-64 mb-5">
                                        <label className="flex items-center text-xs"><input type="checkbox" name="remember" className="mr-1" />Remember me</label>
                                        <a href="#" className="text-xs">Forgot Password?</a>
                                    </div>
                                    <a href="#" className="border-2 border-[#fbc9cc] text-[#fbc9cc] rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-[#fbc9cc]" onClick={handleLoginClick}>Sign In</a>
                                </div>
                            </div>
                        </div>


                        {/* SignUp section */}
                        <div className="w-2/5 bg-[#fbc9cc] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
                            <div className="border-2 w-10 border-white inline-block mb-2"></div>
                            <p className="mb-10">Fill up personal information and start journey with us.</p>
                            <a href="#" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#fbc9cc]" onClick={handleSignUpClick}>Sign Up</a>
                        </div>
                    </div>
                </div>
                :
                <div className="scale-in-center flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <div className="bg-white rounded-2xl shadow-2xl flex w-2/5 max-w-4xl my-10">
                        {/* SignIn section */}
                        <div className="w-5/5  p-5">
                            <div className="py-10 px-12">
                                <h2 className="text-3xl font-bold text-[#fbc9cc] mb-2">Enter Your Information</h2>
                                <div className="border-2 w-10 border-[#fbc9cc] inline-block mb-2"></div>

                                <div className="flex flex-col items-center ">
                                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                        <FaUserAlt className="text-gray-400 m-2" />
                                        <input ref={nameRef} type="text" name="name" placeholder="Full Name" className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>
                                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                        <FaUserAlt className="text-gray-400 m-2" />
                                        <input ref={usernameRef} type="text" name="username" placeholder="Username" className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>
                                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                        <FaRegEnvelope className="text-gray-400 m-2" />
                                        <input ref={emailRef} type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>
                                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                        <MdLockOutline className="text-gray-400 m-2" />
                                        <input ref={passwordRef} type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                                    </div>

                                    <a href="#" className="border-2 border-[#fbc9cc] text-[#fbc9cc] rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-[#fbc9cc]" onClick={accountSignUp}>Sign Up</a>
                                </div>
                            </div>
                            <div classname="flex w-64 mb-5">
                                {/* <label className="flex items-center text-xs"><input type="checkbox" name="remember" className="mr-1"/>Remember me</label> */}
                                <span href="#" className="text-s">Already have an Account? <a className='text-1.5xl font-bold text-[#fbc9cc] loginBtn' onClick={handleSignUpClick}>Login</a></span>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Login

