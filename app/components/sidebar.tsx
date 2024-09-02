'use client';
import React from 'react'

import { useState } from 'react';
import { FaHome, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { poppin } from '../constants';

const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, key: 'dashboard' },
    { name: 'Team', icon: <FaUsers />, key: 'team' },
    { name: 'Signout', icon: <FaSignOutAlt />, key: 'signout' },
];

export default function Sidebar() {
    const [active, setActive] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button className="md:hidden p-3" onClick={() => setIsOpen(!isOpen)}>
                <FaBars className="text-white" />
            </button>
            <div className={`md:block ${isOpen ? 'block' : 'hidden'} min-h-screen w-64 bg-[#0e1215] py-10 flex flex-col`}>
                <div className="mb-8 flex-colm">
                    <h1 className={`text-4xl font-bold textColor ${poppin.className}`}>Task View</h1>
                    <p className={`${poppin.className} text-sm font-normal text-white`}>Admin Dashboard</p>
                </div>
                <ul className="flex-grow">
                    {menuItems.map(item => (
                        <li key={item.key} 
                            className={`flex-center p-3 my-2 cursor-pointer rounded-sm  ${active === item.key ? 'border-l-4 border-[#ffc37b] textColor' : 'sideBarTextColor'}`} 
                            onClick={() => setActive(item.key)}
                        >
                            <div className="flex w-[70%] items-center justify-start  h-full">
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

