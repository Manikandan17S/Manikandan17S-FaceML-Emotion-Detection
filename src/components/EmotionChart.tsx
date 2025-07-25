import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EmotionData {
  time: string;
  emotion: string;
  confidence: number;
}

interface EmotionChartProps {
  data: EmotionData[];
}

const EmotionChart: React.FC<EmotionChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
            tickFormatter={(value) => value.split(':').slice(0, 2).join(':')}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
            formatter={(value: number, name: string) => [`${value}%`, 'Confidence']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="confidence" 
            stroke="#06B6D4" 
            strokeWidth={2}
            dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#06B6D4' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionChart;