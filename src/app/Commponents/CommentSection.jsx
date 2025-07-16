'use client'

import { useState } from 'react';
import CustomeCreate from './CustomeCreate';
import CreateComment from './CreateComment';
import SmartUserLink from './User';
export default function CommentSection({ postId, comments = [], users, onAddComment }) {
  const [showModal, setShowModal] = useState(false);


  const getUserName = (id) => {
    const user = users?.find((u) => u.id == id);
    return user ? user.Fname : `User ${id}`;
  };

  return (
    <>
      <CustomeCreate type='comment'>
        {({ registerCanClose, setErrMsg,setOpen }) => (
          <CreateComment
          setOpen={setOpen}
            setErrM={setErrMsg}
            registerCanClose={registerCanClose}
            onAdd={(text) => onAddComment(text)}
          />
        )}
      </CustomeCreate>

      <div className="post-comments">
        {comments.slice(0, 2).map((c, i) => (
          <div
            title={`created At ${c.createdAt}`}
            key={i}
            className="post-comment"
          >
            <b >{getUserName(c.userId)}:</b> {c.comment}
          </div>
        ))}

        {comments.length > 2 && (
          <div
            className="post-more-comments"
            onClick={() => setShowModal(true)}
            style={{ cursor: 'pointer', color: '#1877f2' }}
          >
            و {comments.length - 2} تعليق آخر...
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>كل التعليقات</h3>
            <div className="all-comments">
              {comments.map((c, i) => (
                <div key={i} className="modal-comment">
                  <b>{<SmartUserLink userId={c.userId} >
                    {getUserName(c.userId)}
                    </SmartUserLink>}:</b> {c.comment}
                  <div className="comment-meta">
                    <small>{c.createdAt?.slice(0, 10)}</small>
                  </div>
                </div>
              ))}
            </div>
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}
