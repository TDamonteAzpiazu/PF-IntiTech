"use client"
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { validateLoginForm, validateRegisterForm } from '@/helpers/formValidation';
import { LoginErrorProps, RegisterErrorProps } from '@/interfaces/interfaces';
import { login_auth, register_auth } from '@/helpers/auth.login';
import { useRouter } from 'next/navigation';
import logo from '../../../public/images/logo.png'
import Image from 'next/image';
import GoogleLoginButton from "../botonesGoogle/login";
import GoogleRegisterButton from "../botonesGoogle/register";
import Swal from "sweetalert2";
import { UserStore } from "@/store/userStore"

const AuthForm = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { setToken } = UserStore((state) => state)
  const token = UserStore((state) => state.token)

  useEffect(() => {
    if (token !== "") {
      const timer = setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ya estás logueado',
        });
        router.push('/');
      }, 1500);

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [token, router]);

  //* Logica del registro

  const [dataRegister, setdataRegister] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  })

  const [errorRegister, setErrorRegister] = useState<RegisterErrorProps>({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  })

  const [touchedRegister, setTouchedRegister] = useState({
    name: false,
    email: false,
    password: false,
    address: false,
    phone: false,
  })

  const toggleClass = () => {
    setActive(!active)
  }

  const handleChangeRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setdataRegister({ ...dataRegister, [name]: value })
    const errors = validateRegisterForm({ ...dataRegister, [name]: value })  // Validar con el nuevo valor
    setErrorRegister(errors)
  }

  const handleBlurRegister = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouchedRegister({ ...touchedRegister, [name]: true });
    const errors = validateRegisterForm(dataRegister);
    setErrorRegister(errors);
  }

  const handleSubmitRegister = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const errors = validateRegisterForm(dataRegister)
    setErrorRegister(errors)

    if (Object.keys(errors).length === 0) {
      try {
        const res = await register_auth(dataRegister)
        console.log(res)
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
        console.log(error)
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
  })

  const [touchedLogin, setTouchedLogin] = useState({
    email: false,
    password: false,
  })

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDataLogin({ ...dataLogin, [name]: value })
    const error = validateLoginForm({ ...dataLogin, [name]: value })  // Validar con el nuevo valor
    setError(error)
  }

  const handleBlurLogin = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouchedLogin({ ...touchedLogin, [name]: true });
    const errors = validateLoginForm(dataLogin);
    setError(errors);
  }

  const handleSubmitLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const res = await login_auth(dataLogin);
      const { token } = await res;
      setToken(token)
      document.cookie = `userToken=${token}`;
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 2000,
      })
      router.push('/prueba')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.padre}>
      <div
        className={`${styles.container} ${active ? styles.active : ''}`}
        id="container"
      >
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form onSubmit={handleSubmitRegister}>
            <h1 className={styles.title}>Regístrate</h1>
            <span className="mb-4">Ingresa tus datos para registrarte</span>
            {touchedRegister.email && errorRegister.email && (
              <q className={styles.error}>{errorRegister.email}</q>
            )}
            <input
              id="email"
              name="email"
              value={dataRegister.email}
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
              type="email"
              placeholder="Email"
            />
            {touchedRegister.password && errorRegister.password && (
              <q className={styles.error}>{errorRegister.password}</q>
            )}
            <input
              id="password"
              name="password"
              value={dataRegister.password}
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
              type="password"
              placeholder="Contraseña"
            />
            {touchedRegister.name && errorRegister.name && (
              <q className={styles.error}>{errorRegister.name}</q>
            )}
            <input
              id="name"
              name="name"
              value={dataRegister.name}
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
              type="text"
              placeholder="Nombre"
            />
            {touchedRegister.address && errorRegister.address && (
              <q className={styles.error}>{errorRegister.address}</q>
            )}
            <input
              id="address"
              name="address"
              value={dataRegister.address}
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
              type="text"
              placeholder="Dirección"
            />
            {touchedRegister.phone && errorRegister.phone && (
              <q className={styles.error}>{errorRegister.phone}</q>
            )}
            <input
              id="phone"
              name="phone"
              value={dataRegister.phone}
              onChange={handleChangeRegister}
              onBlur={handleBlurRegister}
              type="tel"
              placeholder="Teléfono"
            />
            <button className={styles.btnRegister} type="submit">
              Registrarse
            </button>
          </form>
          <div className="absolute bottom-5 translate-x-20">
            <GoogleRegisterButton />
          </div>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form onSubmit={handleSubmitLogin}>
            <h1 className={styles.title}>Iniciar Sesión</h1>
            <span className="mb-4">Ingresa tus credenciales para iniciar sesión</span>
            {touchedLogin.email && error.email && <q className={styles.error}>{error.email}</q>}
            <input
              id="emailLogin"
              name="email"
              value={dataLogin.email}
              onChange={handleChangeLogin}
              onBlur={handleBlurLogin}
              type="email"
              placeholder="Email"
            />
            {touchedLogin.password && error.password && <q className={styles.error}>{error.password}</q>}
            <input
              id="passwordLogin"
              name="password"
              value={dataLogin.password}
              onChange={handleChangeLogin}
              onBlur={handleBlurLogin}
              type="password"
              placeholder="Contraseña"
            />
            <a href="#">¿Olvidaste tu contraseña?</a>
            <button className={styles.btnLogin} type="submit">
              Iniciar Sesión
            </button>
          </form>
          <div className="absolute bottom-20 translate-x-[100px]">
            <GoogleLoginButton />
          </div>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
              <Image className={styles.logo} src={logo} alt="logo" width={100} height={100} />
              <h1 className={styles.welcome}>¡Bienvenido de nuevo!</h1>
              <p>Ingresa tus datos personales para iniciar sesión</p>
              <button className={styles.btnToggle} onClick={toggleClass}>
                Iniciar Sesión
              </button>
            </div>
            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
              <Image className={styles.logo} src={logo} alt="logo" width={100} height={100} />
              <h1 className={styles.welcome}>¡Hola Amigo!</h1>
              <p>Regístrate con tus datos personales para comenzar</p>
              <button className={styles.btnToggle} onClick={toggleClass}>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm;
