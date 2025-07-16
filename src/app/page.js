'use client';

import { usePathname, useRouter } from 'next/navigation';
import App from './App'
// import Home from './Routs/home/page';


import CustomeCreate from './Commponents/CustomeCreate'
import CreatePost from './Commponents/CreatePost'

import {useAuth} from './store/manegState'
import { Suspense, useEffect, useState } from 'react';






// function ModalPost({ children }) {
//   const [open, setOpen] = useState(false);
//   const [errMSG, setErrMsg] = useState('');
//   const [canClose, setCanClose] = useState(() => () => true); // دالة افتراضية

//   const OpenModal = () => {
//     setErrMsg('');
//     setOpen(true);
//   };

//   const CloseModal = () => {
//     if (canClose()) {
//       setOpen(false);
//     } else {
//       setErrMsg('❌ لا يمكن إغلاق النافذة بوجود محتوى مكتوب.');
//     }
//   };

//   // الدالة دي هيسجل فيها CreatePost طريقة التأكد
//   const registerCanClose = (fn) => {
//     setCanClose(() => fn);
//   };

//   return (
//     <>
//       {!open ? (
//         <div>
//           <input
//             onFocus={OpenModal}
//             type='text'
//             className='modal'
//             placeholder='بم تفكر؟'
//           />
//         </div>
//       ) : (
//         <div className='Creat'>
//           <div onClick={CloseModal} style={{ cursor: 'pointer' }}>X</div>
//           {errMSG && <p style={{ color: 'red' }}>{errMSG}</p>}
//           {children({ registerCanClose })}
//         </div>
//       )}
//     </>
//   );
// }

export default function HomePage() {
  const {isAuthnticated,User} = useAuth()
  const rout = useRouter()
    const pathname = usePathname();

const [ready, setReady] = useState(false);

useEffect(() => {
  setReady(true);
}, []);

useEffect(() => {
  if (ready && !isAuthnticated) {
    rout.push('/Routs/login');
  }
}, [ready, isAuthnticated]);



  // useEffect(() => {
  //   console.log(pathname)
  // },[])

  
    useEffect(() => {
         const handleBeforeUnload = (e) => {
         e.preventDefault();
         e.returnValue = ''; // لازم السطر ده عشان تظهر الرسالة في معظم المتصفحات
      };
       window.addEventListener('beforeunload', handleBeforeUnload);
       return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);


  return (
        <App>
          {/* <CustomeCreate>
           {({ registerCanClose }) => (
             <CreatePost registerCanClose={registerCanClose} />
            )}
          </CustomeCreate> */}
شش
      </App>
      
  )
}

