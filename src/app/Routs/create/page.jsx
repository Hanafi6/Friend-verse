'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../commponents.css/CreateAccount.css'
import Link  from 'next/link'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Lodding from '../../Commponents/lodding';
import {useAuth} from '../../store/manegState';
import {GetData,api } from '../../FetchData/Fetch';
import { PostData } from '@/app/FetchData/Fetch'; // تأكد إن عندك PostData



export default function CreateAccount() {
  const [form, setForm] = useState({
    Fname: '',
    Lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phone: '',
    bio: '',
  });
  const [errors, setErrors] = useState({});
  const [serverUsers, setServerUsers] = useState([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { log_in} = useAuth();


    const { data:users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => GetData(`${api}Users`),
        refetchOnWindowFocus: false,
        retry: 1,
    });



    useEffect(() => {

    },[form.Fname])


        

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (users) => {
    const errs = {};

    if (!form.Fname.trim()) errs.Fname = 'الاسم الأول مطلوب';
    if (!form.Lname.trim()) errs.Lname = 'الاسم الثاني مطلوب';
    if (!form.email.includes('@')) errs.email = 'البريد الإلكتروني غير صالح';
    if (form.password.length < 6) errs.password = 'كلمة المرور قصيرة جدًا';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'كلمتا المرور غير متطابقتين';
    if (!form.age || isNaN(form.age) || +form.age < 10) errs.age = 'العمر غير صالح';
    if (form.bio.length > 50) errs.bio = 'النبذة لا يجب أن تتجاوز 50 حرفًا';

    const fullNameExists = users.some(u => u.Fname === form.Fname && u.Lname === form.Lname);
    const emailExists = users.some(u => u.email === form.email);

    if (emailExists) errs.email = 'البريد الإلكتروني مستخدم بالفعل';
    if (fullNameExists && !emailExists) {
      // الاسم متكرر عادي، لا يعتبر خطأ
    }

    return errs;
  };

  const mutation = useMutation({
  mutationFn: (newUser) => PostData(`${api}Users`, newUser),
  onSuccess: (createdUser) => {
    // 1. خزّنه في الزستاند
    log_in(createdUser);

    // 2. خزّنه في الكاش تبع React Query
    queryClient.setQueryData(["users"], (old = []) => [...old, createdUser]);
    console.log(createdUser)
    // 3. روح على الصفحة الرئيسية
    router.push("/Routs/home");
  },
  onError: (err) => {
    // console.error("فشل التسجيل:", err.message);
    setErrors(prev => ({
      ...prev,
      server: "حدث خطأ أثناء حفظ البيانات، حاول مرة أخرى.",
    }));
  }
});

const handleSubmit = async () => {
  const validation = validate(users);
  setErrors(validation);

  if (Object.keys(validation).length === 0) {
    const newUser = {
      ...form,
      isAuthnticated: false,
      followers: [],
      frinds: [],
      info:{}
    };

    // معضله
    delete newUser.confirmPassword;


      mutation.mutate(newUser);
  }
};

      if (isLoading) return <Lodding/>;
      if (error) return <p>Error: {error.message}</p>;
  

  return (
    <div className="form-log_in">
      <h2 style={{ textAlign: 'center', color: '#145cc0' }}>إنشاء حساب جديد</h2>

      <input name="Fname" placeholder="الاسم الأول" onChange={handleChange} />
      {errors.Fname && <p className="error-msg">{errors.Fname}</p>}

      <input name="Lname" placeholder="الاسم الثاني" onChange={handleChange} />
      {errors.Lname && <p className="error-msg">{errors.Lname}</p>}

      <input name="email" placeholder="البريد الإلكتروني" onChange={handleChange} />
      {errors.email && <p className="error-msg">{errors.email}</p>}

      <input name="password" type="password" placeholder="كلمة المرور" onChange={handleChange} />
      {errors.password && <p className="error-msg">{errors.password}</p>}

      <input name="confirmPassword" type="password" placeholder="تأكيد كلمة المرور" onChange={handleChange} />
      {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}

      <input name="age" placeholder="السن" onChange={handleChange} />
      {errors.age && <p className="error-msg">{errors.age}</p>}

      <input name="phone" placeholder="رقم الهاتف (اختياري)" onChange={handleChange} />

      <input name="bio" placeholder="نبذة عنك (50 حرف كحد أقصى)" maxLength={50} onChange={handleChange} />
      {errors.bio && <p className="error-msg">{errors.bio}</p>}

      <button onClick={handleSubmit}>تسجيل</button>
      <Link href='/Routs/login'>
      log in
      </Link>
    </div>
  );
}
