"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', leads: 0 },
  { name: 'Mar', leads: 0 },
  { name: 'Mer', leads: 0 },
  { name: 'Jeu', leads: 0 },
  { name: 'Ven', leads: 0 },
  { name: 'Sam', leads: 0 },
  { name: 'Dim', leads: 0 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
        <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#333', borderRadius: '8px' }}
          itemStyle={{ color: '#25D366' }}
        />
        <Line 
          type="monotone" 
          dataKey="leads" 
          stroke="#25D366" 
          strokeWidth={3}
          dot={{ fill: '#25D366', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
