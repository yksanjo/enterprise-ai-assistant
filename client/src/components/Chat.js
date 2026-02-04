import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your Enterprise AI Assistant. I can help with HR questions, IT support, company policies, and more. What can I help you with today?",
      context: 'general'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState('general');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: input,
        context: context
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.response,
        confidence: res.data.confidence,
        suggestedActions: res.data.suggestedActions
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble processing your request. Please try again or contact IT support.',
        error: true
      }]);
    }

    setLoading(false);
  };

  const contexts = [
    { id: 'general', label: 'General', color: 'bg-gray-100 text-gray-700' },
    { id: 'hr', label: 'HR & Benefits', color: 'bg-blue-100 text-blue-700' },
    { id: 'it', label: 'IT Support', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary-600" />
              AI Assistant
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enterprise-grade conversational AI for employee support
            </p>
          </div>
          <div className="flex gap-2">
            {contexts.map(ctx => (
              <button
                key={ctx.id}
                onClick={() => setContext(ctx.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  context === ctx.id ? ctx.color : 'bg-gray-100 text-gray-500'
                }`}
              >
                {ctx.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''} chat-message`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-primary-100' 
                : 'bg-gradient-to-br from-purple-500 to-blue-500'
            }`}>
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-primary-600" />
              ) : (
                <Sparkles className="w-5 h-5 text-white" />
              )}
            </div>
            <div className={`max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-4 rounded-2xl text-left ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white rounded-tr-sm'
                  : 'bg-white border border-gray-200 rounded-tl-sm shadow-sm'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              {message.confidence && (
                <p className="text-xs text-gray-400 mt-1">
                  Confidence: {(message.confidence * 100).toFixed(0)}%
                </p>
              )}
              {message.suggestedActions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 chat-message">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about HR policies, IT support, company procedures..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Enterprise AI Assistant • SOC 2 Compliant • Data encrypted in transit and at rest
        </p>
      </div>
    </div>
  );
}

export default Chat;
