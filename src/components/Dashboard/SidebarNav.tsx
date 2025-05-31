import React from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  DollarSign,
  Box,
  Users,
  FileText,
  AppWindow,
  Puzzle,
  Tablets,
  ClipboardList,
  PieChart as PieChartIcon, // Renamed to avoid conflict with Recharts component
  ChevronDown,
  Settings // Added for a potential settings link at the bottom
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  subItems?: NavItem[];
  isActive?: boolean;
}

const mainNavItems: NavItem[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    subItems: [
      { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '#' },
      { id: 'commerce', label: 'Commerce', icon: ShoppingCart, href: '#' },
      { id: 'sales', label: 'Sales', icon: DollarSign, href: '#' },
      {
        id: 'minimal',
        label: 'Minimal',
        icon: Box, 
        href: '#',
        isActive: true, // As per image, Variation 1 (Minimal) is active
        // subItems for 'Variation 1', 'Variation 2' can be nested further or handled by routing
        // For simplicity, marking 'Minimal' as active if 'Variation 1' is its default view.
      },
    ],
  },
  { id: 'crm', label: 'CRM', icon: Users, href: '#' },
  {
    id: 'pages',
    label: 'Pages',
    icon: FileText,
    subItems: [
      { id: 'profile', label: 'Profile', icon: Users, href: '#' },
      { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
    ],
  },
  { id: 'applications', label: 'Applications', icon: AppWindow, href: '#' },
];

const secondaryNavItems: NavItem[] = [
  { id: 'ui_components', label: 'UI Components', icon: Puzzle, href: '#' },
  { id: 'dashboard_widgets', label: 'Dashboard Widgets', icon: Tablets, href: '#' },
  { id: 'forms', label: 'Forms', icon: ClipboardList, href: '#' },
  { id: 'charts', label: 'Charts', icon: PieChartIcon, href: '#' },
];

const SidebarNavLink: React.FC<{ item: NavItem; isSubItem?: boolean }> = ({ item, isSubItem = false }) => {
  return (
    <a
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isSubItem ? 'pl-9' : 'pl-3',
        item.isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </a>
  );
};

const SidebarNav: React.FC = () => {
  const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(['dashboards']);

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-border flex flex-col z-20">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <a href="#" className="flex items-center gap-2 font-semibold text-lg text-foreground">
          <Box className="h-6 w-6 text-primary" /> {/* Placeholder for Architect logo icon */}
          <span>Architect</span>
        </a>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="mb-2">
          <h3 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</h3>
          <Accordion type="multiple" value={openAccordionItems} onValueChange={setOpenAccordionItems} className="w-full">
            {mainNavItems.map((item) => (
              item.subItems ? (
                <AccordionItem value={item.id} key={item.id} className="border-b-0">
                  <AccordionTrigger className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:no-underline',
                    item.subItems.some(sub => sub.isActive) ? 'text-primary' : 'text-foreground hover:bg-primary/5',
                    'justify-between'
                  )}>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-0">
                    <div className="space-y-1">
                      {item.subItems.map((subItem) => (
                        <SidebarNavLink item={subItem} key={subItem.id} isSubItem />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <SidebarNavLink item={item} key={item.id} />
              )
            ))}
          </Accordion>
        </div>
        
        <div>
          {secondaryNavItems.map((item) => (
            item.subItems ? (
              <AccordionItem value={item.id} key={item.id} className="border-b-0">
                 <AccordionTrigger className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:no-underline',
                    item.subItems.some(sub => sub.isActive) ? 'text-primary' : 'text-foreground hover:bg-primary/5',
                    'justify-between'
                  )}>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                  </AccordionTrigger>
                <AccordionContent className="pt-1 pb-0">
                  <div className="space-y-1">
                    {item.subItems.map((subItem) => (
                      <SidebarNavLink item={subItem} key={subItem.id} isSubItem />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <SidebarNavLink item={item} key={item.id} />
            )
          ))}
        </div>
      </nav>
      {/* Optional: Footer settings link */}
      {/* <div className="mt-auto p-4 border-t border-border">
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-foreground">
          <Settings className="h-4 w-4" />
          App Settings
        </a>
      </div> */}
    </div>
  );
};

export default SidebarNav;
