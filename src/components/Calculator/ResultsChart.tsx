
import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Button } from "@/components/ui/button";
import { ChartBar, PieChart as PieChartIcon, LineChart } from 'lucide-react';

interface ResultsChartProps {
  data: {
    year: number;
    investment: number;
    returns: number;
  }[];
}

const COLORS = ['#7e69ab', '#9b87f5', '#b8a8f8'];

const ResultsChart: React.FC<ResultsChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'area' | 'pie' | 'bar'>('area');

  const formatValue = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)}Cr`;
    }
    if (value >= 100000) {
      return `${(value / 100000).toFixed(2)}L`;
    }
    return `${(value / 1000).toFixed(1)}K`;
  };

  const getPieChartData = () => {
    const lastDataPoint = data[data.length - 1];
    return [
      { name: 'Principal', value: lastDataPoint.investment },
      { name: 'Returns', value: lastDataPoint.returns - lastDataPoint.investment },
    ];
  };

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <PieChart width={400} height={300}>
            <Pie
              data={getPieChartData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {getPieChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatValue(value)} />
            <Legend />
          </PieChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatValue} />
            <Tooltip formatter={(value: number) => formatValue(value)} />
            <Legend />
            <Bar dataKey="investment" name="Invested Amount" fill={COLORS[0]} />
            <Bar dataKey="returns" name="Total Value" fill={COLORS[1]} />
          </BarChart>
        );
      default:
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatValue} />
            <Tooltip
              formatter={(value: number) => [
                `₹${formatValue(value)}`,
                value === data[0]?.investment ? "Invested Amount" : "Expected Returns",
              ]}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Area
              type="monotone"
              dataKey="investment"
              stackId="1"
              stroke={COLORS[0]}
              fill={COLORS[0]}
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="returns"
              stackId="1"
              stroke={COLORS[1]}
              fill={COLORS[1]}
              fillOpacity={0.3}
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex justify-center gap-2">
        <Button
          variant={chartType === 'area' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('area')}
        >
          <LineChart className="w-4 h-4 mr-2" />
          Area
        </Button>
        <Button
          variant={chartType === 'pie' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('pie')}
        >
          <PieChartIcon className="w-4 h-4 mr-2" />
          Pie
        </Button>
        <Button
          variant={chartType === 'bar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('bar')}
        >
          <ChartBar className="w-4 h-4 mr-2" />
          Bar
        </Button>
      </div>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsChart;
