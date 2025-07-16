// store/FrindSlice.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PatchData } from '../FetchData/Fetch';

export const useFrindStore = create(
  persist(
    (set, get) => ({
      frinds: [],
      users: [], // لازم يكون عندك نسخة من كل المستخدمين هنا عشان نعدل على الطرف التاني

      setFrinds: (user) => {
        set({ frinds: user.frinds || [] });
      },

      setUsers: (allUsers) => {
        set({ users: allUsers });
      },

      isFrind: (userId) => {
        return get().frinds.some(f => f.id == userId);
      },

      toggleFrind: async (currentUserId, currentUserName, targetUser) => {
        const { users } = get();
        const freshTarget = users.find(u => u.id == targetUser.id) || targetUser;


        set((state) => {
          const isFrind = state.frinds.some(f => f?.id == freshTarget?.id);
          let updatedFrinds;
          
          if (isFrind) {
            updatedFrinds = state.frinds.filter(f => f.id != freshTarget?.id);
            
            // حذف currentUser من targetUser
            const targetUpdated = (freshTarget.frinds || []).filter(f => f.id != currentUserId);

            PatchData(`http://localhost:5000/Users/${freshTarget.id}`, {
              frinds: targetUpdated,
            });
          } else {
            const lightUser = { id: +freshTarget.id, Fname: freshTarget.Fname };
            updatedFrinds = [...state.frinds, lightUser];

            // إضافة currentUser عند targetUser
            const targetUpdated = [...(freshTarget.frinds || []), { id: currentUserId, Fname: currentUserName }];
            PatchData(`http://localhost:5000/Users/${freshTarget.id}`, {
              frinds: targetUpdated,
            });
          }

          // تحديث المستخدم الحالي في الـ API
          PatchData(`http://localhost:5000/Users/${currentUserId}`, {
            frinds: updatedFrinds,
          });

          return { frinds: updatedFrinds };
        });
      },
    }),
    {
      name: 'frinds-storage',
    }
  )
);
