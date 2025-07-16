'use client';

import { useAuth } from "../store/manegState";
import { LogOut as LogOutIcon } from "lucide-react"; // أيقونة الخروج
import '../commponents.css/LogOut.css';

export default function LogOut() {
  const { LogOut } = useAuth();

    
  return (
    <button className="logout-btn" onClick={ e => {
      LogOut();
      const a = document.createElement('a');

      a.href = '/Routs/login';

      a.click()
    }}>
      <LogOutIcon size={15} style={{ marginRight: "1px" }} />
      Log Out
    </button>
  );
}
