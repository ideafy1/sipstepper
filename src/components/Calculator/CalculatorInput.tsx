
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CalculatorInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  info?: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  value,
  onChange,
  type = "number",
  min = 0,
  max = 100,
  step = 1,
  suffix,
  prefix,
  info,
}) => {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0].toString());
  };

  return (
    <div className="input-container animate-fadeIn">
      <div className="flex justify-between items-center">
        <Label className="input-label">{label}</Label>
        {info && <span className="text-xs text-gray-500">{info}</span>}
      </div>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </span>
        )}
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className={`input-field ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-8' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
      <Slider
        defaultValue={[parseFloat(value.toString())]}
        max={max}
        min={min}
        step={step}
        value={[parseFloat(value.toString())]}
        onValueChange={handleSliderChange}
        className="mt-2"
      />
    </div>
  );
};

export default CalculatorInput;
