# VYAPARsaarthi 🚀
### AI Representation Optimizer for Merchants

VYAPARSaarthi is an AI-powered merchant intelligence platform built for the Kasparro Track 5: AI Representation Optimizer challenge.

The platform helps merchants understand **how AI shopping agents perceive their store**, identify representation gaps, simulate AI ranking behavior, optimize products, and improve discoverability using AI.

Unlike traditional dashboards, VYAPARSaarthi acts as a complete AI assistant that diagnoses, simulates, improves, and guides merchants toward stronger AI visibility.

---

## Problem Statement

AI shopping assistants are becoming the new way customers discover products.

However, many merchants struggle because AI systems often misunderstand products due to:

- Generic titles
- Weak descriptions
- Missing FAQs
- Missing policies
- Low trust signals
- Poor discoverability
- Incomplete product context

As a result:

- products rank lower
- AI assistants ignore products
- visibility decreases
- customer trust drops

Merchants currently have no way to understand:

> “How does AI actually see my store?”

VYAPARSaarthi solves this.

---

# Solution

VYAPARSaarthi acts as an AI representation layer between merchants and AI shopping systems.

The system:

✅ analyzes products

✅ identifies AI readiness gaps

✅ simulates AI shopping behavior

✅ generates optimization suggestions

✅ applies AI improvements

✅ updates database content

✅ recalculates scores

✅ guides merchants conversationally

---

# Core Features

## 1. AI Store Dashboard

The dashboard gives merchants a complete AI health overview.

Includes:

- Store Readiness Score
- Discoverability score
- Product clarity
- Trust signals
- Conversion readiness
- Weekly score growth
- Product issue tracking
- Top recommendations
- AI voice assistant access

Dashboard allows merchants to quickly identify weak areas across the store.

---

## 2. Product Intelligence

Every product receives AI analysis.

Products are scored based on:

- Discoverability
- Clarity
- Trust
- Conversion

Products are classified as:

- Good
- Average
- Worst

Merchants can view complete product details.

---

## Product Detail Intelligence

Each product contains a dedicated AI intelligence page.

Displays:

- Overall Score
- Discoverability
- Trust
- Clarity
- Conversion

---

### Apply AI Improvements

One-click AI optimization.

When merchants click:

```text
Apply AI Improvements
```

The system:

- rewrites title
- improves product description
- adds search intent keywords
- generates richer AI content
- updates database values
- recalculates score automatically

Product scores improve in real-time.

Example:

Before:

AI Score → 28

After:

AI Score → 71

Improvement:

+43 points

This creates measurable AI visibility improvement.

---

## 3. AI Shopping Simulation

Simulates how AI shopping assistants discover and rank products.

Example:

```text
best shoes under 5000
```

Simulation returns:

- AI ranking order
- visibility score
- recommendation likelihood
- product comparison

Allows merchants to understand:

> "How AI currently sees my products."

---

## 4. AI Product Studio

Generate AI optimized content instantly.

Merchant uploads:

- Product image
- Title
- Description

AI Studio generates:

- optimized title
- improved description
- suggested FAQs
- SEO guidance
- product recommendations

The feature acts as a content assistant before products go live.

---

## 5. Personalized AI Voice Assistant(Saarthi Assist)

VYAPARSaarthi includes an intelligent store-aware voice assistant.

The assistant is personalized according to merchant store data.

Unlike generic chatbots, the assistant understands:

- products
- scores
- recommendations
- store insights
- AI readiness

Merchants can ask:

"What is my current store score?"

"Which is my best product?"

"How can I improve TrailBlaze title?"

"Why is my discoverability low?"


---

### Multilingual Support

Supports:

- English
- Hindi
- Hinglish

Examples:

English:

```text
Which product performs best?
```

Hindi:

```text
Mera sabse accha product kaunsa hai?
```

Hinglish:

```text
Mera current score kitna hai?
```

Voice responses are personalized according to merchant data.

---

## 6. Store Insights

Provides complete AI business intelligence.

Includes:

- Store health score
- Customer trust
- Buying confidence
- Search visibility
- Sales blockers
- Store strengths

Allows merchants to understand overall business performance.

---

## 7. Recommendations Engine

Generates high-priority recommendations.

Examples:

- Add FAQs
- Add Return Policy
- Improve ratings
- Increase trust signals
- Improve descriptions
- Improve discoverability

Recommendations are prioritized by impact.

---

# Workflow

```text
Merchant Login
       ↓
Dashboard Analysis
       ↓
Product Intelligence
       ↓
AI Gap Detection
       ↓
AI Simulation
       ↓
Voice Guidance
       ↓
Apply Improvements
       ↓
Database Updated
       ↓
Score Recalculated
       ↓
Higher AI Visibility
```

---

# Architecture

```text
React Frontend
      ↓
Node + Express Backend
      ↓
MongoDB Database
      ↓
AI Service Layer
     ├── Scoring Engine
     ├── Voice Assistant
     ├── Recommendation Engine
     ├── Simulation Engine
     └── AI Optimization Engine
```

---

# Tech Stack

## Frontend

- React
- Tailwind CSS
- React Router
- Lucide React

## Backend

- Node.js
- Express.js

## Database

- MongoDB

## AI Layer

- OpenAI APIs
- AI Recommendation Engine
- Personalized Voice Assistant
- AI Simulation Logic
- Custom Scoring Engine

---

# AI Scoring Logic

Products are evaluated across:

- Discoverability
- Trust
- Clarity
- Conversion

Formula:

Overall Score

= (0.30 × Discoverability)

+ (0.30 × Trust)

+ (0.20 × Clarity)

+ (0.20 × Conversion)

---

# Example Case Study

## TrailBlaze X Hiking Boots

Initial Score:

28/100

Detected Issues:

- weak discoverability
- generic title
- poor keyword relevance
- limited trust signals

Merchant clicked:

Apply AI Improvements

AI changes:

✓ optimized title

✓ richer product description

✓ improved AI search keywords

✓ stronger recommendation intent

Result:

Final Score:

71/100

Increase:

+43 points

---

# Folder Structure

```text
frontend/
    src/
       components/
       pages/
       services/

backend/
    controllers/
    routes/
    services/
    models/
```

---
# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Saurav07-dot/VyaparSaarthi.git
cd VYAPARSaarthi
```

---

## 2. Install Frontend Dependencies

Move to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Core frontend packages used:

```bash
react
react-router-dom
axios
tailwindcss
lucide-react
framer-motion
recharts
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 3. Install Backend Dependencies

Open a new terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Core backend packages used:

```bash
express
mongoose
cors
dotenv
jsonwebtoken
bcryptjs
multer
@google/generative-ai
nodemon
```

Start backend:

```bash
nodemon server.js
```

Backend runs at:

```text
http://localhost:5000
```

---

## 4. Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key1

GEMINI_RECOMMENDATION_KEY=your_gemini_api_key2

GEMINI_STUDIO_API=your_gemini_api_key3

GEMINI_VOICE_KEY=your_gemini_api_key4
```

---

## 5. Run Project

Frontend:

```bash
npm run dev
```

Backend:

```bash
nodemon server.js
```
--- 

# Future Improvements

- Shopify live integration
- real AI shopping agent APIs
- image optimization engine
- advanced analytics
- multilingual expansion
- predictive AI recommendations

---

# Demo

Demo Video:

https://drive.google.com/file/d/1NmyOgR4BN_mXcXK3lkm_Be6eWdtOPTej/view?usp=sharing

---

## 👥 Team

| Name | Role |
|---|---|
| **Saurav Kumar** | Full Stack + AI Integration |
| **Ankit Kumar Jha** | Product Design + Frontend |

**Team Name:** PLAN B  
**Hackathon:** Kasparro Agentic Commerce Hackathon  

---

<div align="center">

**VYAPARsaarthi** — *Helping merchants improve AI visibility and product discoverability.*

Built for the Kasparro Agentic Commerce Hackathon

</div>