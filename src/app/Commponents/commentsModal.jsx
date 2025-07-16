'use client';
import '../commponents.css/CommentsModal.css';
import SmartUserLink from './User';
import CreateComment from './CreateComment';

export default function CommentsModal({ post, users, currentUser, onAddComment, onClose }) {
  
  return (  
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* البوست الأساسي */}
        <div className="modal-post">
          <SmartUserLink userId={post.userId} />
          <div className="post-content">{post.content}</div>
          {post.image && <img src={post.image} className="modal-image" alt="post" />}
        </div>

        {/* كل التعليقات */}
        <div className="modal-comments">
          {post.comments.map((c, i) => {
            const user = users.find(u => u.id === c.userId);
            return (
              <div key={i} className="comment-item">
                <b>{<SmartUserLink userId={user?.id}>
                  {user?.Fname}dd
                  </SmartUserLink>}:</b> {c.comment}
                <div className="comment-meta">
                  <small>{c.createdAt?.slice(0, 10)}</small>
                  <span>❤️ {c.likes?.length || 0}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* إضافة تعليق */}
        <CreateComment
          registerCanClose={() => true}
          onAdd={(text) => onAddComment(post.id, text)}
        />

        <button className="close-modal" onClick={onClose}>إغلاق</button>
      </div>
    </div>
  );
}
