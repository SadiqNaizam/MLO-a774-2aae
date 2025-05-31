import React from 'react';
import { cn } from '@/lib/utils';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, className }) => {
  return (
    <div className={cn('mb-6', className)}>
      <h1 className="text-2xl font-semibold text-foreground mb-1">{title}</h1>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center space-x-1.5 text-sm text-muted-foreground">
          <li>
            <a href="/" className="hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </a>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {crumb.href && !crumb.isCurrent ? (
                <a href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className={cn(crumb.isCurrent ? 'text-foreground font-medium' : '')}>{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
