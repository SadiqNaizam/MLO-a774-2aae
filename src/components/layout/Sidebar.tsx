import React from 'react';
import SidebarNav from '@/components/Dashboard/SidebarNav'; // Provided context component
import { cn } from '@/lib/utils';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void; // Used for backdrop click to close
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, className }) => {
  // SidebarNav component from context is already: fixed top-0 left-0 h-full w-64 bg-sidebar border-r z-20
  // This structure manages a permanent desktop sidebar and a drawer for mobile.

  return (
    <>
      {/* Desktop Sidebar: Always visible. SidebarNav handles its own styling. */}
      <div className={cn("hidden md:block", className)}>
        <SidebarNav />
      </div>

      {/* Mobile Sidebar: Drawer behavior */}
      {/* Wrapper for SidebarNav to control its presentation on mobile screens */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ease-in-out bg-sidebar",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          className
          // SidebarNav is fixed, positioning it relative to the viewport.
          // It will appear correctly within this transformed wrapper.
          // The wrapper's z-40 ensures it's above the header backdrop (z-30).
        )}
      >
        <SidebarNav />
      </div>

      {/* Backdrop for mobile sidebar drawer */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
