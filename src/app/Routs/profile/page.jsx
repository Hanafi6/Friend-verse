'use client';

import { useAuth } from "../../store/manegState";
import '../../commponents.css/profile.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Post from "../../Commponents/Post"; // ✅ استدعاء كمبوننت البوست
import RenderPostes from "../../Commponents/RenderPostes";

export default function Profile() {
  const Routs = useRouter();
  const { User, posts } = useAuth();

  const userPosts = posts && posts.filter(post => post.userId == User?.id); // ✅ فلترة بوستات المستخدم
  return (
    <>
        <div className="profile-container">
        <div className="profile-card">
         <div className="profile-left">
           <div onClick={e => console.log('add Photo')} className="profile-avatar" />
           <div className="profile-info">
            <div className="profile-name">{User?.Fname} {User?.Lname}</div>
            <div className="profile-username">{User?.email || 'username'}</div>
           </div>
          </div>
          <div className="profile-actions">
            <Link className="friend-button" href='/Routs/frinds'>أصدقاء</Link>
            <div
              onClick={() => Routs.push('/Routs/info')}
             title="المزيد"
             className="more-info"
           >
            <span>•</span><span>•</span><span>•</span>
          </div>
        </div>
      </div>
        </div>

      <div className="profile-posts">

                <RenderPostes id={User?.id}>
                  {({users, post, liked, currentUser ,toggleLike,addComment}) => (
                  <Post
                    key={post.id}
                    post={post}
                    user={users?.find((u) => u.id == post.userId)}
                    liked={liked}
                    onToggleLike={() => toggleLike(post.id, currentUser.id)}
                    onAddComment={(comment) => addComment(post.id, currentUser.id, comment)}
                    currentUser={currentUser}
                    users={users}
                />
              )}
            </RenderPostes>

       {userPosts?.length > 0 && (
          <div className="end-posts">End of Posts</div>
        )}
      </div>
    </>
  );
};