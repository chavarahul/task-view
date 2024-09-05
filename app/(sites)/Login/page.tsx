'use client'
import Image from "next/image";
import React, { useState } from "react";
import image from '@/app/assets/images/Character-working-laptop-while-sitting-chair.png'
import cactus from '../../assets/images/cactus.png'
import { poppin } from "@/app/constants";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {

    const [formData,setformData] = useState({
        email:'',
        password:'',
    })

    const handleLogin = async () => {
        await signIn('credentials',{...formData,redirect:false}).then((call)=>{
            if(call?.error) toast.error('Invalid credentials');
        })
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        // setformData({...d})
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <div className="flex flex-col md:flex-row items-center justify-between  h-screen w-full bg-white">
                <div className="w-full md:w-[25%] p-4   h-full">
                    <div className="relative">
                        <p className={`${poppin.className} text-gray-900 ml-1 mb-1 `}>Goal View</p>
                        <h1 className={`${poppin.className} text-black uppercase text-7xl font-normal`}>Login</h1>
                    </div>
                    <form className="mt-28" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className={`block text-gray-700 mb-1 font-semibold ${poppin.className}`}>
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={`w-full p-2 text-gray-900 mt-1 border border-gray-300 rounded ${poppin.className}`}
                                placeholder="micahcarroll@gmail.com"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-1 font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={`w-full p-2 text-gray-900 mt-1 border border-gray-300 rounded  ${poppin.className}`}
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className={`mb-4`}>
                            <Link href="#" className="text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <button className={`w-full p-2 bg-black text-white rounded hover:bg-gray-800 ${poppin.className}`}>
                            Sign In
                        </button>
                        <p className={`mt-4 text-black ${poppin.className}`}>
                            Dont u have an  account?{" "}
                            <button type="button" className="text-blue-500 hover:underline">
                                Sign up
                            </button>
                        </p>
                    </form>
                </div>

                {/* Right Side - Image */}
                <div className=" w-full md:w-[75%] bg-black  h-full p-4 flex-center relative">
                    <div className="w-[60%] h-[60%]  flex relative">
                        <Image
                            src={image}
                            alt="Neon Globe"
                            className="w-[70%] h-full  relative"
                        />
                        <Image
                            src={cactus}
                            alt="Neon Globe"
                            className="w-40 h-[85%]  absolute bottom-10 right-36"
                        />
                        {/* <div className="absolute w-full h-10 bg-white rounded-full bottom-0 transform rotate-y-90"></div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
