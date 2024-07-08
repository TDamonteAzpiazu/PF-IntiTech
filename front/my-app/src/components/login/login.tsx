"use client"
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { validateLoginForm, validateRegisterForm } from '@/helpers/formValidation';
import { LoginErrorProps, RegisterErrorProps, Isession_active } from '@/interfaces/interfaces';
import { login_auth, register_auth } from '@/helpers/auth.login';
import { useRouter } from 'next/navigation';
import logo from '@/../../public/images/logo.png'
import Image from 'next/image';
import GoogleLoginButton from "../botonesGoogle/login";
import GoogleRegisterButton from "../botonesGoogle/register";
import Swal from "sweetalert2";


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


  const handleSubmitRegister = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const errors = validateRegisterForm(dataRegister);
    setErrorRegister(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await register_auth(dataRegister);
        console.log(res);
        if (res) {
          setdataRegister({
            name: '',
            email: '',
            password: '',
            address: '',
            phone: '',
          })
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos',
      })
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
    try {
      const res = await login_auth(dataLogin);
      const { token, user } = await res;
      const decoded = jwtDecode(token)
      const { id }: any  = decoded
      const dataUser1 = await fetch(`https://pf-intitech.onrender.com/users/${id}`,{
        method: 'GET',
      })
      const dataUser = await dataUser1.json()
      localStorage.setItem('DataUser', JSON.stringify(dataUser))
      document.cookie = `userToken=${token}`;
      localStorage.setItem('UserSession', JSON.stringify({ token, userData: user }));
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion exitoso',
        showConfirmButton: false,
        timer: 2000
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={styles.padre}>
      <div className={`${styles.container} ${active ? styles.active : ''}`} id="container">
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form onSubmit={handleSubmitRegister}>
            <h1 className={styles.title}>Registrate</h1>
            <span className="mb-4">Ingresa tus datos para registrarte</span>
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
              placeholder='Contraseña' />
            {errorRegister.name && <q className={styles.error}>{errorRegister.name}</q>}
            <input
              id='name'
              name='name'
              value={dataRegister.name}
              onChange={handleChangeRegister}
              type='text'
              placeholder='Nombre' />
            {errorRegister.address && <q className={styles.error}>{errorRegister.address}</q>}
            <input
              id='address'
              name='address'
              value={dataRegister.address}
              onChange={handleChangeRegister}
              type='text'
              placeholder='Dirección' />
            {errorRegister.phone && <q className={styles.error}>{errorRegister.phone}</q>}
            <input
              id='phone'
              name='phone'
              value={dataRegister.phone}
              onChange={handleChangeRegister}
              type='tel'
              placeholder='Telefono' />
            <button className={styles.btnRegister} type='submit'>Registrarse</button>
            <GoogleRegisterButton />
          </form>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form onSubmit={handleSubmitLogin}>
            <h1 className={styles.title}>Iniciar Sesion</h1>
            <span className="mb-4">Ingresa tus credenciales para iniciar sesión</span>
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
              placeholder='Constraseña' />
            <a href="#">Olvidaste tu contraseña?</a>
            <button className={styles.btnLogin} type='submit'>Iniciar Sesion</button>
            <GoogleLoginButton/>
          </form>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
           <Image className={styles.logo} src={logo} alt="logo" width={100} height={100} />
              <h1 className={styles.welcome}>Bienvenido de nuevo!</h1>
              <p>Ingresa con tus credenciales personales para continuar</p>
              <button className={styles.btnToggle} onClick={toggleClass}>Iniciar Sesion</button>
            </div>
            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
            <Image className={styles.logo} src={logo} alt="logo" width={100} height={100} />
              <h1 className={styles.welcome}>Hola, Bienvenid@!</h1>
              <p>Registrate con tus datos para comenzar a usar la plataforma</p>
              <button className={`${styles.btnToggle} ${styles.botonExtra} `} onClick={toggleClass}>Registrarme</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthForm;