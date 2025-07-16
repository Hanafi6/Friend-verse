'use client';

import { useAuth } from "@/app/store/manegState";

import '../../commponents.css/Frinds.css'; // Assuming you have a CSS file for styling
import { useSyncUser } from "../../../../customHooks/useSyncUser ";


export default function Frinds() {
    const { User } = useAuth();
    const frinds = User?.frinds || [];
    useSyncUser();

    const handelFrind = (ele) => {
      console.log(ele)
    }

    return (
    <div className="frinds-list">
      {frinds.length === 0 ? (
       <div className="no-frinds">لا يوجد أصدقاء بعد</div>
      ) : (
         frinds.map((frind, i) => (
        <div onClick={() => handelFrind(frind)} className="frind-card" key={frind.id || i}>
           <div className="frind-avatar" />
           <div className="frind-info">
            <div className="frind-name">{frind.Fname} {frind.Lname}</div>
          </div>
          <button className="frind-msg-btn">مراسلة</button>
        </div>
    ))
  )}
</div>

    );
}