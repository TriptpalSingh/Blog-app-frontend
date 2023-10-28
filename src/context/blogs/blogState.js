import blogContext from "./blogContext";
import react, {useState} from 'react';

const BlogState = (props)=>{

    const obj  = [
        {
            title: "first blog",
            author: "triptpal singh",
            content: "this the blog's content."
        },
        {
            title: "second blog",
            author: "triptpal singh",
            content: "this the blog's content."
        },
        {
            title: "third blog",
            author: "triptpal singh",
            content: "this the blog's content."
        },
        
    ]

    const [blogs, setBlogs] = useState(obj);

    return(
        <blogContext.Provider value={{blogs, setBlogs}}>
            {props.children}
        </blogContext.Provider>
    )
}

export default BlogState;