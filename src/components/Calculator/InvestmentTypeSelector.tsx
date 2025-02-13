
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, ArrowUpDown, Coins } from 'lucide-react';

interface InvestmentTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const InvestmentTypeSelector: React.FC<InvestmentTypeSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
  const types = [
    {
      id: 'sip',
      name: 'SIP',
      description: 'Systematic Investment Plan',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'swp',
      name: 'SWP',
      description: 'Systematic Withdrawal Plan',
      icon: <ArrowUpDown className="w-4 h-4" />,
    },
    {
      id: 'stp',
      name: 'STP',
      description: 'Systematic Transfer Plan',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'lumpsum',
      name: 'Lumpsum',
      description: 'One-time Investment',
      icon: <Coins className="w-4 h-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {types.map((type) => (
        <Button
          key={type.id}
          variant={selectedType === type.id ? "default" : "outline"}
          className={`h-auto py-4 flex flex-col items-center space-y-1 ${
            selectedType === type.id ? 'bg-primary text-white' : ''
          }`}
          onClick={() => onSelect(type.id)}
        >
          {type.icon}
          <span className="font-medium">{type.name}</span>
          <span className="text-xs opacity-70">{type.description}</span>
        </Button>
      ))}
    </div>
  );
};

export default InvestmentTypeSelector;
