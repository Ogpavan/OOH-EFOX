import React, { useState } from 'react';
import AppSidebar from '../app-sidebar';
import { Navbar } from './navbar';

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="flex overflow-visible"> {/* <-- Add overflow-visible here */}
      <AppSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div 
        className={`flex-1 transition-all duration-300 ease-out ${
          sidebarCollapsed ? 'ml-20' : 'ml-72'
        } overflow-visible`} // <-- Add overflow-visible here
      >
        <header className="flex h-16 shrink-0 items-center gap-2 bg-white border-b overflow-visible"> {/* <-- Add overflow-visible here */}
          <div className="flex items-center gap-2 px-4 w-full overflow-visible"> {/* <-- Add overflow-visible here */}
            <Navbar />
          </div>
        </header>
        <main className="flex flex-1 flex-col overflow-visible">  
          {children}
        </main>
      </div>
    </div>
  );
}