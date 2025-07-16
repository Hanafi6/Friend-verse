import CreateLike from './CreateLike';

export default function LikeSection({ post,liked, onToggleLike }) {
  return (
    <div className="post-actions">
      <CreateLike  post={post} liked={liked} onToggle={onToggleLike} />
       {/* <span title="عدد التعليقات">{post.likes?.length || 0}</span> */}
    </div>
  );
}
