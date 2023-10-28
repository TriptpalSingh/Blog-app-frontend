import loginContext from "./loginContext";
import react, {useState, useContext, useEffect} from 'react';
import axios from "axios";

const LoginState = (props)=>{
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(()=>{
        axios.get('https://triluxo-assignment-backend.vercel.app/api/auth/checkLoggedIn').then((res)=>{
            console.log(loggedIn);
            setLoggedIn(res.data);
        })
    },[])
    return(
        <loginContext.Provider value={{loggedIn, setLoggedIn}}>
            {props.children}
        </loginContext.Provider>
    )
}

export default LoginState;