import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { 
  MessageSquare, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Bot,
  Menu,
  X,
  Zap
} from 'lucide-react';
import Chat from './components/Chat';
import KnowledgeBase from './components/KnowledgeBase';
import SOPGenerator from './components/SOPGenerator';
import Dashboard from './components/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/chat', icon: MessageSquare, label: 'AI Assistant' },
    { path: '/kb', icon: BookOpen, label: 'Knowledge Base' },
    { path: '/sop', icon: FileText, label: 'SOP Generator' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside 
          className={`${sidebarOpen ? 'w-64' : 'w-16'} 
            bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <Bot className="w-8 h-8 text-primary-600" />
                <span className="font-bold text-lg">EnterpriseAI</span>
              </div>
            ) : (
              <Bot className="w-8 h-8 text-primary-600 mx-auto" />
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          <nav className="flex-1 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-lg mb-1
                  transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                  ${!sidebarOpen && 'justify-center'}
                `}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {sidebarOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} />
                  <span className="font-semibold text-sm">ABC Ready</span>
                </div>
                <p className="text-xs opacity-90">
                  Built for next.nyc Always Be Closing
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/kb" element={<KnowledgeBase />} />
            <Route path="/sop" element={<SOPGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
