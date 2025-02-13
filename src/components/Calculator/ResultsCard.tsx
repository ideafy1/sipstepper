
import React from 'react';
import { Card } from "@/components/ui/card";

interface ResultsCardProps {
  totalInvestment: number;
  totalReturns: number;
  finalAmount: number;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  totalInvestment,
  totalReturns,
  finalAmount,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
      <Card className="p-6 glass card-hover">
        <h3 className="text-sm text-gray-600">Invested Amount</h3>
        <p className="text-2xl font-semibold text-primary mt-2">
          {formatCurrency(totalInvestment)}
        </p>
      </Card>
      <Card className="p-6 glass card-hover">
        <h3 className="text-sm text-gray-600">Est. Returns</h3>
        <p className="text-2xl font-semibold text-primary mt-2">
          {formatCurrency(totalReturns)}
        </p>
      </Card>
      <Card className="p-6 glass card-hover">
        <h3 className="text-sm text-gray-600">Total Value</h3>
        <p className="text-2xl font-semibold text-primary mt-2">
          {formatCurrency(finalAmount)}
        </p>
      </Card>
    </div>
  );
};

export default ResultsCard;
