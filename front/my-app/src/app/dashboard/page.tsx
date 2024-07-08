// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Lines_Chart } from "@/app/dashboard/grafica";
// import { Bar_Chart } from "@/app/dashboard/barras";
// import { Circular_Chart } from "@/app/dashboard/pie";
// import NeonBarChart from "@/app/dashboard/neon_bar";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import 'tailwindcss/tailwind.css';
// import LinesChart from "@/components/chart_dynamic";
// import Input from "@/components/input_dashboard";
// const MySwal = withReactContent(Swal);

// const Dashboard: React.FC = () => {
//   const [profileImage, setProfileImage] = useState<File | null>(null);

//   const [stats , setStats] = useState<any>([
//     0 , 0 , 0 , 0 , 0 , 0 , 0
//   ])
//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setProfileImage(event.target.files[0]);
//     }
//   };

//   const handleCredentialsClick = () => {
//     MySwal.fire({
//       title: 'Cambiar Credenciales',
//       html: (
//         <div className="flex flex-col gap-4">
//           <input
//             type="text"
//             id="username"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightorangeinti"
//             placeholder="Nuevo Usuario"
//           />
//           <input
//             type="password"
//             id="password"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightorangeinti"
//             placeholder="Nueva Contraseña"
//           />
//           <input
//             type="file"
//             id="profileImage"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             onChange={handleImageChange}
//           />
//         </div>
//         ),
//         background: '#f3f4f6',
//         confirmButtonColor: '#f7a90e', 
//         cancelButtonColor: 'gray', 
//         customClass: {
//           title: 'text-xl text-black', 
//           htmlContainer: 'text-sm text-gray-600', 
//           confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700', 
//           cancelButton: 'bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700', 
//         },
//       showCancelButton: true,
//       confirmButtonText: 'Save',
//       preConfirm: () => {
//         const username = (document.getElementById('username') as HTMLInputElement).value;
//         const password = (document.getElementById('password') as HTMLInputElement).value;

//         if (!username || !password) {
//           Swal.showValidationMessage('Por favor, completa ambos campos.');
//           return false;
//         }

//         return { username, password };
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Aca podes manejar las nuevas credenciales
//         console.log('Nuevas credenciales:', result.value);
//         Swal.fire('¡Guardado!', 'Las credenciales han sido actualizadas.', 'success');
//       }
//     });
//   };

//   return (
//     <div className="flex h-auto">
//       {/*barra de navegacion lateral*/}
//       <nav className="w-auto bg-slate-100 p-4 m-2 rounded-lg">
//         <div className="flex items-center mb-6">
//           {
//             //  <Image src={"/icon.png"} alt={"icono intitech"} width={50} height={50} />
//           }{" "}
//         </div>
//         <ul className="m-1 p-1">
//           {/*completar los href con las rutas relativas de cada link*/}
//           <li className="mb-4">
//             <Link href={"/orders"}>Orders</Link>
//           </li>
//           <li className="mb-4">
//             <Link href={"/products"}>Products</Link>
//           </li>
//           <li className="mb-4">
//             <Link href={"/messages"}>Messages</Link>
//           </li>
//           <li className="mb-4">
//             <Link href={"/settings"}>Settings</Link>
//           </li>
//           <li className="mb-4">
//             <Link href={"/signout"}>Sign Out</Link>
//           </li>
//           <li>       
//             <button onClick={handleCredentialsClick}>    
//               Credentials
//               </button>     
//           </li>
//         </ul>
//       </nav>

//       <main className="w-4/5 p-4 grid grid-cols-2 gap-2 mt-32 h-auto">
//         <section className="bg-gray-100 p-1 rounded-lg shadow-md">
 
//             <Lines_Chart stats={stats}/>
//         </section>

//         <section className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <Bar_Chart/>

//           <div className="w-56 -mt-10 overflow-hidden bg-gray-100 rounded-lg shadow-lg md:w-64 dark:bg-gray-800"></div>
//         </section>

//         <section className="bg-gray-100 p-4 rounded-lg shadow-md h-60">

//             <Circular_Chart stats={stats} />

//         </section>

//         <LinesChart stats={stats} />

//           <section className="bg-gray-100 p-4 rounded-lg shadow-md h-60">
//             <Input stats={stats} setStats={setStats} />
//           </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;






