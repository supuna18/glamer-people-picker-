import React from 'react';
import { Outlet } from 'react-router-dom'; // පිටු මාරු වෙන්නේ මෙතනට
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-dark-900 text-slate-200">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet /> 
      </div>
    </div>
  );
}