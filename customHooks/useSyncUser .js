// hooks/useSyncUser.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../src/app/store/manegState';
import { useEffect } from 'react';

export const useSyncUser = () => {
  const { User, setUser } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ['sync-user', User?.id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/Users/${User?.id}`);
      return res.data;
    },
    enabled: !!User, // شغّلها بس لو فيه يوزر
    refetchInterval: 60 * 1000, // ⏱ يحدث كل دقيقة
  });

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(User)) {
      setUser(data); // ✅ تحديث بيانات اليوزر
    }
  }, [data]);
  
  return { refetch };
};
