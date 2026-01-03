import React from 'react';
import { Users, Activity, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-opacity-10 ${color}`}>
        <Icon className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back to Glamer Admin.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value="1,234" icon={Users} color="bg-gold-500 text-gold-500" />
        <StatCard title="Active Sessions" value="56" icon={Activity} color="bg-blue-500 text-blue-500" />
        <StatCard title="Revenue" value="$45k" icon={DollarSign} color="bg-green-500 text-green-500" />
      </div>
      
      {/* තව charts හෝ content මෙතනට දාන්න පුළුවන් */}
      <div className="p-8 border border-dashed border-dark-700 rounded-2xl flex items-center justify-center text-slate-500">
        Chart Component Placeholder
      </div>
    </div>
  );
}