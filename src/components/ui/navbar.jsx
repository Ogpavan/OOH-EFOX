import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { LogOut, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { CustomConfirm } from '@/customcomponent/CustomConfirm';

export function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 bg-white border-b relative">
      {/* Left: Logo and optional sidebar toggle */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded hover:bg-gray-100 transition"
            aria-label="Toggle sidebar"
          >
            <MdMenu size={28} className="text-gray-600" />
          </button>
        )}
        <img src="/logo.webp" alt="Logo" className="h-10" />
      </div>

      {/* Right: Profile dropdown aligned to top right */}
      <div className="flex items-center gap-4 ml-auto">
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button 
              className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              type="button"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/profile.webp" alt="Profile" />
                <AvatarFallback className="text-sm">U</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-gray-700">Yash</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="min-w-[180px] !z-[9999] bg-white border shadow-lg"
            sideOffset={5}
          >
            {/* <DropdownMenuLabel>Account</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem 
            //on click to navigate to profile page
            onClick={() => {
              navigate('/profile');
            }}
            className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
            
            onClick={() => {
              navigate('/setting/app-Configuration');
            }}
            className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 cursor-pointer focus:bg-red-50"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(false); // Close dropdown first
                setShowConfirm(true);   // Then show confirm dialog
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {showConfirm && (
          <CustomConfirm
            heading="Logout?"
            message="Are you sure you want to logout?"
            cancelText="Cancel"
            actionText="Logout"
            onConfirm={() => {
              setShowConfirm(false);
              handleLogout();
            }}
            onCancel={() => {
              setShowConfirm(false);
              // Don't reopen dropdown on cancel, let user click again
            }}
          />
        )}
      </div>
    </div>
  );
}