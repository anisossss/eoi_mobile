# CSIR EOI 8119 - Mobile Backend
# Simple Express.js API for mobile app

FROM node:20-alpine

WORKDIR /app

# Create package.json
RUN echo '{\
  "name": "mobile-backend",\
  "version": "1.0.0",\
  "main": "server.js",\
  "dependencies": {\
  "express": "^4.18.2",\
  "cors": "^2.8.5"\
  }\
  }' > package.json

# Install dependencies
RUN npm install

# Create server
RUN echo 'const express = require("express");\
  const cors = require("cors");\
  const app = express();\
  app.use(cors());\
  app.use(express.json());\
  \
  app.get("/", (req, res) => {\
  res.json({ message: "AINEXIM Mobile Backend API", version: "1.0.0", eoi: "8119/06/02/2026" });\
  });\
  \
  app.get("/api/health", (req, res) => {\
  res.json({ status: "healthy", timestamp: new Date().toISOString() });\
  });\
  \
  app.get("/api/incidents", (req, res) => {\
  res.json({ incidents: [\
  { id: "1", title: "Equipment Check", severity: "low", status: "resolved" },\
  { id: "2", title: "Safety Drill", severity: "medium", status: "active" }\
  ]});\
  });\
  \
  app.get("/api/checklists", (req, res) => {\
  res.json({ checklists: [\
  { id: "1", title: "Daily Safety Check", completed: 8, total: 10 },\
  { id: "2", title: "Equipment Inspection", completed: 5, total: 5 }\
  ]});\
  });\
  \
  const PORT = process.env.PORT || 5002;\
  app.listen(PORT, () => console.log(`Mobile Backend running on port ${PORT}`));' > server.js

EXPOSE 5002

CMD ["node", "server.js"]
