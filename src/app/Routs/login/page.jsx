'use client'
import { useEffect, useState } from 'react';
import '../../commponents.css/login.css';
import { useAuth } from '@/app/store/manegState';
import { api, GetData } from '@/app/FetchData/Fetch';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useLogIn from '../../../../customHooks/useLogIn';
import Lodding from '../../Commponents/lodding';
import { useFrindStore } from '../../store/FrindSlice';

export default function LogIn() {
    const [InCorrect, setIncorecct] = useState(true);

    const Rout = useRouter();
    const { value, onChange, erros } = useLogIn({ initialValue: { username: '', password: '' } });

    const { log_in, User,isAuthnticated} = useAuth();
    const { setFrinds,frinds} = useFrindStore();



    useEffect(() => {
        if (isAuthnticated) {
            Rout.replace('/Routs/home'); // ← منعه من الضغط Back ورجوعه للّوجين
       }

    },[isAuthnticated])


  const validate = (value) => {
    const errs = {};
    if (value.password.trim().length < 5) errs.password = 'incorrected password';
    if (!value.username.trim()) errs.username = 'incorrected username';
    return errs;
  };


    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => GetData(`${api}Users`),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const handelLogIn = () => {
        if (value.username && value.password) {
            const  userData = data.find(
                user => user.email === value.username && user.password === value.password
            );

            if (userData && value.password === userData.password && value.username === userData.email  ) {
                log_in(userData, data); // austand
                Rout.push('/Routs/home'); // Routs to home
                setFrinds(userData); //  setFrind id useFrindStore();
                // دا لوحدو مش كفايه عايز لما يروح علي الهوم نخلي الzustand 
                // zustasnd يتمد طاقتو من ريأكت ضعثقغ 
                //  هنقد نحدث البيانات كل شويه  بـ react query
            } else {
                setIncorecct(false);
            }
        }
    };

    function handelEnter(e) {
        setIncorecct(true);
        if (e.key == "Enter") {
            handelLogIn();
        }
    }

    if (isLoading) return <Lodding/>;
    if (error) return <p>Error: {error.message}</p>;

return (
  <div onKeyPress={handelEnter} className='form-log_in'>
    <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#145cc0' }}>تسجيل الدخول</h2>

    <input
      name="username"
      onChange={onChange}
      autoFocus
      type="text"
      placeholder='اسم المستخدم'
      autoComplete="off"
      value={value.username}
    />
    <input
      name="password"
      onChange={onChange}
      autoComplete="off"
      value={value.password}
      type="password"
      placeholder='كلمة المرور'
    />

    <button onClick={handelLogIn}>دخول</button>

    {!InCorrect && (
      <div className='inCorrect'>
        <span>❌ اسم المستخدم أو كلمة المرور غير صحيح</span>
      </div>
    )}
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
    ليس لديك حساب؟{' '}
    <span style={{ color: '#145cc0', cursor: 'pointer' }} onClick={() => Rout.push('/Routs/create')}>
      أنشئ حساب جديد
      </span>
    </p>

  </div>
);

}