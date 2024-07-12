'use client';
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";

export interface ID {
  id: number
}

const AuthSuccess = () => {
    const { setToken } = UserStore((state) => state);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get('token');
        console.log(token);

        if (token) {
            setToken(token);
            document.cookie = `userToken=${token}; path=/; secure; samesite=strict`;

    router.push('/profile')
  }, [searchParams, router])

  return (
    <div className="h-screen mt-24 text-center text-black text-3xl">
      {/* <l-line-wobble
                size="80"
                stroke="5"
                bg-opacity="0.1"
                speed="1.75"
                color="black"
            ></l-line-wobble> */}
    </div>
  )
}

const SuspendedAuthSuccess = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthSuccess />
  </Suspense>
)

export default SuspendedAuthSuccess
