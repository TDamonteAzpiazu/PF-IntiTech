'use client';
import { useEffect } from 'react';
import { DataStore } from "@/store/dataStore";

const Page = () => {
  const userData = DataStore((state) => state.userDataUser);
  const getDataUser = DataStore((state) => state.getDataUser);

  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  console.log(userData);

  return (
    <div className='h-screen mt-32 text-center'>
      {userData.name ? (
        <div>
          <h1>{userData.name}</h1>
          <p>{userData.email}</p>
          <p>{userData.address}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
