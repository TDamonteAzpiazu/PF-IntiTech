"use client"
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { validateLogin, validateRegister } from '@/helpers/formValidation';
import { LoginErrorProps, RegisterErrorProps, Isession_active } from '@/interfaces/interfaces';
import { login_auth } from '@/helpers/auth.login';
import { useRouter } from 'next/navigation';
import logo from '@/../../public/images/logonegro.png'
import Image from 'next/image';

const AuthForm = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState<Isession_active>();


  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData: Isession_active = JSON.parse(localStorage.getItem('UserSession')!)
      setUserData(userData)
      userData?.token && alert('You are already logged in')
      userData?.token && router.push('/') 
  }

  }, [])

  //* Logica del registro


  const [dataRegister, setdataRegister] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    country: '',
  });

  const [errorRegister, setErrorRegister] = useState<RegisterErrorProps>({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });
  const toggleClass = () => {
    setActive(!active);
  };

  const handleChangeRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setdataRegister({ ...dataRegister, [name]: value });
    const errors = validateRegister(dataRegister)
    setErrorRegister(errors)
  }
  const handleSubmitRegister = async () => {
    try {
      const res = await login_auth(dataRegister)
      console.log(res)
      alert('Register successful');
    } catch (error: any) {
      throw new Error(error);
    }

  }

  //* Logica del login

  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<LoginErrorProps>({
    email: '',
    password: '',
  });

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDataLogin({ ...dataLogin, [name]: value });
    const error = validateLogin(dataLogin)
    setError(error)
  }

  const handleSubmitLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const res = await login_auth(dataLogin);      
      const { token, User } = await res;
      const decodedToken = jwtDecode <{ id: string; email: string; role: string }>(token)
      console.log('Decoded Token:', decodedToken);
      localStorage.setItem('UserSession', JSON.stringify({ token, userData: User }));
      alert('Login successful');
      router.push('/')
    } catch (error: any) {
      throw new Error(error);
    }
  }
  return (
    <div className={styles.padre}>
      <div className={`${styles.container} ${active ? styles.active : ''}`} id="container">
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form onSubmit={handleSubmitRegister}>
            <Image src={logo} alt="logo" width={100} height={100} />
            <div className={styles['social-icons']}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            {errorRegister.email && <q className={styles.error}>{errorRegister.email}</q>}
            <input
              id='email'
              name='email'
              value={dataRegister.email}
              onChange={handleChangeRegister}
              type='email'
              placeholder='Email' />
            {errorRegister.password && <q className={styles.error}>{errorRegister.password}</q>}
            <input
              id='password'
              name='password'
              value={dataRegister.password}
              onChange={handleChangeRegister}
              type='password'
              placeholder='Password' />
            {errorRegister.name && <q className={styles.error}>{errorRegister.name}</q>}
            <input
              id='name'
              name='name'
              value={dataRegister.name}
              onChange={handleChangeRegister}
              type='text'
              placeholder='Name' />
            {errorRegister.address && <q className={styles.error}>{errorRegister.address}</q>}
            <input
              id='address'
              name='address'
              value={dataRegister.address}
              onChange={handleChangeRegister}
              type='text'
              placeholder='Address' />
            {errorRegister.phone && <q className={styles.error}>{errorRegister.phone}</q>}
            <input
              id='phone'
              name='phone'
              value={dataRegister.phone}
              onChange={handleChangeRegister}
              type='tel'
              placeholder='Phone' />
            <button type='submit'>Sign Up</button>
          </form>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form onSubmit={handleSubmitLogin}>
            <Image src={logo} alt="logo" width={100} height={100} />
            <h1 className={styles.title}>Sign In</h1>
            <div className={styles['social-icons']}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for password</span>
            {error.email && <q className={styles.error}>{error.email}</q>}
            <input
              id='emailLogin'
              name='email'
              value={dataLogin.email}
              onChange={handleChangeLogin}
              type='email'
              placeholder='Email' />
            {error.password && <q className={styles.error}>{error.password}</q>}
            <input
              id='passwordLogin'
              name='password'
              value={dataLogin.password}
              onChange={handleChangeLogin}
              type='password'
              placeholder='Password' />
            <a href="#">Forget Your Password?</a>
            <button type='submit'>Sign In</button>
          </form>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
              <h1 className={styles.welcome}>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className={styles.hidden} onClick={toggleClass}>Sign In</button>
            </div>
            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
              <h1 className={styles.welcome} >Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className={styles.hidden} onClick={toggleClass}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;