import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  trend: 'increase' | 'decrease' | 'neutral';
  metricValue: number;
  metricUnit?: string;
  accentColor: 'blue' | 'red' | 'yellow' | 'green';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  metricValue,
  metricUnit = '',
  accentColor,
  className,
}) => {
  const trendIcon = React.useMemo(() => {
    if (trend === 'increase') return <ArrowUp className="h-5 w-5 text-accentGreen" />;
    if (trend === 'decrease') return <ArrowDown className="h-5 w-5 text-destructive" />;
    return <Minus className="h-5 w-5 text-muted-foreground" />; // Or null if no icon for neutral
  }, [trend]);

  const valueColorClass = React.useMemo(() => {
    if (trend === 'increase') return 'text-accentGreen';
    if (trend === 'decrease') return 'text-destructive';
    return 'text-foreground';
  }, [trend]);

  const accentBorderColorClass = React.useMemo(() => {
    switch (accentColor) {
      case 'blue': return 'border-primary';
      case 'red': return 'border-destructive';
      case 'yellow': return 'border-accentYellow';
      case 'green': return 'border-accentGreen';
      default: return 'border-primary';
    }
  }, [accentColor]);

  const metricBgColorClass = React.useMemo(() => {
    switch (accentColor) {
      case 'blue': return 'bg-primary/10 text-primary';
      case 'red': return 'bg-destructive/10 text-destructive';
      case 'yellow': return 'bg-accentYellow/20 text-accentYellow'; // Darker text for yellow bg
      case 'green': return 'bg-accentGreen/10 text-accentGreen';
      default: return 'bg-primary/10 text-primary';
    }
  }, [accentColor]);


  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className={cn('absolute top-0 left-0 h-full w-1.5', accentBorderColorClass.replace('border-', 'bg-'))}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-5">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-5">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                {trend !== 'neutral' && <span className="mr-1">{trendIcon}</span>}
                <div className={cn('text-2xl font-bold', valueColorClass)}>{value}</div>
            </div>
            <div className={cn('flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold', metricBgColorClass)}>
                {metricValue}{metricUnit}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
