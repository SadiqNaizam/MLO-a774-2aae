import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import TrafficChart from '@/components/Dashboard/TrafficChart';
import IncomeWidget from '@/components/Dashboard/IncomeWidget';
import TargetStatsGrid from '@/components/Dashboard/TargetStatsGrid';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, ArrowUp, ArrowDown } from 'lucide-react';

// Define breadcrumbs data for PageHeader
const breadcrumbs = [
  { label: 'Dashboards', href: '#' },
  { label: 'Minimal Dashboard Example', isCurrent: true as const },
];

// Define data for summary cards (the row with Income, Expenses, Spendings, Totals)
interface SummaryStatCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  ChangeIcon: React.ElementType;
  iconColorClass: string;
  changeTextColorClass: string;
}

const summaryStats: SummaryStatCardData[] = [
  {
    id: 'summary-income',
    title: 'Income',
    value: '$ 5,456',
    change: '+14%',
    ChangeIcon: ArrowUp,
    iconColorClass: 'text-accentGreen',
    changeTextColorClass: 'text-accentGreen',
  },
  {
    id: 'summary-expenses',
    title: 'Expenses',
    value: '$ 4,764',
    change: '+8%', // Image implies increase, colored red (negative impact)
    ChangeIcon: ArrowUp,
    iconColorClass: 'text-destructive',
    changeTextColorClass: 'text-destructive',
  },
  {
    id: 'summary-spendings',
    title: 'Spendings',
    value: '$ 1.5M',
    change: '-15%', // Image implies decrease, colored green (positive impact)
    ChangeIcon: ArrowDown,
    iconColorClass: 'text-accentGreen',
    changeTextColorClass: 'text-accentGreen',
  },
  {
    id: 'summary-totals',
    title: 'Totals',
    value: '$ 31,564',
    change: '+76%',
    ChangeIcon: ArrowUp,
    iconColorClass: 'text-accentGreen',
    changeTextColorClass: 'text-accentGreen',
  },
];

const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      <PageHeader title="Minimal Dashboard" breadcrumbs={breadcrumbs} />

      <Alert className="bg-primary/10 border-primary/20">
        <Info className="h-5 w-5 text-primary" />
        <AlertDescription className="text-sm text-foreground">
          This dashboard example was created using only the available elements and components, no additional SCSS was written!
        </AlertDescription>
      </Alert>

      <StatsCardGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <div className="lg:col-span-1">
          <IncomeWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryStats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className={`text-xs ${stat.changeTextColorClass} flex items-center mt-1`}>
                <stat.ChangeIcon className={`h-3.5 w-3.5 mr-1 ${stat.iconColorClass}`} />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <TargetStatsGrid />
      
    </MainAppLayout>
  );
};

export default DashboardPage;
