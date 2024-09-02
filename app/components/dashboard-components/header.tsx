import { FaSearch, FaEnvelope, FaBell } from 'react-icons/fa';

export default function DashboardHeader() {
    return (
        <div className="flex-bet justify-between p-4 w-full ">
            <div>
                <h2 className="text-lg font-bold textColor">User Profile</h2>
                <p className="text-sm sideBarTextColor">Welcome to Modern Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search here..." 
                        className="pl-4 pr-10 py-2 rounded-lg bg-[#333642] text-white focus:outline-none"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffc37b]" />
                </div>
                <div className="flex space-x-2">
                    
                    <img 
                        src="https://via.placeholder.com/40" 
                        alt="User Avatar" 
                        className="rounded-full h-10 w-10"
                    />
                </div>
            </div>
        </div>
    );
}
