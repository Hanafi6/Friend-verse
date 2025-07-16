'use client';

import { useAuth } from "@/app/store/manegState"
import { useRouter } from "next/navigation"
import { useEffect, useState,useRef, useLayoutEffect } from "react"
import '../../commponents.css/HomePage.css'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, GetData,PatchData } from "@/app/FetchData/Fetch";
import Post from "@/app/Commponents/Post";
import CreatePost from "@/app/Commponents/CreatePost";
// import CreateComment from "@/app/Commponents/CreateComment";
// import CreateLike from "@/app/Commponents/CreateLike";
import Lodding from "../../Commponents/lodding";
import CustomeCreate from "../../Commponents/CustomeCreate";
import RenderPostes from "../../Commponents/RenderPostes";
import usePostStore from "../../store/postSlice";
import { useFrindStore } from "../../store/FrindSlice";


export default function Home() {

  const contentRef = useRef('');

  const queryClient = useQueryClient();

    const {isAuthnticated,User,users,posts,setPosts } = useAuth();
    const {setFrinds,frinds} = useFrindStore();
    const { toggleLike, addComment } = usePostStore();
    const rout = useRouter()
    const [showForm, setShowForm] = useState(false);
    const [MSG, setMSG] = useState(true);

     useEffect(() => {
        setMSG(true);
      }, []);
      


      const { data, isLoading, error } = useQuery({
        queryKey: ['Postes'],
        queryFn: async () => GetData(`${api}Postes`),
        refetchInterval: 1000, // كل 3 ثواني
        staleTime: 5 * 1000,          // يعتبرها طازة لمدة 5 ثواني
        refetchIntervalInBackground: true,
        
      });
    
    // جلب المستخدمين أيضًا
    const { data: usersData } = useQuery({
        queryKey: ['Users'],
        queryFn: async () => GetData(`${api}Users`),
        staleTime: 5 * 1000, 
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    });

    const [ready, setReady] = useState(false);
    
    useEffect(() => {
      setReady(true);
    }, []);

    
    useEffect(() => {
          if (data && Array.isArray(data)) {
            setPosts(data)
          }
              console.log(User)

    
    }, [data])




             
    
    useEffect(() => {
      if (ready && !isAuthnticated) {
        rout.push('/Routs/login');
      }
    }, [ready, isAuthnticated]);
    
    // دالة للحصول على اسم المستخدم من userId
    const getUserName = (id) => {
        if (!usersData) return `User ${id}`;
        const user = usersData.find(u => u.id === id);
        return user ? user.name : `User ${id}`;
    };

    // إضافة بوست جديد
    const handleAddPost = (post) => {
      setPosts([{...post, id: Date.now(), userId: User.id, likes: [], comments: [], createdAt: new Date().toISOString()}, ...posts]);
    };

    // إضافة تعليق
const handleAddComment = async (postId, commentText) => {
  const date = new Date().toISOString();

  const newComment = {
    userId: User.id,
    comment: commentText,
    createdAt: date,
  };

  // 1. تحديث البيانات محليًا
  const updatedPosts = posts.map(p =>
    p.id === postId
      ? {
          ...p,
          comments: [...(p.comments || []), newComment],
        }
      : p
  );

  setPosts(updatedPosts); // تحديث Zustand
  queryClient.setQueryData(['Postes'], updatedPosts); // تحديث الكاش

  // 2. إرسال التعديل إلى السيرفر
  const updatedPost = updatedPosts.find(p => p.id === postId);

  try {
    await PatchData(`${api}Postes/${postId}`, updatedPost);
  } catch (err) {
    console.error("❌ فشل إرسال التعليق:", err.message);
  }
};


    // إضافة/إلغاء إعجاب
const handleToggleLike = async (postId, post) => {
  const updatedPosts = posts.map(p =>
    p.id === postId
      ? {
          ...p,
          likes: p.likes.includes(User.id)
            ? p.likes.filter(id => id !== User.id)
            : [...(p.likes || []), User.id],
        }
      : p
  );

  setPosts(updatedPosts); // تحديث Zustand
  queryClient.setQueryData(['Postes'], updatedPosts); // تحديث الكاش

  const updatedPost = updatedPosts.find(e => e.id === postId);

  try {
    await PatchData(`${api}Postes/${Number(postId)}`, updatedPost);
  } catch (err) {
    console.error("فشل في إرسال الباتش:", err.message);
  }
};

    return(
        <div className="home-sec">

          {/* <CreatePost onAdd={handleAddPost} /> */}
          {isLoading && <Lodding/>}
          {error && <div>حدث خطأ أثناء جلب البيانات</div>}
          {posts && posts.length === 0 && <div>لا توجد بوستات</div>}
          

          <CustomeCreate type='post'>
           {({ registerCanClose,setErrMsg ,setOpen}) => (
             <CreatePost  setErrMsg={setErrMsg} registerCanClose={registerCanClose} setOpen={setOpen} />
            )}
          </CustomeCreate>


      {!MSG && showForm && (
        <p style={{ color: "red", textAlign: "center" }}>
          لا يمكنك إغلاق الفورم إلا بعد إكمال البوست أو إفراغ الحقول!
        </p>
      )}
        <RenderPostes >
          {({ users,post, liked, currentUser ,toggleLike,addComment}) => (
          <Post
            key={post.id}
            post={post}
            user={users?.find((u) => u.id === post.userId)}
            liked={liked}
            onToggleLike={() => toggleLike(post.id, currentUser.id)}
            onAddComment={(comment) => addComment(post.id, currentUser.id, comment)}
            currentUser={currentUser}
            users={users}
        />
      )}
    </RenderPostes>
        {posts && posts.length > 0 && (
          <div className="end-posts">
            End Posts
          </div>
        )}

        </div>

    )
}
