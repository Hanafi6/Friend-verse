"use client";

import Link from "next/link";
import { useAuth } from "@/app/store/manegState";
import '../commponents.css/SmartUserLink.css'

export default function SmartUserLink({ userId }) {
  const { users, User: currentUser } = useAuth();
  if (!users || !currentUser) return null;

  const user = users.find((u) => u.id == userId);

  if (!user) return <span>Unknown User</span>;

  // لاحظ أن بعض البيانات قد تكون frinds أو friends حسب الداتا
  const isFriend = Array.isArray(currentUser.frinds)
    ? currentUser.frinds.some((f) => f.id === userId)
    : false;
  
  return (
    <Link href={`/Routs/user/${user.id}`}>
      <div className="smart-user-link">
        {user.Fname}
        {/* {isFriend ? 'Frind' : "Add Frind"} */}
      </div>
    </Link>
  );
}
