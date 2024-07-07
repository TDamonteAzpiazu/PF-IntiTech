import React, { useState } from "react";

interface IFormProps {
  inversor: string;
  file: File | null;
}

const Input: React.FC = () => {
  const [formData, setFormData] = useState<IFormProps>({
    inversor: "",
    file: null,
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
<<<<<<< HEAD
    const formData = new FormData();
    formData.append("inversor", data_form.inversor);
    if (data_form.file) {
      formData.append("file", data_form.file);
=======

    const { inversor: selectedInversor, file: selectedFile } = formData;

    if (!selectedFile) {
      console.error("No file selected");
      return;
>>>>>>> 01c8a03c51911642f6b4046d483039d8d835f988
    }

    const formDataToSend = new FormData();
    formDataToSend.append("inversorName", selectedInversor);
    formDataToSend.append("file", selectedFile);

    try {
      const response = await fetch(`http://localhost:3000/panels/upload`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const responseData = await response.json();
      console.log("responseData", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInversorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      inversor: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      file,
    });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-yellow-50 via-orange-200 to-yellow-100 p-4">
        <label className="block">File Upload</label>
        <input type="file" onChange={handleFileChange} className="mt-2" />
      </div>
      <div className="mt-4">
        <form onSubmit={handleFormSubmit}>
          <label className="block">Select Inversor</label>
          <select name="inversor" onChange={handleInversorChange} className="mt-2">
            <option value="">Select an Inversor</option>
            <option value="Bodegas salcobrand">Bodegas salcobrand</option>
            <option value="Centrovet 255 autocons">Centrovet 255 autocons</option>
            <option value="Centrovet 601">Centrovet 601</option>
            <option value="Ekono el salto">Ekono el salto</option>
          </select>
          <div className="mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
