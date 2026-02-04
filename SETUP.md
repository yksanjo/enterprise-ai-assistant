# Quick Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/enterprise-ai-assistant.git
cd enterprise-ai-assistant

# 2. Install server dependencies
cd server
npm install
cd ..

# 3. Install client dependencies
cd client
npm install
cd ..

# 4. Start both servers
npm run dev
```

## Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
# (OpenAI key optional for MVP - works with mock responses)
```

## Access the App

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api

## Project Structure

```
enterprise-ai-assistant/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Chat.js       # AI Assistant
│   │   │   ├── KnowledgeBase.js  # KB search
│   │   │   ├── SOPGenerator.js   # SOP creation
│   │   │   └── Dashboard.js      # Analytics
│   │   ├── App.js         # Main app
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Express server
│   └── package.json
├── README.md             # Main readme
├── PITCH.md              # ABC pitch deck
└── package.json          # Root package.json
```

## Demo Flow for ABC

1. **Dashboard** - Show metrics and cost savings
2. **AI Assistant** - Demo chat with HR/IT context
3. **Knowledge Base** - Search for policies
4. **SOP Generator** - Create a procedure from text

## Production Deployment

```bash
# Build client
npm run build

# Start production server
npm start
```

## Contact

For ABC program inquiries or pilot partnerships.
