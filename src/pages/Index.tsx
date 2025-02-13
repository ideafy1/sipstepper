
import React, { useState, useCallback } from 'react';
import CalculatorInput from '@/components/Calculator/CalculatorInput';
import ResultsChart from '@/components/Calculator/ResultsChart';
import ResultsCard from '@/components/Calculator/ResultsCard';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Percent } from 'lucide-react';

const Index = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [investmentPeriod, setInvestmentPeriod] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [annualIncrease, setAnnualIncrease] = useState('10');
  const [results, setResults] = useState<any>(null);

  const calculateReturns = useCallback(() => {
    const monthly = parseFloat(monthlyInvestment);
    const years = parseInt(investmentPeriod);
    const returnRate = parseFloat(expectedReturn) / 100;
    const increase = parseFloat(annualIncrease) / 100;

    let totalInvestment = 0;
    let totalValue = 0;
    const chartData = [];

    let currentMonthlyInvestment = monthly;

    for (let year = 1; year <= years; year++) {
      let yearlyInvestment = currentMonthlyInvestment * 12;
      totalInvestment += yearlyInvestment;

      // Calculate returns for this year
      totalValue = (totalValue + yearlyInvestment) * (1 + returnRate);

      chartData.push({
        year,
        investment: totalInvestment,
        returns: totalValue,
      });

      // Increase monthly investment for next year
      currentMonthlyInvestment *= (1 + increase);
    }

    setResults({
      totalInvestment,
      totalReturns: totalValue - totalInvestment,
      finalAmount: totalValue,
      chartData,
    });
  }, [monthlyInvestment, investmentPeriod, expectedReturn, annualIncrease]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Step-Up SIP Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plan your financial future with our Step-Up SIP calculator. Visualize how increasing your monthly investments annually can significantly boost your wealth.
          </p>
        </div>

        <Card className="p-6 md:p-8 glass">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <CalculatorInput
                label="Monthly Investment"
                value={monthlyInvestment}
                onChange={setMonthlyInvestment}
                prefix="₹"
                min={500}
                max={1000000}
              />
              <CalculatorInput
                label="Investment Period"
                value={investmentPeriod}
                onChange={setInvestmentPeriod}
                suffix="Years"
                min={1}
                max={40}
              />
              <CalculatorInput
                label="Expected Return Rate"
                value={expectedReturn}
                onChange={setExpectedReturn}
                suffix="%"
                min={1}
                max={30}
              />
              <CalculatorInput
                label="Annual Increase in Investment"
                value={annualIncrease}
                onChange={setAnnualIncrease}
                suffix="%"
                min={0}
                max={100}
              />
              <Button 
                className="w-full button-primary"
                onClick={calculateReturns}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Returns
              </Button>
            </div>

            <div className="space-y-6">
              {results && (
                <>
                  <ResultsCard
                    totalInvestment={results.totalInvestment}
                    totalReturns={results.totalReturns}
                    finalAmount={results.finalAmount}
                  />
                  <ResultsChart data={results.chartData} />
                </>
              )}
            </div>
          </div>
        </Card>

        <div className="text-center text-sm text-gray-500">
          Note: The calculations are based on assumed annual returns and may vary from actual returns.
        </div>
      </div>
    </div>
  );
};

export default Index;
