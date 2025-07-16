"use client";

import { useEffect, useState } from "react";
import '../commponents.css/CustomeCreate.css';

export default function CustomeCreate({ children, type }) {
  const [open, setOpen] = useState(false);
  const [errMSG, setErrMsg] = useState('');
  const [canClose, setCanClose] = useState(() => () => true);

  const OpenModal = () => {
    setErrMsg('');
    setOpen(true);
  };

  const CloseModal = () => {
    if (canClose()) {
      setOpen(false);
    } else {
      setErrMsg('❌ لا يمكن إغلاق النافذة بوجود محتوى مكتوب.');
    }
  };

  const registerCanClose = (fn) => setCanClose(() => fn);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <div className="modal-wrapper">
      <input
        onFocus={OpenModal}
        type="text"
        className={`modal-input ${type === 'comment' ? 'comment-input' : 'post-input'}`}
        placeholder={type === 'comment' ? 'اكتب تعليقك...' : 'بم تفكر؟'}
        readOnly={open}
      />

      {open && (
        <>
          <div className="modal-overlay" onClick={CloseModal}></div>
          <div className={`modal-container ${type === 'comment' ? 'comment-modal' : 'post-modal'}`}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={CloseModal}>✖</button>
              {errMSG && <p className="error-msg">{errMSG}</p>}
              {children({ registerCanClose, setErrMsg,setOpen })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
