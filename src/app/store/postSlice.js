import { create } from 'zustand'
import { GetData, PatchData } from '@/app/FetchData/Fetch'

const usePostStore = create((set) => ({
  posts: [],
  setPosts: (data) => set({ posts: data }),

  fetchPosts: async () => {
    const data = await GetData('http://localhost:5000/Postes');
    set({ posts: data });
  },

  toggleLike: async (postId, userId) => {
    set((state) => {
      const updated = state.posts.map((p) =>
   {
       return  p.id == postId ? {
              ...p,
              likes: p.likes.includes(userId)
                ? p.likes.filter((id) => id !== userId)
                : [...(p.likes || []), userId],
            }
          : p
   }
        );
      PatchData(`http://localhost:5000/Postes/${postId}`, updated.find(p => p.id == postId));
      return { posts: updated };
    });

  },

  addComment: async (postId, userId, comment) => {
    set((state) => {
      const updated = state.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, {
                userId,
                comment,
                createdAt: new Date().toISOString()
              }]
            }
          : p
      );
      PatchData(`http://localhost:5000/Postes/${postId}`, updated.find(p => p.id === postId));
      return { posts: updated };
    });
  }
}));

export default usePostStore;
