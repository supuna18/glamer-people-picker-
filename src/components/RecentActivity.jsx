import React from 'react';

const activities = [
  { id: 1, user: 'User 5', action: 'Created new project', time: '2 min ago', status: 'success' },
  { id: 2, user: 'User 12', action: 'Updated profile', time: '1 hour ago', status: 'neutral' },
  { id: 3, user: 'User 3', action: 'Deleted task', time: '3 hours ago', status: 'danger' },
  { id: 4, user: 'User 8', action: 'Added comment', time: '5 hours ago', status: 'neutral' },
  { id: 5, user: 'User 1', action: 'Completed milestone', time: '1 day ago', status: 'success' },
];

export default function RecentActivity() {
  return (
    <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 h-full">
      <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-dark-700 last:border-0 last:pb-0">
            <div className={`w-2 h-2 mt-2 rounded-full ${
              item.status === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 
              item.status === 'danger' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-slate-500'
            }`} />
            <div>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">{item.user}</span> {item.action}
              </p>
              <p className="text-xs text-slate-500 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}