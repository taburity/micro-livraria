FROM node\nWORKDIR /app\nCOPY . /app\nRUN npm install\nCMD ["node", "/app/services/shipping/index.js"]
