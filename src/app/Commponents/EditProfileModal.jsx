"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../store/manegState";
import { api, PatchData } from "../FetchData/Fetch";
import '../commponents.css/EditProfileModal.css'

export default function EditProfileModal({ onClose }) {
  const { User, updateUser } = useAuth();
  const [Validate,setValidate] = useState(false);

  
  const [form, setForm] = useState({
    bio: User.bio,
  });

  const originalBio = useRef(User.bio); // حفظ القيمة الأصلية مرة واحدة

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...User, ...form };
      await PatchData(`${api}Users/${User.id}`, updatedUser);
      updateUser(updatedUser);
      onClose();
    } catch (err) {
      console.error("فشل التحديث:", err.message);
    }
  };

useEffect(() => {
  if (form.bio === originalBio.current) {
    setValidate(true);  // مفيش تغيير
  } else {
    setValidate(false); // في تعديل
  }
}, [form.bio]);


  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="close" disabled={Validate ?true:false} onClick={onClose}>X</button>
        <div className="modal-content">
          <h3>تعديل البروفايل</h3>
          <input
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="نبذة عنك"
          />
          <button  onClick={handleSave}>حفظ</button>
        </div>
      </div>
    </div>
  );
}
