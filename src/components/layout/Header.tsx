import React from 'react';
import TopHeader from '@/components/Dashboard/TopHeader'; // Provided context component
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, className }) => {
  // TopHeader (context component) handles its own fixed positioning (top-0, h-16),
  // background (bg-card which is effectively bg-surface), z-index (z-10),
  // and responsive left margin (left-0 on mobile, md:left-64 on desktop).
  // It expects an onToggleSidebar prop for its mobile menu button (PanelLeft icon).

  // The className prop is provided for any additional styling on a potential wrapper,
  // though TopHeader itself is fixed and won't be affected by this wrapper's layout styling.
  return (
    <div className={cn(className)}>
      <TopHeader onToggleSidebar={onToggleSidebar} />
    </div>
  );
};

export default Header;
