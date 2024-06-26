import React from 'react'

const Login = () => {
  return (
    <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
      <div className="text-2xl font-bold mb-2 text-[#000000] text-center">
        Bienvenido a <span className="text-lightorangeinti">Inti tech</span>
      </div>
      <div className="text-sm font-normal mb-4 text-center text-[#000000]">
        Ingresa a tu cuenta
      </div>
      <form className="flex flex-col gap-3">
        <div className="block relative">
          <label
            htmlFor="email"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Email
          </label>
          <input
            placeholder="example@gmail.com"
            //onChange={handleChange}
            required
            //value={dataUser.email}
            name="email"
            type="text"
            id="email"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"/>
        </div>
        <div className="block relative">
          <label
            htmlFor="password"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Contraseña
          </label>
          <input
            placeholder="**********"
            //onChange={handleChange}
            required
            //value={dataUser.password}
            name="password"
            type="password"
            id="password"
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <button type="submit" className={`block hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-lightorangeinti shadow-lg shadow-lightorangeinti text-black text-center cursor-pointer`}>
          Iniciar Sesion
        </button>
      </form>
      <div className="text-sm text-center mt-[1.6rem]">
        No tienes una cuenta?{" "}
      </div>
    </div>
  )
}

export default Login