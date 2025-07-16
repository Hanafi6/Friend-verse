import React, { useState, useEffect } from 'react';
import '../commponents.css/CreatePost.css';
import { api, PostData } from '../FetchData/Fetch';
import {useAuth} from '../store/manegState'
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePost({ registerCanClose,setErrMsg,setOpen }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const {User,posts,setPosts} = useAuth();
  const queryClient = useQueryClient();



  const [err,setErr] = useState({
    errMsg:'',
    err:false
  });

  const resetPost = (date) => {
    const NewPost = {
      userId:User.id,
      likes:[],
      createdAt:date,
      comments:[],
      content,
      image:''
    };

    
    setPosts([...posts,NewPost]);
    
    PostData(`${api}Postes/`,NewPost);


    
    queryClient.setQueryData(['Postes'], posts); // تحديث الكاش

     registerCanClose(() => true);
      setOpen(false)

  }

  // ❗ سجل دالة التأكد في أول تحميل
  useEffect(() => {
    registerCanClose(() => {
      return content.trim() === '' ;
    });
  }, [content, image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && content.length > 5 && content.length < 200 ) {
      // setContent('');
      resetPost(new Date().toISOString());

    } else {
      setErr({
        err:'Incorrect Val',
        setErr:true
      })
    }
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>إنشاء بوست</h3>
      </div>

      <textarea
        placeholder="اكتب بوست جديد..."
        value={content}
        onChange={e => setContent(e.target.value)}
        onInput={e => setErrMsg('')}
      />

      {/* {err.errMsg && err.errMsg} */}
      <button type="submit" className="submit-btn">نشر</button>
    </form>
  );
}
