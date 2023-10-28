import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import './OpenBlog.css';
import axios from 'axios';

function OpenBlog() {
    const location = useLocation();
    const [blog, setBlog] = useState({});

    useEffect(()=>{
        axios.put("https://triluxo-assignment-backend.vercel.app/api/blogs/openBlog", {
            id:location.state.id
        }).then((res)=>{
            setBlog(res.data);
            // console.log(res.data.content);
        })
    },[])
    


  return (
    <>
        <div className='outer'>
            <div className='image'>
                <img src={blog.imgUrl} alt='img'></img>
            </div>
            <div className='title'>{blog.title}</div>
            <div className='author'>{blog.author}</div>
            <div className='content'>{blog.content}</div>
        </div>
    </>
  )
}

export default OpenBlog