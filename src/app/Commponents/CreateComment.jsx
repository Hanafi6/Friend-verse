import React, { useEffect, useState } from 'react';
import '../commponents.css/CreateComment.css';

export default function CreateComment({setOpen, setErrM,registerCanClose, onAdd }) {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (typeof registerCanClose === 'function') {
      registerCanClose(() => comment.trim() === '');
    }
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAdd(comment);
      setOpen(false)
      setComment('');
    }
  };

  return (
    <form className="create-comment" onSubmit={handleSubmit}>
      <span className="comment-logo" title="تعليق">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877f2" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 21l1.65-4.95C2.6 14.36 2 12.74 2 11c0-5.06 5.16-9 11-9s11 3.94 11 9-5.16 9-11 9c-1.74 0-3.36-.36-4.95-1.05L2 21z"/>
        </svg>
      </span>
      <input
        type="text"
        placeholder="اكتب تعليق..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        onInput={e => setErrM('')}
      />
      <button type="submit">تعليق</button>
    </form>
  );
}
