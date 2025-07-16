'use client';

import React from 'react';
import { api, GetData } from './FetchData/Fetch';
import { useQuery } from '@tanstack/react-query';
import './commponents.css/App.css';

export default function App({ children }) {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['myData'],
  //   queryFn: () => GetData(api),
  // });
  
// if (isLoading) {
//   return (
//     <div className="loading-bounce-container">
//       <div className="bounce-box bounce1"></div>
//       <div className="bounce-box bounce2"></div>
//       <p className="loading-text">جارٍ تحميل البيانات...</p>
//     </div>
//   );
// }
 

  // if (error) return <p>حدث خطأ: {error.message}</p>;


  return <div className='root'>{children}</div>;
}
