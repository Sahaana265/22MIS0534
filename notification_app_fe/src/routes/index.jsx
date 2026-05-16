import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import AllNotifications from '../pages/AllNotifications';
import PriorityInbox from '../pages/PriorityInbox';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="notifications" element={<AllNotifications />} />
        <Route path="priority" element={<PriorityInbox />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
