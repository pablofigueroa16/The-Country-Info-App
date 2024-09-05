"use client";

import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationChartProps {
  data: PopulationData[];
}

const PopulationChart: FC<PopulationChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis 
          tick={{ fontSize: 12 }}  
          tickFormatter={(value) => `${value / 1000}k`}  
        />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#8884d8" 
          strokeWidth={2}  
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationChart;
