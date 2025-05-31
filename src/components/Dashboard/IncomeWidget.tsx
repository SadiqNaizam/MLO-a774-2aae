import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Label } from 'recharts';
import { Settings, ListFilter } from 'lucide-react';

const incomeData = [
  { name: 'Achieved', value: 75 },
  { name: 'Remaining', value: 25 },
];

const COLORS = ['hsl(var(--app-accent-green))', 'hsl(var(--primary))']; // Green for achieved, Blue for remaining/target

interface IncomeWidgetProps {
  className?: string;
}

const IncomeWidget: React.FC<IncomeWidgetProps> = ({ className }) => {
  const achievedPercent = incomeData[0].value;

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Income</CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ListFilter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-4">
        <div style={{ width: '100%', height: 200 }} className="relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incomeData}
                cx="50%"
                cy="50%"
                innerRadius={'70%'}
                outerRadius={'90%'}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {incomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                 <Label
                  value={`${achievedPercent}%`}
                  position="center"                  
                  className="fill-foreground text-3xl font-bold"
                  dy={-5} // Adjust vertical position if needed
                />
                <Label 
                  value="Percent"
                  position="center"
                  className="fill-muted-foreground text-xs"
                  dy={15} // Adjust vertical position for subtitle
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">32%</span> Spendings Target
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeWidget;
