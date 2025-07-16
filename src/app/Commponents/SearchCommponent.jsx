// 'use client';
// import React, { useState } from 'react';
// import { SearchIcon } from 'lucide-react';
// import '../commponents.css/SearchCommponent.css';
// export default function SearchComponent() {
//   const [showInput, setShowInput] = useState(false);
//   const [query, setQuery] = useState('');

//   const toggleInput = () => {
//     setShowInput(!showInput);
//   };

//   return (
//     <div className="search-wrapper">
//       <button className="search-icon-btn" onClick={toggleInput}>
//         <SearchIcon size={28} />
//       </button>

//       <div className={`search-input-container ${showInput ? 'show' : ''}`}>
//         <input
//           type="text"
//           placeholder="ابحث هنا..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>

//       {query && (
//         <div className="search-modal">
//           <p>نتائج البحث عن: <strong>{query}</strong></p>
//           {/* ممكن تضيف هنا نتائج فعلية */}
//         </div>
//       )}
//     </div>
//   );
// }
