
import React, { useState, useCallback } from 'react';
import CalculatorInput from '@/components/Calculator/CalculatorInput';
import ResultsChart from '@/components/Calculator/ResultsChart';
import ResultsCard from '@/components/Calculator/ResultsCard';
import InvestmentInsights from '@/components/Calculator/InvestmentInsights';
import InvestmentComparison from '@/components/Calculator/InvestmentComparison';
import InvestmentTypeSelector from '@/components/Calculator/InvestmentTypeSelector';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Percent } from 'lucide-react';

const Index = () => {
  const [investmentType, setInvestmentType] = useState('sip');
  // SIP related states
  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [annualIncrease, setAnnualIncrease] = useState('10');
  // SWP related states
  const [initialAmount, setInitialAmount] = useState('1000000');
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState('10000');
  // Lumpsum related state
  const [lumpsumAmount, setLumpsumAmount] = useState('500000');
  // Common states
  const [investmentPeriod, setInvestmentPeriod] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [results, setResults] = useState<any>(null);

  const calculateReturns = useCallback(() => {
    let totalInvestment = 0;
    let totalValue = 0;
    const chartData = [];
    const yearlyDetails = [];
    const years = parseInt(investmentPeriod);
    const returnRate = parseFloat(expectedReturn) / 100;

    if (investmentType === 'sip') {
      let currentMonthlyInvestment = parseFloat(monthlyInvestment);
      const increase = parseFloat(annualIncrease) / 100;

      for (let year = 1; year <= years; year++) {
        let yearlyInvestment = currentMonthlyInvestment * 12;
        totalInvestment += yearlyInvestment;
        const previousValue = totalValue;
        totalValue = (totalValue + yearlyInvestment) * (1 + returnRate);
        const yearlyReturn = totalValue - previousValue - yearlyInvestment;

        chartData.push({
          year,
          investment: totalInvestment,
          returns: totalValue,
        });

        yearlyDetails.push({
          year,
          monthlyInvestment: currentMonthlyInvestment,
          yearlyInvestment,
          yearlyReturn,
          totalValue,
        });

        currentMonthlyInvestment *= (1 + increase);
      }
    } else if (investmentType === 'swp') {
      totalValue = parseFloat(initialAmount);
      const monthlyWithdrawalAmount = parseFloat(monthlyWithdrawal);
      totalInvestment = totalValue;

      for (let year = 1; year <= years; year++) {
        const yearlyWithdrawal = monthlyWithdrawalAmount * 12;
        const previousValue = totalValue;
        totalValue = (totalValue - yearlyWithdrawal) * (1 + returnRate);

        chartData.push({
          year,
          investment: totalInvestment,
          returns: totalValue,
        });

        yearlyDetails.push({
          year,
          withdrawalAmount: yearlyWithdrawal,
          yearlyReturn: totalValue - previousValue + yearlyWithdrawal,
          totalValue,
        });
      }
    } else if (investmentType === 'lumpsum') {
      totalInvestment = parseFloat(lumpsumAmount);
      totalValue = totalInvestment;

      for (let year = 1; year <= years; year++) {
        const previousValue = totalValue;
        totalValue = totalValue * (1 + returnRate);
        const yearlyReturn = totalValue - previousValue;

        chartData.push({
          year,
          investment: totalInvestment,
          returns: totalValue,
        });

        yearlyDetails.push({
          year,
          yearlyReturn,
          totalValue,
        });
      }
    }

    setResults({
      totalInvestment,
      totalReturns: totalValue - totalInvestment,
      finalAmount: totalValue,
      chartData,
      yearlyDetails,
    });
  }, [investmentType, monthlyInvestment, investmentPeriod, expectedReturn, annualIncrease, initialAmount, monthlyWithdrawal, lumpsumAmount]);

  const renderInputs = () => {
    switch (investmentType) {
      case 'sip':
        return (
          <>
            <CalculatorInput
              label="Monthly Investment"
              value={monthlyInvestment}
              onChange={setMonthlyInvestment}
              prefix="₹"
              min={500}
              max={1000000}
              step={500}
              info="Start with a comfortable monthly amount"
            />
            <CalculatorInput
              label="Annual Increase in Investment"
              value={annualIncrease}
              onChange={setAnnualIncrease}
              suffix="%"
              min={0}
              max={100}
              step={1}
              info="Increase SIP with your income growth"
            />
          </>
        );
      case 'swp':
        return (
          <>
            <CalculatorInput
              label="Initial Investment Amount"
              value={initialAmount}
              onChange={setInitialAmount}
              prefix="₹"
              min={100000}
              max={10000000}
              step={10000}
              info="Total amount you want to invest initially"
            />
            <CalculatorInput
              label="Monthly Withdrawal"
              value={monthlyWithdrawal}
              onChange={setMonthlyWithdrawal}
              prefix="₹"
              min={1000}
              max={1000000}
              step={1000}
              info="Amount you want to withdraw monthly"
            />
          </>
        );
      case 'lumpsum':
        return (
          <CalculatorInput
            label="Lumpsum Amount"
            value={lumpsumAmount}
            onChange={setLumpsumAmount}
            prefix="₹"
            min={1000}
            max={10000000}
            step={1000}
            info="One-time investment amount"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Investment Calculator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Plan your financial future with our comprehensive investment calculator. Compare different investment types and strategies.
          </p>
        </div>

        <Card className="p-4 sm:p-6 md:p-8 glass">
          <InvestmentTypeSelector
            selectedType={investmentType}
            onSelect={setInvestmentType}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              {renderInputs()}
              <CalculatorInput
                label="Investment Period"
                value={investmentPeriod}
                onChange={setInvestmentPeriod}
                suffix="Years"
                min={1}
                max={40}
                step={1}
                info="Longer periods typically yield better results"
              />
              <CalculatorInput
                label="Expected Return Rate"
                value={expectedReturn}
                onChange={setExpectedReturn}
                suffix="%"
                min={1}
                max={30}
                step={0.5}
                info="Historical equity returns: 12-15% p.a."
              />
              <Button 
                className="w-full button-primary"
                onClick={calculateReturns}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Returns
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
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

        {results && (
          <>
            <Card className="p-4 sm:p-6 md:p-8 glass">
              <InvestmentInsights
                monthlyInvestment={parseFloat(investmentType === 'sip' ? monthlyInvestment : '0')}
                finalAmount={results.finalAmount}
                years={parseInt(investmentPeriod)}
              />
            </Card>

            <Card className="p-4 sm:p-6 md:p-8 glass">
              <InvestmentComparison
                amount={results.totalInvestment}
                years={parseInt(investmentPeriod)}
              />
            </Card>
          </>
        )}

        <div className="text-center text-xs sm:text-sm text-gray-500 px-4">
          Note: The calculations are based on assumed annual returns and may vary from actual returns. Past performance does not guarantee future results.
        </div>
      </div>
    </div>
  );
};

export default Index;
