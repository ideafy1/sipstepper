
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface ResultsChartProps {
  data: {
    year: number;
    investment: number;
    returns: number;
  }[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ data }) => {
  const formatValue = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)}Cr`;
    }
    if (value >= 100000) {
      return `${(value / 100000).toFixed(2)}L`;
    }
    return `${(value / 1000).toFixed(1)}K`;
  };

  return (
    <div className="chart-container animate-fadeIn">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
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
            stroke="#7e69ab"
            fill="#7e69ab"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="returns"
            stackId="1"
            stroke="#9b87f5"
            fill="#9b87f5"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
