// app/Routs/user/[id]/page.jsx
'use client';

import { useAuth } from "../../../store/manegState";
import { useFrindStore } from "../../../store/FrindSlice";
import { useParams } from 'next/navigation';
import Post from '@/app/Commponents/Post';
import RenderPostes from "../../../Commponents/RenderPostes";
import { UserPlus, UserMinus } from 'lucide-react';
import '../../../commponents.css/UserProfile.css';
import { useEffect, useMemo } from "react";

export default function UserProfile() {
  const { users, User: currentUser,setUser:updateUser, posts } = useAuth();
  const { toggleFrind, setFrinds, setUsers, isFrind, frinds } = useFrindStore();
  const { id } = useParams();


  const user = users?.find(u => u.id == id);

  const isMyFrind = isFrind(user?.id);

  useEffect(()=>{
  },[currentUser,user])

  useEffect(() => {
    if (currentUser) {
      setFrinds(currentUser);
    }
    if (users) {
      setUsers(users); // مهم علشان تقدر تحدث الطرف التاني
    }
  }, [currentUser, users]);

  if (!users) return <div className="loading">جاري تحميل المستخدمين...</div>;
  if (!user) return <div className="loading">المستخدم غير موجود.</div>;

  const handleToggleFriend = (e) => {
    e.preventDefault();
    toggleFrind(currentUser.id, currentUser.Fname, user);
  };

  const userPosts = posts?.filter(post => post.userId == user?.id) || [];

  return (
    <div className="profile-page">
      <div className="user-card">
        <h2>{user.Fname} {user.Lname}</h2>
        <p className="bio">{user.bio || "لا توجد نبذة تعريفية."}</p>

        {currentUser.id !== user.id && (
          <button
            className={`btn ${isMyFrind ? "friend" : "add"}`}
            onClick={handleToggleFriend}
          >
            {isMyFrind ? (
              <>
                <UserMinus size={15} style={{ marginRight: '6px' }} />
                إزالة صديق
              </>
            ) : (
              <>
                <UserPlus size={15} style={{ marginRight: '6px' }} />
                إضافة صديق
              </>
            )}
          </button>
        )}
      </div>

      <div className="postes">
        <RenderPostes id={id}>
          {({ users, post, liked, currentUser, toggleLike, addComment }) => (
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
      </div>
    </div>
  );
}
