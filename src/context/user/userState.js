import axios from "axios";
import userContext from "./userContext";
import react, {useState, useEffect} from 'react'

const UserState = (props)=>{

    const [user, setUser] = useState({
        name: "",
        username: ""
    })
    useEffect(()=>{
        axios.get("http://localhost:5000/api/auth/getInfo").then((res)=>{
            setUser({
                name: res.data.name,
                username: res.data.username
            })
            console.log(res.data);
        })
    },[])

    return(
        <userContext.Provider value={{user, setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;