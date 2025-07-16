'use client';
import '../../commponents.css/Info.css';
import { Mail, Users, UserCheck, CalendarCheck, FileText, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../store/manegState';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditProfileModal from '../../Commponents/EditProfileModal'
import { useSyncUser } from '../../../../customHooks/useSyncUser ';

export default function UserInfo() {
  const [edite,setEdite] = useState(false)
  const { User: user, postes } = useAuth();
  const router = useRouter();
    useSyncUser();
  

  if (!user) return <div>...جاري التحميل</div>;

  const userPostsCount = postes?.filter(p => p.userId === user.id)?.length || 0;

  return (
    <div className="info-card">
      <button className="back-btn" onClick={() => router.back()}>
        <ArrowLeft size={18} />
        رجوع
      </button>

      <h2 className="info-name">{user.Fname} {user.Lname}</h2>
      <p className="info-bio">{user.bio}</p>

      <div className="info-stats">
        <div><Mail size={18} /> {user.email}</div>
        <div><Users size={18} /> عدد الأصدقاء: {user.frinds?.length || 0}</div>
        <div><UserCheck size={18} /> عدد المتابعين: {user.followers?.length || 0}</div>
        <div><FileText size={18} /> عدد المنشورات: {userPostsCount}</div>
        <div><CalendarCheck size={18} /> انضم منذ: 2024 (مثال ثابت)</div>
        <div onClick={e => setEdite(prev => !prev)} className='edite-profile'>Edite</div>
        {edite && <EditProfileModal onClose={e => setEdite(false)}/>}
      </div>
    </div>
  );
}
