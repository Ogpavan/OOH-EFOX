import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/');
  };

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 bg-white border-b  ">
      {/* Left: Logo and optional sidebar toggle */}
      <div className="flex items-center gap-4  ">
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
      <div className="flex items-center gap-4 ml-auto  ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 focus:outline-none">
              <Avatar>
                <AvatarImage src="/profile.webp" alt="Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-gray-700">Username</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[180px]">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}