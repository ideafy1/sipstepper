
import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, Home, Car, Briefcase, GraduationCap } from 'lucide-react';

interface InvestmentInsightsProps {
  monthlyInvestment: number;
  finalAmount: number;
  years: number;
}

const InvestmentInsights: React.FC<InvestmentInsightsProps> = ({
  monthlyInvestment,
  finalAmount,
  years,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const monthlyPassiveIncome = finalAmount * 0.004; // Assuming 4.8% annual passive income
  const inflationAdjustedValue = finalAmount / Math.pow(1.06, years); // Assuming 6% inflation

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-semibold text-gray-800">Investment Insights</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 glass card-hover">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Monthly Passive Income</h4>
              <p className="text-lg font-semibold text-primary">
                {formatCurrency(monthlyPassiveIncome)}
              </p>
              <p className="text-sm text-gray-500">
                Estimated monthly returns at 4.8% p.a.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glass card-hover">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Inflation-Adjusted Value</h4>
              <p className="text-lg font-semibold text-primary">
                {formatCurrency(inflationAdjustedValue)}
              </p>
              <p className="text-sm text-gray-500">
                Present value assuming 6% inflation
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-primary/5 rounded-xl p-4">
        <h4 className="font-medium text-gray-700 mb-3">What You Could Do With This Amount</h4>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="w-4 h-4 text-primary" />
            <span>Purchase a property worth {formatCurrency(finalAmount * 0.8)}</span>
          </li>
          <li className="flex items-center space-x-2 text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>Fund higher education for your children</span>
          </li>
          <li className="flex items-center space-x-2 text-sm text-gray-600">
            <Car className="w-4 h-4 text-primary" />
            <span>Buy a luxury car worth {formatCurrency(finalAmount * 0.2)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InvestmentInsights;
