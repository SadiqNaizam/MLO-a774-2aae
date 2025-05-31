import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PanelLeft,
  Search,
  LayoutGrid,
  Settings,
  Briefcase,
  Bell,
  Globe,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle for mobile/tablet, or if sidebar is collapsible */}
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        {/* Search Bar - hidden on smaller screens, more prominent on larger ones */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-9 pr-4 py-2 h-9 w-full md:w-64 lg:w-80 rounded-md bg-background" />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Action Buttons */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <LayoutGrid className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Mega Menu</span>
              <ChevronDown className="h-3 w-3 ml-1 md:ml-2 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Link 1</DropdownMenuItem>
            <DropdownMenuItem>Link 2</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Another Action</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Settings</span>
              <ChevronDown className="h-3 w-3 ml-1 md:ml-2 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Briefcase className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Projects</span>
              <ChevronDown className="h-3 w-3 ml-1 md:ml-2 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Project A</DropdownMenuItem>
            <DropdownMenuItem>Project B</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Icons: Language and Notifications */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Globe className="h-5 w-5" /> 
          <span className="sr-only">Language</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 md:px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/40?u=alina" alt="Alina Mclourd" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">Alina Mclourd</span>
                <span className="text-xs text-muted-foreground">VP People Manager</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto md:ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
