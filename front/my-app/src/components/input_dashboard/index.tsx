// import React, { useState } from "react";

// interface IFormProps {
//   inversor: string;
//   file: File | null;
// }

// interface InputProps {
//   stats: [{ energyGenerated: number }];
//   setStats: React.Dispatch<React.SetStateAction<any>>;

// }



// const Input: React.FC<InputProps> = ({ setStats, stats }) => {
//   const [formData, setFormData] = useState<IFormProps>({
//     inversor: "",
//     file: null,
//   });

//   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const { inversor: selectedInversor, file: selectedFile } = formData;

//     if (!selectedFile) {
//       console.error("No file selected");
//       return;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("inversorName", selectedInversor);
//     formDataToSend.append("file", selectedFile);

//     try {
//       const response = await fetch(`https://pf-intitech.onrender.com/panels/upload`, {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload file");
//       }

//       const responseData = await response.json();

//       const energyGeneratedArray = responseData.stats.map((item: any) => parseFloat(item.energyGenerated));

//       const dateArray = responseData.stats.map((item: any) => (item.date));

//       setStats(energyGeneratedArray)

//       console.log("responseData", responseData);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleInversorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       inversor: value,
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setFormData({
//       ...formData,
//       file,
//     });
//   };

//   return (
//     <div className="p-2">
//       <div className=" bg-gradient-to-r from-yellow-50 via-orange-200 to-yellow-100 p-4">
//         <label className="block">Subir archivo</label>
//         <input type="file" onChange={handleFileChange} className="mt-2" />
//       </div>
//       <div className="mt-4">
//         <form onSubmit={handleFormSubmit}>
//           <select name="inversor" onChange={handleInversorChange} className="mt-2">
//             <option value="">Selecionar un inversor</option>
//             <option value="Bodegas salcobrand">Bodegas salcobrand</option>
//             <option value="Centrovet 255 autocons">Centrovet 255 autocons</option>
//             <option value="Centrovet 601">Centrovet 601</option>
//             <option value="Ekono el salto">Ekono el salto</option>
//           </select>
//           <div className="mt-14">
//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               Subir archivo
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Input;
