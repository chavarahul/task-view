'use client';
import React, { useState } from 'react';
import { FaHome, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { poppin } from '../constants';

const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, key: 'dashboard' },
    { name: 'Team', icon: <FaUsers />, key: 'team' },
    { name: 'Signout', icon: <FaSignOutAlt />, key: 'signout' },
];

export default function Sidebar({active,setActive}:any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button className="md:hidden p-3" onClick={() => setIsOpen(!isOpen)}>
                <FaBars className="text-white" />
            </button>
            <div className={`md:block ${isOpen ? 'block' : 'hidden'} min-h-screen w-64 bg-[#0e1215] py-10 flex flex-col`}>
                <div className="mb-8 flex-colm  ">
                    <h1 className={`text-3xl font-bold textColor ${poppin.className}`}>Task View</h1>
                    <p className={`${poppin.className} text-[0.7rem] font-normal text-gray-400`}>Admin Dashboard</p>
                </div>
                <ul className="flex-grow">
                    {menuItems.map(item => (
                        <li 
                            key={item.key} 
                            className={`flex-center p-3 my-2  pl-8 cursor-pointer rounded-sm ${active === item.key ? 'border-l-4 transition-all duration-500 border-[#ffc37b] textColor' : 'border-l-4 border-transparent sideBarTextColor'}`} 
                            onClick={() => setActive(item.key)}
                        >
                            <div className="flex ml-2 w-[70%] items-center justify-start h-full">
                                <span className="mr-3">{item.icon}</span>
                                <span>{item.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
