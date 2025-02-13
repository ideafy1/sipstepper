
import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, Percent } from 'lucide-react';

interface ComparisonProps {
  amount: number;
  years: number;
}

const InvestmentComparison: React.FC<ComparisonProps> = ({ amount, years }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateReturns = (principal: number, rate: number, years: number) => {
    return principal * Math.pow(1 + rate, years);
  };

  const comparisons = [
    {
      name: "Fixed Deposit",
      rate: 0.065,
      icon: <Percent className="w-5 h-5 text-primary" />,
      description: "Traditional bank FD returns"
    },
    {
      name: "Recurring Deposit",
      rate: 0.06,
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      description: "Standard RD returns"
    },
    {
      name: "PPF",
      rate: 0.071,
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      description: "Public Provident Fund"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Compare with Other Investments</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparisons.map((item) => {
          const returns = calculateReturns(amount, item.rate, years);
          return (
            <Card key={item.name} className="p-4 glass card-hover">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">{item.name}</h4>
                  <p className="text-lg font-semibold text-primary">
                    {formatCurrency(returns)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.description} ({(item.rate * 100).toFixed(1)}% p.a.)
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InvestmentComparison;
