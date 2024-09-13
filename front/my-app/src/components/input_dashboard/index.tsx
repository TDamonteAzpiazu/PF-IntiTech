'use client'
import React, { useState } from 'react';

interface InputProps {
  stats : {
    date: number;
    totalPrice: number;
  }
  setStats: React.Dispatch<React.SetStateAction<any>>;
}

const Input: React.FC<InputProps> = ({ setStats  , stats}) => {
  const [formData, setFormData] = useState({
    month: '',
    year: '',
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { month, year } = formData;

    if (!month || !year) {
      console.error('Please select both month and year');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/getRecordsByMonth?month=${month}&year=${year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }

      const responseData = await response.json();

      const data = responseData.map((item: any) => ({
        date: item.date, // Extract the day of the month
        totalPrice: item.totalPrice,
      }));
      console.log(data);
      
      setStats(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-2">
    <div className="p-2 rounded-lg shadow-md">
      <form onSubmit={handleFormSubmit} className="space-y-2">
        <label className="block text-sm">Select Month</label>
        <select name="month" onChange={handleInputChange} className="block p-1 border rounded w-full text-sm">
          <option value="select month">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
  
        <label className="block text-sm mt-1">Select Year</label>
        <input type="number" name="year" onChange={handleInputChange} className="block p-1 border rounded w-full text-sm" />
  
        <div className="mt-3 text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Fetch Records
          </button>
        </div>
      </form>
    </div>
  </div>
  
  
  
  );
};

export default Input;
