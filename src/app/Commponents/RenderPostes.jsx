// components/RenderPostes.jsx
import { useLayoutEffect } from 'react';
import { useAuth } from '../store/manegState';
import usePostStore from '../store/postSlice';

function RenderPostes({ children ,id}) {
  const { User,users,pos } = useAuth();
  const {fetchPosts, toggleLike,addComment ,posts} = usePostStore();

  useLayoutEffect(() => {
    fetchPosts()
  },[posts])

    const filteredPosts = id
    ? posts.filter(p => p.userId == id)
    : posts;


  return (
    < >
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post) =>
          children({
            toggleLike,
            addComment,
            post,
            user: post.userId, // ID فقط، إنت بتجيبه برا
            liked: post.likes?.includes(User?.id),
            currentUser: User,
            users
          })
        )
      ) : (
        <p>لا يوجد بوستات حالياً</p>
      )}
    </>
  );
}


// export default React.memo(RenderPostes)
export default RenderPostes;