import { ThumbsUp } from 'lucide-react';

export default function CreateLike({ post, liked, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      background: 'none',
      border: 'none',
      color: liked ? '#1877f2' : '#555',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      cursor: 'pointer'
    }}>

      <ThumbsUp color={liked ? '#1877f2' : '#888'} size={18} />
      {post.likes.length}
    </button>
  );
}
