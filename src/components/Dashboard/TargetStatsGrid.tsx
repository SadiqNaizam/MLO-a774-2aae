import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface TargetStat {
  id: string;
  label: string;
  value: number;
  targetLabel: string;
  color: 'primary' | 'destructive' | 'accentYellow' | 'accentGreen' | 'blue'; // Added 'blue' for consistency
}

const targetStatsData: TargetStat[] = [
  {
    id: 'income',
    label: '71%',
    value: 71,
    targetLabel: 'Income Target',
    color: 'destructive' as const, // Red for Income Target in example
  },
  {
    id: 'expenses',
    label: '54%',
    value: 54,
    targetLabel: 'Expenses Target',
    color: 'accentGreen' as const,
  },
  {
    id: 'spendings',
    label: '32%',
    value: 32,
    targetLabel: 'Spendings Target',
    color: 'accentYellow' as const,
  },
  {
    id: 'totals',
    label: '89%',
    value: 89,
    targetLabel: 'Totals Target',
    color: 'primary' as const, // Blue for Totals Target in example
  },
];

interface TargetStatsGridProps {
  className?: string;
}

const TargetStatItem: React.FC<TargetStat> = ({ label, value, targetLabel, color }) => {
  const progressColorClass = React.useMemo(() => {
    switch (color) {
      case 'primary': return 'bg-primary';
      case 'destructive': return 'bg-destructive';
      case 'accentYellow': return 'bg-accentYellow';
      case 'accentGreen': return 'bg-accentGreen';
      case 'blue': return 'bg-blue-500'; // Generic blue if needed, or map to primary
      default: return 'bg-primary';
    }
  }, [color]);

  return (
    <div className="flex flex-col">
      <span className={cn('text-xl font-semibold mb-1', 
        color === 'destructive' ? 'text-destructive' : 
        color === 'accentGreen' ? 'text-accentGreen' : 
        color === 'accentYellow' ? 'text-accentYellow' : 'text-primary'
      )}>{label}</span>
      <Progress value={value} className="h-2 mb-1" indicatorClassName={progressColorClass} />
      <span className="text-xs text-muted-foreground">{targetLabel}</span>
    </div>
  );
};

const TargetStatsGrid: React.FC<TargetStatsGridProps> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Target Section</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="link" size="sm" className="text-primary px-0">
            View Details
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {targetStatsData.map((stat) => (
            <TargetStatItem
              key={stat.id}
              id={stat.id}
              label={stat.label}
              value={stat.value}
              targetLabel={stat.targetLabel}
              color={stat.color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetStatsGrid;
