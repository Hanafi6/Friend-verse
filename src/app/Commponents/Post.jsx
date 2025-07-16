import '../commponents.css/post.css'; 
import SmartUserLink from './User';
import LikeSection from './LikeSection';
import CommentSection from './CommentSection.jsx';

export default function Post({ post, user, onAddComment, onToggleLike, liked, currentUser, users }) {
  return (
    <div className="post-card" key={post.id||Math.random()}>
      <div className="post-header">
        <SmartUserLink userId={post.userId} >
          {user?.Fname}
        </SmartUserLink>
        <span title={post.createdAt} className="post-date">{post.createdAt?.slice(0, 10)}</span>
      </div>

      <div className="post-content">{post.content}</div>

      {post.image && post.image.length > 5 && (
        <img className="post-image" src={post.image} alt="post" />
      )}

      <LikeSection post={post} liked={liked} onToggleLike={onToggleLike} />

      <CommentSection
        postId={post.id}
        comments={post.comments}
        users={users}
        onAddComment={onAddComment}
      />
    </div>
  );
}
