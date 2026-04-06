/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar, ViewType } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AIAssistant } from './components/AIAssistant';
import { Scheduler } from './components/Scheduler';
import { MaterialHub } from './components/MaterialHub';
import { HealthMonitor } from './components/HealthMonitor';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'scheduler':
        return <Scheduler />;
      case 'materials':
        return <MaterialHub />;
      case 'health':
        return <HealthMonitor />;
      case 'settings':
        return (
          <div className="p-8 flex items-center justify-center h-screen bg-[#F5F5F5]">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#141414]/5 rounded-3xl flex items-center justify-center mx-auto text-[#141414]/20">
                <span className="text-4xl font-bold">⚙️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#141414]">Settings</h2>
              <p className="text-[#141414]/40 max-w-xs mx-auto">Configure your AI preferences, API keys, and notification settings.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
