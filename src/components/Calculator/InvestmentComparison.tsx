
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

  const calculateFDReturns = (principal: number, rate: number, years: number) => {
    const quarterlyRate = rate / 4;
    return principal * Math.pow(1 + quarterlyRate / 100, 4 * years);
  };

  const calculateRDReturns = (monthlyInvestment: number, rate: number, years: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    return monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  };

  const calculatePPFReturns = (principal: number, rate: number, years: number) => {
    let totalAmount = principal;
    const yearlyContribution = principal;
    for (let i = 1; i < years; i++) {
      totalAmount += yearlyContribution;
      totalAmount *= (1 + rate / 100);
    }
    return totalAmount;
  };

  const comparisons = [
    {
      name: "Fixed Deposit",
      rate: 6.5,
      icon: <Percent className="w-5 h-5 text-primary" />,
      description: "Quarterly compounding",
      calculate: () => calculateFDReturns(amount, 6.5, years)
    },
    {
      name: "Recurring Deposit",
      rate: 6.0,
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      description: "Monthly investment",
      calculate: () => calculateRDReturns(amount / (years * 12), 6.0, years)
    },
    {
      name: "PPF",
      rate: 7.1,
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      description: "15-year lock-in period",
      calculate: () => calculatePPFReturns(amount / years, 7.1, years)
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Compare with Other Investments</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparisons.map((item) => {
          const returns = item.calculate();
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
                    {item.description} ({item.rate}% p.a.)
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="text-sm text-gray-500 mt-4">
        <p>* FD rates assume quarterly compounding</p>
        <p>* RD calculation assumes monthly deposits</p>
        <p>* PPF has a lock-in period of 15 years with annual compounding</p>
      </div>
    </div>
  );
};

export default InvestmentComparison;
