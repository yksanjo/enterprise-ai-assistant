import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Eye, ThumbsUp, Filter, Plus } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function KnowledgeBase() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/kb/categories`);
      setCategories(res.data.categories);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const res = await axios.get(`${API_URL}/kb/search?${params}`);
      setArticles(res.data.results);
    } catch (err) {
      console.error('Failed to load articles');
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(fetchArticles, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
        <p className="text-gray-600">
          Self-service HR and company information powered by AI semantic search
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, policies, procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Article
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
            className={`p-4 rounded-xl border transition-colors text-left ${
              selectedCategory === cat.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <BookOpen className={`w-8 h-8 mb-2 ${
              selectedCategory === cat.id ? 'text-primary-600' : 'text-gray-400'
            }`} />
            <h3 className="font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.articles} articles</p>
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold">
            {loading ? 'Loading...' : `${articles.length} Articles Found`}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            Sorted by relevance
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {articles.map((article) => (
              <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views?.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    94% helpful
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h4 className="font-semibold mb-1">Self-Service Rate</h4>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-sm opacity-90">Employees find answers without contacting HR</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h4 className="font-semibold mb-1">Time Saved</h4>
          <p className="text-3xl font-bold">12 hrs/week</p>
          <p className="text-sm opacity-90">Average HR team time saved</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h4 className="font-semibold mb-1">Employee Satisfaction</h4>
          <p className="text-3xl font-bold">4.6/5</p>
          <p className="text-sm opacity-90">Average rating on KB usefulness</p>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBase;
