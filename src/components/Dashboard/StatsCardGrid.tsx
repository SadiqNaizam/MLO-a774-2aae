import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard'; // Assuming StatCard is in the same directory

interface StatsCardGridProps {
  className?: string;
}

const statsData: StatCardProps[] = [
  {
    title: 'New Accounts',
    value: '234%',
    trend: 'increase' as const,
    metricValue: 58,
    metricUnit: '', // or some unit like 'k'
    accentColor: 'blue' as const,
  },
  {
    title: 'Total Expenses',
    value: '71%',
    trend: 'decrease' as const,
    metricValue: 62,
    metricUnit: '',
    accentColor: 'red' as const,
  },
  {
    title: 'Company Value',
    value: '$1,45M',
    trend: 'neutral' as const, // No up/down arrow shown for this in image, but implies positive
    metricValue: 72,
    metricUnit: '',
    accentColor: 'yellow' as const,
  },
  {
    title: 'New Employees',
    value: '+34 hires',
    trend: 'increase' as const,
    metricValue: 81,
    metricUnit: '',
    accentColor: 'green' as const,
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6', className)}>
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          metricValue={stat.metricValue}
          metricUnit={stat.metricUnit}
          accentColor={stat.accentColor}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
