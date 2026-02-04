import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle, Clock, Wand2, Download, Edit } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function SOPGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    processSteps: ''
  });
  const [generating, setGenerating] = useState(false);
  const [generatedSOP, setGeneratedSOP] = useState(null);
  const [recentSOPs, setRecentSOPs] = useState([
    { id: 1, title: 'Employee Onboarding Process', status: 'published', lastUpdated: '2025-01-15', author: 'HR Team', steps: 12 },
    { id: 2, title: 'Quarterly Performance Review', status: 'draft', lastUpdated: '2025-02-01', author: 'People Ops', steps: 8 },
    { id: 3, title: 'Security Incident Response', status: 'published', lastUpdated: '2024-12-20', author: 'Security Team', steps: 15 }
  ]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);

    try {
      const res = await axios.post(`${API_URL}/sops/generate`, formData);
      setGeneratedSOP(res.data);
      setRecentSOPs(prev => [res.data.sop, ...prev]);
    } catch (err) {
      console.error('Generation failed');
    }

    setGenerating(false);
  };

  const exampleProcesses = [
    "New Employee Equipment Setup",
    "Travel Expense Reimbursement",
    "Software Access Request",
    "Remote Work Approval",
    "Vendor Onboarding"
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SOP Generator</h1>
        <p className="text-gray-600">
          AI-powered Standard Operating Procedure creation from process descriptions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generation Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-purple-600" />
            Generate New SOP
          </h2>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SOP Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Employee Onboarding Process"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Process Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the process in natural language..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Steps (optional)
              </label>
              <textarea
                value={formData.processSteps}
                onChange={(e) => setFormData({ ...formData, processSteps: e.target.value })}
                placeholder="List any specific steps that must be included..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={generating || !formData.title}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate SOP
                </>
              )}
            </button>
          </form>

          {/* Quick Start */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Start Templates</h3>
            <div className="flex flex-wrap gap-2">
              {exampleProcesses.map((process) => (
                <button
                  key={process}
                  onClick={() => setFormData({ ...formData, title: process })}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
                >
                  {process}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Result */}
        <div className="space-y-6">
          {generatedSOP && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-900">SOP Generated Successfully!</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-lg">{generatedSOP.sop.title}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {generatedSOP.sop.steps} steps
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Created {generatedSOP.sop.lastUpdated}
                  </span>
                </div>
              </div>

              {generatedSOP.suggestions && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">AI Suggestions:</p>
                  <ul className="space-y-1">
                    {generatedSOP.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-purple-500" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit SOP
                </button>
                <button className="flex-1 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          )}

          {/* Recent SOPs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold">Recent SOPs</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentSOPs.map((sop) => (
                <div key={sop.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{sop.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{sop.steps} steps</span>
                        <span>Updated {sop.lastUpdated}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sop.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <p className="text-3xl font-bold text-primary-600">28</p>
              <p className="text-sm text-gray-500">Total SOPs</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <p className="text-3xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-500">Time Saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SOPGenerator;
