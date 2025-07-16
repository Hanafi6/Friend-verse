// 'use client';

// import { useState } from 'react';
// import '../commponents.css/Users.css';
// import { useRouter } from 'next/navigation';

// export default function Users(user) {
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

 
//   return (
//     <>
//       <div  className="user-card" onClick={handleClick} onContextMenu={handleContextMenu}>
//         <h2 className="user-name">{user.name}</h2>
//         <p><strong>رقم التعريف:</strong> {user.id}</p>
//         <p><strong>العمر:</strong> {user.age} سنة</p>
//         <p><strong>الراتب:</strong> {user.salary?.toLocaleString()} جنيه</p>
//         <p><strong>الطول:</strong> {user.height} سم</p>
//         <p><strong>الوزن:</strong> {user.weight} كجم</p>
//       </div>

//       {menuVisible && (
//         <>
//           <ul
//             className="context-menu"
//             style={{ top: menuPosition.y, left: menuPosition.x }}
//             onMouseLeave={handleCloseMenu}
//           >
//             <li onClick={() => handleOption("عرض التفاصيل")}>عرض التفاصيل</li>
//             <li onClick={() => handleOption("تعديل")}>تعديل</li>
//             <li onClick={() => handleOption("حذف")}>حذف</li>
//           </ul>
//           <div className="overlay" onClick={handleCloseMenu}></div>
//         </>
//       )}
//     </>
//   );
// }
