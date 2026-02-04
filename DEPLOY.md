# Deployment Guide

## GitHub Repository
**URL:** https://github.com/yksanjo/enterprise-ai-assistant

## Quick Demo Commands

```bash
# Clone and run
git clone https://github.com/yksanjo/enterprise-ai-assistant.git
cd enterprise-ai-assistant
npm install
npm run dev
```

## Deploy to Render/Railway/Heroku

### Option 1: Render (Recommended)
1. Connect GitHub repo to Render
2. Set build command: `npm install && cd client && npm install && npm run build`
3. Set start command: `cd server && npm start`
4. Deploy!

### Option 2: Railway
```bash
npm install -g railway
railway login
railway init
railway up
```

### Option 3: Heroku
```bash
heroku create enterprise-ai-assistant
heroku git:remote -a enterprise-ai-assistant
git push heroku main
```

## Demo Checklist for ABC

Before pitching, verify:
- [ ] `npm run dev` starts both servers
- [ ] Dashboard shows metrics
- [ ] Chat responds with AI messages
- [ ] Knowledge base search works
- [ ] SOP generator creates documents

## Pitch Flow

1. **Open Dashboard** - Show cost savings ($540K)
2. **Navigate to Chat** - Demo HR/IT context switching
3. **Search KB** - Show semantic search results
4. **Generate SOP** - Create a sample procedure
5. **Show GitHub** - Code quality and architecture

## Post-ABC Follow-up

Send within 24 hours:
- Demo video (Loom)
- Technical architecture doc
- Pilot proposal ($15K for 3 months)
- Team backgrounds

---

**Repository:** https://github.com/yksanjo/enterprise-ai-assistant  
**Live Demo:** Run locally with `npm run dev`
