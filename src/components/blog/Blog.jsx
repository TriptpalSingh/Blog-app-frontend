import React, { useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom/dist';
import './blog.css';
import axios from 'axios';

function Blog(props) {
  const navigate = useNavigate();

  const handleBlogClick = (e) => {
    e.preventDefault();
    // alert("blog with id : "+props.id+" clicked")
    navigate('/openBlog', { state: { id: props.id } });
  }

  const handleClick = (e) => {
    alert("clicked");
  }

  const handleDelete = (e)=>{
    e.preventDefault();
    axios.put('http://localhost:5000/api/blogs/deleteBlog', {
      id:props.id
    }).then((res)=>{
      window.location.reload()
      console.log(res.data);
    })
  }

  const handleUpdate = (e)=>{
    e.preventDefault();
    navigate('/updateBlog', {state:{id:props.id}});
  }

  return (
    <>
      <div className='blog__outer'>
        <div className='blog__container' onClick={handleBlogClick}>
          <div className='blog__description'>
            {props.author && (
              <div className='blog__author'><FaUserAlt className="text-gray-400 m-2 userIcon" />{props.author}</div>
            )}

            <div className='blog__title'>{props.title}</div>
            <div className='blog__desc'>{props.desc}</div>
            <div className='blog__date'>
              Uploaded On:- {props.date.substring(0, 10)}

            </div>
          </div>
          <div className='blog__image'>
            <img src={props.imgUrl} alt='img'></img>
          </div>
        </div>
        {props.buttons && (
          <div className='blog__buttons'>
          <a href="#" className=" btns border-2 border-[#fbc9cc] text-[#fbc9cc] rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-[#fbc9cc]" onClick={handleUpdate}>Update</a>
          <a href="#" className=" btns border-2 border-[#fbc9cc] text-[#fbc9cc] rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-[#fbc9cc]" onClick={handleDelete}>Delete</a>
          </div>
        )}
      </div>

    </>
  )
}

export default Blog;