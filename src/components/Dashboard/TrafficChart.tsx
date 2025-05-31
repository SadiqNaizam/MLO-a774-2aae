import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChevronDown, Dot } from 'lucide-react';

const trafficData = [
  { name: 'Jan 01', websiteBlog: 400, socialMedia: 240 },
  { name: 'Jan 02', websiteBlog: 500, socialMedia: 398 },
  { name: 'Jan 03', websiteBlog: 420, socialMedia: 600 },
  { name: 'Jan 04', websiteBlog: 680, socialMedia: 450 },
  { name: 'Jan 05', websiteBlog: 210, socialMedia: 710 },
  { name: 'Jan 06', websiteBlog: 350, socialMedia: 500 },
  { name: 'Jan 07', websiteBlog: 180, socialMedia: 230 },
  { name: 'Jan 08', websiteBlog: 390, socialMedia: 350 },
  { name: 'Jan 09', websiteBlog: 750, socialMedia: 420 },
  { name: 'Jan 10', websiteBlog: 450, socialMedia: 300 },
  { name: 'Jan 11', websiteBlog: 280, socialMedia: 180 },
  { name: 'Jan 12', websiteBlog: 120, socialMedia: 260 },
];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="label text-sm font-medium text-foreground">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-xs">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrafficChart: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Website Blog vs Social Media Traffic</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
              Actions
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
            <DropdownMenuItem>Refresh Chart</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <ComposedChart data={trafficData} margin={{ top: 5, right: 20, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                iconSize={8}
                formatter={(value, entry) => (
                  <span className="text-xs text-muted-foreground ml-1">{value}</span>
                )}
              />
              <Bar dataKey="websiteBlog" name="Website Blog" fill="hsl(var(--primary))" barSize={20} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="socialMedia" name="Social Media" stroke="hsl(var(--app-accent-green))" strokeWidth={2} dot={{ r: 4, strokeWidth:2, fill:'hsl(var(--app-accent-green))' }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
