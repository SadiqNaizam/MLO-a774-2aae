import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  // State to manage the visibility of the mobile sidebar drawer
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  // Effect to handle body scroll lock when mobile sidebar is open
  useEffect(() => {
    const body = document.body;
    if (isMobileSidebarOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    // Cleanup function to restore body scroll on component unmount
    return () => {
      body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* 
        Sidebar component: 
        - Renders SidebarNav (context component).
        - Handles fixed display on desktop (md and up).
        - Implements drawer behavior with backdrop for mobile.
        - Takes isMobileSidebarOpen state and toggleMobileSidebar callback.
      */}
      <Sidebar
        isSidebarOpen={isMobileSidebarOpen}
        toggleSidebar={toggleMobileSidebar}
      />
      
      {/* 
        Header component: 
        - Renders TopHeader (context component).
        - TopHeader itself is fixed positioned and handles responsive left offset.
        - Passes toggleMobileSidebar to TopHeader for the mobile menu button.
      */}
      <Header onToggleSidebar={toggleMobileSidebar} />

      {/* 
        Main content area wrapper.
        Positioned to account for the fixed header and the fixed desktop sidebar.
        Layout requirements for main content:
        - overall.sizing.mainContent: "min-w-0 overflow-y-auto"
        - mainContent.layout: "p-6 mt-16"
        - mainContent.container: "flex flex-col gap-6"
      */}
      <div 
        className={cn(
          "pt-16",      // Fixed header is h-16 (4rem), so content starts below it.
          "md:ml-64"    // Fixed sidebar is w-64 (16rem) on desktop, so content is offset.
                      // On mobile, sidebar is an overlay, so main content takes full width (ml-0).
        )}
      >
        {/* This inner div handles the scrolling and padding for the main content area */}
        <main 
          className={cn(
            "min-w-0 p-6", // min-w-0 from overall.sizing, p-6 from mainContent.layout
            "h-[calc(100vh-4rem)] overflow-y-auto" // Full viewport height minus header, makes it scrollable
          )}
        >
          {/* This div is the content container as per mainContent.container */}
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
