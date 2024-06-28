"use client"
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { validateLoginForm, validateRegisterForm } from '@/helpers/formValidation';
import { LoginErrorProps, RegisterErrorProps, Isession_active } from '@/interfaces/interfaces';
import { login_auth, register_auth } from '@/helpers/auth.login';
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
    const errors = validateRegisterForm(dataRegister)
    setErrorRegister(errors)
  }
  const handleSubmitRegister = async () => {
    try {
      const res = await register_auth(dataRegister)
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
    const error = validateLoginForm(dataLogin)
    setError(error)
  }
  const handleSubmitLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(23)
    try {
      const res = await login_auth(dataLogin);
      const { token, user } = await res;
      localStorage.setItem('UserSession', JSON.stringify({ token, userData: user }));
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
            <Image className={styles.logo} src={logo} alt="logo" width={100} height={100} />
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
            <Image className={styles.logoLogin} src={logo} alt="logo" width={100} height={100} />
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
            <button className='btn-session' type='submit'>Sign In</button>
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