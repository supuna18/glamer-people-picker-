import React from 'react';
import { Users, Activity, DollarSign } from 'lucide-react';
import RevenueChart from '../components/RevenueChart'; // Import Chart
import RecentActivity from '../components/RecentActivity'; // Import Activity

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 hover:border-gold-500/30 transition-all duration-300">
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
    <div className="space-y-6 animate-fade-in"> 
      <header>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back to Glamer Admin.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value="1,234" icon={Users} color="bg-gold-500 text-gold-500" />
        <StatCard title="Active Sessions" value="56" icon={Activity} color="bg-blue-500 text-blue-500" />
        <StatCard title="Revenue" value="$45k" icon={DollarSign} color="bg-green-500 text-green-500" />
      </div>
      
      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart takes up 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        
        {/* Activity takes up 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}