import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export default function RevenueChart() {
  return (
    <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 h-[400px]">
      <h3 className="text-xl font-bold text-white mb-6">Revenue Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
            itemStyle={{ color: '#EAB308' }}
          />
          <Area type="monotone" dataKey="value" stroke="#EAB308" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}