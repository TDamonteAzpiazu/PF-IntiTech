import React, { useState } from "react";

interface Iform_props {
  inversor: string;
  file: File | null;
}

const Input: React.FC = () => {
  const [data_form, setData_form] = useState<Iform_props>({
    inversor: "",
    file: null,
  });

  const handle_button = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("inversor", data_form.inversor);
    if (data_form.file) {
      formData.append("file", data_form.file);
    }
    try {
      const response = await fetch(`http://localhost:3000/panels/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("error en la carga");
      }

      const responseData = await response.json();
      console.log("responseData", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlerCredential = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setData_form({
      ...data_form,
      inversor: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData_form({
      ...data_form,
      file,
    });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-yellow-50 via-orange-200 to-yellow-100">
        <label>Carga de planilla</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <form onSubmit={handle_button}>
          <label>Selección de inversor</label>
          <select name="inversor" onChange={handlerCredential}>
            <option value="Bodegas salcobrand">Bodegas salcobrand</option>
            <option value="Centrovet 255 autocons">
              Centrovet 255 autocons
            </option>
            <option value="Centrovet 601">Centrovet 601</option>
            <option value="Ekono el salto">Ekono el salto</option>
          </select>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
