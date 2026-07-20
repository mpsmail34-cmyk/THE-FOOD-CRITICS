import { PdrSection } from "../types";

export const pdrSections: PdrSection[] = [
  {
    id: "1",
    title: "1. Executive Summary",
    icon: "Target",
    category: "Strategic",
    content: `
### Vision
To empower global citizens with precise, evidence-based, and AI-driven personalized health pathways that turn complex biometric calculations into actionable, life-transforming wellness strategies.

### Mission
To bridge the gap between abstract health data (like height and weight) and actionable, hyper-personalized daily lifestyle protocols, combining certified medical formulas with state-of-the-art generative AI coaching.

### Business Objectives
- **Aesthetic Excellence:** Establish a high-retention digital wellness application using desktop-first visual premium grids, dark-mode styling, and animated telemetry metrics.
- **Scientific Trustworthiness:** Deliver clinical-grade calculation tools for BMI, BMR, and TDEE, augmented by a secure AI interpretation layer.
- **Durable Engagement:** Build user loyalty with robust interactive dashboards, progress logs, dynamic dietary blueprints, and customizable athletic regimes.

### Value Proposition
Unlike generic calculators that only offer static numerical outputs, our **Smart BMI Health Assessment Platform** interprets raw telemetry to deliver an immersive clinical analysis. It automatically designs 100% personalized meal and exercise guides to meet user-defined goals.

### Competitive Advantage
- **Server-Side Integration:** Secure execution of Google Gemini AI models prevents client-side exposure of proprietary keys.
- **Cohesive User Interface:** Eliminates fragmented, multi-step navigation by leveraging a single, responsive layout featuring contextual analytics widgets.
- **Exportability:** Provides dynamic client-side report compilation with full printing options.
    `
  },
  {
    id: "2",
    title: "2. Product Overview",
    icon: "Activity",
    category: "Strategic",
    content: `
### What the Product Is
An intelligent health assessment portal that processes biometric inputs (weight, height, age, biological sex, physical activity levels, culinary preferences, and underlying symptoms) to synthesize an instantly actionable health blueprint.

### Why It Is Crucial
The modern healthcare system suffers from highly fragmented information. Patients are given high-level biometric metrics (like BMI) without a clear understanding of the nutritional, physical, and lifestyle modifications required to correct or optimize their health. This platform acts as an automated, immediate first-step counselor.

### Core Target Demographics
- **Weight Management Cohorts:** Individuals seeking a structured weight loss or gain path.
- **Amateur & Professional Athletes:** Muscle development or cardiovascular optimization candidates.
- **Sub-clinical Users:** Patients managing diabetic-prone or low-mobility situations.
- **Coaches & Clinicians:** Experts who need quick baseline client evaluations.

### Monetization Model
1. **Premium Tier Access:** Highly optimized personalized recipe suggestions and custom athletic programs.
2. **Enterprise Licensing:** For corporate health benefits, offering custom dashboard integrations.
3. **Clinical Referral Channels:** Booking pathways to accredited dieticians and fitness coaches.
    `
  },
  {
    id: "3",
    title: "3. Market Research",
    icon: "TrendingUp",
    category: "Strategic",
    content: `
### Industry Trends
- **AI-Led Proactive Healthcare:** Shift from reactive treatment to proactive wellness diagnostics.
- **Aesthetic Density:** Users expect responsive dashboards with rich visualizations over simple lists.
- **Clinical Integration:** Wearables and tracking systems require unified interpretation centers.

### Comparative Competitor Analysis

| Competitor | Strengths | Weaknesses | Our Differentiator |
| :--- | :--- | :--- | :--- |
| **MyFitnessPal** | Massive food database; strong community features. | Rigid UI; high cost; limited AI interpretation. | High-quality, instant, custom-tailored meal guides. |
| **Noom** | Strong psychological tracking system. | Tedious daily logging; text-heavy. | Immediate dashboard summary with clear, scannable data. |
| **Fitbit / Apple Health** | Premium hardware telemetry. | Fragmented dietary guidance; closed-source ecosystem. | Universal browser utility requiring no hardware dependencies. |
| **HealthifyMe** | Solid metabolic assessments. | Heavy sales pitching; region-locked content. | Open, clean, developer-ready clinical reports. |
    `
  },
  {
    id: "4",
    title: "4. User Personas",
    icon: "Users",
    category: "Product & UX",
    content: `
### Profile 1: Weight Loss User (Sarah, 34)
- **Goal:** Lose 15 kg of adipose tissue over 6 months to reduce knee joint pressure.
- **Pain Points:** Hard to count calories; lacks ideas for balanced vegetarian meal prep.
- **Device:** Mobile-First.

### Profile 2: Athlete (David, 26)
- **Goal:** Increase skeletal muscle mass by 5 kg while keeping body fat under 12%.
- **Pain Points:** Needs high protein targets without feeling sluggish; hard to track macronutrients.
- **Device:** Desktop.

### Profile 3: Gym Member (Elena, 41)
- **Goal:** Optimize cardiovascular capacity and manage daily stress levels.
- **Pain Points:** Standard workout programs are too high-impact; prone to muscle strains.
- **Device:** Tablet / Mobile.

### Profile 4: Senior Citizen (James, 68)
- **Goal:** Maintain bone density, manage safe glycemic curves, and preserve physical mobility.
- **Pain Points:** Complex UI layouts are confusing; requires low-impact exercises.
- **Device:** Desktop, large typography.

### Profile 5: Doctor (Dr. Marcus, 52)
- **Goal:** Rapidly screen patients during consults and hand them a printable, structured overview.
- **Pain Points:** Existing medical software is slow and hard to configure.
- **Device:** Clinic Workstation.

### Profile 6: Nutritionist (Amara, 29)
- **Goal:** Create a high-quality nutritional baseline for clients to adjust manually.
- **Pain Points:** Takes hours to construct macro blueprints by hand.
- **Device:** Laptop / Desktop.
    `
  },
  {
    id: "5",
    title: "5. User Journey",
    icon: "Compass",
    category: "Product & UX",
    content: `
### Step-by-Step Platform Flow

1. **Awareness & Onboarding (Landing Page):**
   - User arrives at a clean, high-contrast dashboard with responsive graphics.
   - Highlights of scientific equations (Mifflin-St Jeor, WHO BMI parameters).

2. **Telemetry Capture (BMI Calculator):**
   - Immersive slide-based input dials for Weight, Height, Age, and Biological Sex.
   - Real-time client-side calculations update instantly.

3. **Intelligent Diagnostics (Health Report):**
   - Gemini AI generates an assessment of health risks, ideal weight targets, and timelines.
   - Displays body fat percentage estimate, BMR, and TDEE.

4. **Nutritional Blueprints (Diet Generator):**
   - A single click generates a 6-meal culinary day tailored to preferences.
   - Complete macronutrient grams, calories, and a categorized shopping list.

5. **Functional Fitness (Exercise Generator):**
   - Generates a customized 7-day workout routine.
   - Includes specific safety alerts and progressive overload suggestions.

6. **Continuous Monitoring (Progress Dashboard):**
   - Interactive weight and calorie progress trackers.
   - Milestones, historical records, and dynamic printable reports.
    `
  },
  {
    id: "6",
    title: "6. Information Architecture",
    icon: "Layout",
    category: "Product & UX",
    content: `
### Unified High-Fidelity Views

- **Landing Stage / Calculator Entry:** Primary gateway displaying the health inputs.
- **Core Analytics Hub:** Tabbed panels for immediate metrics viewing.
- **Health Report Terminal:** Detailed AI assessments of health risks, water targets, and sleep.
- **Dietary Atelier:** Visual list of meal cards (Breakfast, Snacks, Lunch, Dinner) and grocery list.
- **Athletic Center:** 7-day structured fitness grids with exercise, sets, reps, and description.
- **Telemetry History Board:** Visual charts of weight history, BMI trends, and calories.
- **PDR Document Reader:** Deep integration of the 30-section Software Product Development Report.
- **Mock Admin Control Panel:** Manage mock users, view platform system health, and adjust constants.
    `
  },
  {
    id: "7",
    title: "7. Sitemap",
    icon: "GitFork",
    category: "Product & UX",
    content: `
### Navigation Hierarchy

\`\`\`
[Root / Home Layout]
 ├── Landing Section (Hero, Features, Formulas)
 ├── Active Diagnostics Panel (Input sliders, Real-time calculations)
 ├── Core Tab Hub
 │    ├── 📋 Health Analysis (AI risks, Ideal metrics, Macronutrients)
 │    ├── 🍎 Diet Planner (Generated meals, Grocery list, Dietary tips)
 │    ├── 🏋️ Gym Routine (7-day workout schedule, Safety precautions)
 │    ├── 📈 Progress Hub (Weight & Calorie charts, History logs)
 │    ├── 📄 PDR Spec Reader (The 30-section enterprise report)
 │    └── ⚙️ Admin Console (System health, DB schema preview)
 └── Footer (Disclaimers, Medical guidelines)
\`\`\`
    `
  },
  {
    id: "8",
    title: "8. Feature List",
    icon: "CheckSquare",
    category: "AI & Features",
    content: `
### Core Features
- **Dynamic Calculation Matrix:** Highly responsive slider controls for real-time BMI metrics.
- **BMR & TDEE Simulators:** Calculates resting metabolism and daily caloric spending.
- **Interactive Progress Charts:** Visual tracking grids displaying weight and caloric progress.
- **PDF/Printer Compiler:** Instantly converts active views into clean, printable reports.

### Premium Features
- **Categorized Shopping Checklist:** Converts dietary recommendations into organized shopping items.
- **Sub-clinical Customization:** Excludes food groups or adjusts intensity for cardiovascular concerns.

### AI Features
- **Intelligent Assessment Engine:** Multi-dimensional health risk assessments based on biometric telemetry.
- **Diet Planner:** Custom-generates individual meals with portion-specific macronutrients.
- **Exercise Planner:** Tailors weekly routines with progressive weight rules.

### Admin Features
- **Telemetry Monitors:** Active graphs showing mock server load, API response times, and database metrics.
- **Medical Constants Control:** Modify baseline constants like the BMI brackets.
    `
  },
  {
    id: "9",
    title: "9. Functional Requirements",
    icon: "Terminal",
    category: "AI & Features",
    content: `
### FR-001: Biometric BMI Calculation
- **Input:** Height (cm), Weight (kg).
- **Behavior:** The system must compute BMI = Weight / (Height / 100)^2.
- **Output:** Numerical value (precision 0.1) and classification according to WHO standards.

### FR-002: BMR & TDEE Calculations
- **Input:** Age, Gender, Weight, Height, Activity Level.
- **Behavior:** Mifflin-St Jeor equation determines BMR. TDEE is computed via activity level multipliers.
- **Output:** Resting energy expenditure and total active expenditure (kcal).

### FR-003: AI Health Analysis & Risk Interpretation
- **Trigger:** Submission of the calculator.
- **Behavior:** Safe backend call to Gemini API using user metrics.
- **Output:** Health risks, ideal targets, macronutrient breakdowns, hydration, and sleep advice.

### FR-004: Interactive Progress Analytics
- **Behavior:** Users add historical logs (weight, calories, date).
- **Output:** Renders progress charts using Recharts for visual feedback.
    `
  },
  {
    id: "10",
    title: "10. Non-functional Requirements",
    icon: "ShieldAlert",
    category: "Technical Design",
    content: `
### Performance
- **Latency:** Core math calculations must compile in <10ms.
- **AI Latency:** Server-side Gemini processing should complete under 3 seconds, with clean loading states on the client.

### Security & Privacy
- **API Key Masking:** Gemini keys must never be served to the browser.
- **HIPAA/GDPR Compliance:** Informational-only, client-centric data storage.

### Accessibility
- **WCAG Level:** AA compliance. Contrast ratios must be at least 4.5:1.
- **Interactive Targets:** Click areas must be at least 44x44px for responsive mobile use.

### Responsiveness & Design Density
- **Fluid Layouts:** Clean display on screens ranging from 320px (mobile) to 1920px (large displays).
- **Visual Themes:** Premium high-contrast dark palette with clear, readable typography.
    `
  },
  {
    id: "11",
    title: "11. Database Design",
    icon: "Database",
    category: "Technical Design",
    content: `
### Relational Database Schema Design (PostgreSQL / Firestore-Ready)

#### \`users\` Table
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | VARCHAR(36) | PRIMARY KEY | Unique identifier (UUID). |
| **email** | VARCHAR(255) | UNIQUE, NOT NULL | User's email address. |
| **created_at** | TIMESTAMP | DEFAULT NOW() | Record registration date. |

#### \`bmi_records\` Table
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | VARCHAR(36) | PRIMARY KEY | Unique record ID. |
| **user_id** | VARCHAR(36) | FOREIGN KEY | References users(id). |
| **date** | DATE | NOT NULL | Logging timestamp. |
| **weight** | DECIMAL(5,2) | NOT NULL | Body weight in kg. |
| **bmi** | DECIMAL(4,1) | NOT NULL | Calculated BMI index. |
| **calories** | INT | NOT NULL | Caloric consumption logged. |

#### \`diet_plans\` Table
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | VARCHAR(36) | PRIMARY KEY | Unique plan ID. |
| **bmi_record_id** | VARCHAR(36) | FOREIGN KEY | References bmi_records(id). |
| **meals_json** | TEXT / JSONB | NOT NULL | Structured breakfast, lunch, dinner details. |
| **grocery_list** | TEXT[] | NOT NULL | Array of required shopping ingredients. |
    `
  },
  {
    id: "12",
    title: "12. API Documentation",
    icon: "Code",
    category: "Technical Design",
    content: `
### REST API Specification (Express Backend)

#### 1. Biometric Health Assessment
- **Endpoint:** \`POST /api/analyze-bmi\`
- **Request Body:**
  \`\`\`json
  {
    "weight": 78,
    "height": 178,
    "age": 32,
    "gender": "male",
    "activityLevel": "moderate",
    "goal": "weight_loss",
    "dietPreference": "vegetarian",
    "conditions": "hypertension"
  }
  \`\`\`
- **Response Format (200 OK):**
  \`\`\`json
  {
    "success": true,
    "bmi": 24.6,
    "bmr": 1720,
    "tdee": 2666,
    "bmiCategory": "Healthy weight",
    "riskLevel": "Low",
    "idealWeightRange": { "min": 58.6, "max": 78.9, "target": 68 },
    "bodyFatEstimate": 18.2,
    "leanMassEstimate": 63.8,
    "healthRisks": ["Minor sodium sensitivity risks"],
    "macronutrients": {
      "calories": 2166,
      "protein": { "grams": 135, "percentage": 25 },
      "carbs": { "grams": 243, "percentage": 45 },
      "fat": { "grams": 72, "percentage": 30 }
    }
  }
  \`\`\`
    `
  },
  {
    id: "13",
    title: "13. System Architecture",
    icon: "Cpu",
    category: "Technical Design",
    content: `
### Core Data Flow & Architecture

1. **Client Interface:** Built with React 19, Tailwind CSS, Lucide icons, and Recharts. All biometric inputs are validated before sending.
2. **Server Middleman (Express Node.js):** Proxies client requests, validates telemetry data, and initializes the secure Google GenAI SDK.
3. **AI Core (Gemini AI Models):** Models process custom prompts and return strictly structured JSON.
4. **Environment Controls:** App configurations and keys are managed server-side, preventing API exposure in the browser.

\`\`\`
+--------------------+            +--------------------+            +-------------------+
|   React Client     |  Request   |  Express Backend   |  REST API  |  Google Gemini    |
|   (UI Dashboard)   | ---------> |  (Vite Middleware) | ---------> |  (Model Engine)   |
|                    | <--------- |                    | <--------- |                   |
|   - Recharts Graph |  Response  |  - Port 3000       |  Secured   |  - JSON Schema    |
+--------------------+            +--------------------+            +-------------------+
\`\`\`
    `
  },
  {
    id: "14",
    title: "14. Technology Stack",
    icon: "Layers",
    category: "Technical Design",
    content: `
### Chosen Technology Stack

- **Frontend Framework:** React 19 with Vite 6. This provides near-instant boot times and a clean component architecture.
- **Styling Core:** Tailwind CSS 4. Offers an efficient utility-first design system with native CSS variables.
- **Backend Environment:** Express v4 with Node.js. Handles server-side API endpoints and acts as Vite development middleware.
- **TypeScript (TSX):** Complete type-safe integration for both client views and backend API routes.
- **Interactive Visualizers:** Recharts for responsive progress tracking graphs.
- **AI Integration:** Official \`@google/genai\` SDK. Connects securely to the fast and accurate \`gemini-3.5-flash\` model.
    `
  },
  {
    id: "15",
    title: "15. UI/UX Design Specification",
    icon: "Palette",
    category: "Product & UX",
    content: `
### System Theme & Guidelines

- **Theme Palette:** Premium high-contrast dark theme.
  - Background Canvas: Rich Charcoal Slate (\`#0b0f19\`)
  - Component Cards: Deep Navy Gray (\`#1e293b\`)
  - Accent Green: Emerald Mint (\`#10b981\`) - represents health and vitality
  - Text Primary: Cool White (\`#f8fafc\`)
  - Text Secondary: Muted Lavender Grey (\`#94a3b8\`)

- **Typography & Font Strategy:**
  - Primary font: **Inter** for exceptional readability of dense nutritional tables and calculations.
  - Accent indicators: **JetBrains Mono** for numerical scores, BMR, TDEE, and code displays.

- **Layout Grid:**
  - 12-column flex system with unified spacing.
  - Touch targets for mobile screens are scaled to at least 44px.
    `
  },
  {
    id: "16",
    title: "16. Landing Page Wireframe",
    icon: "Home",
    category: "Product & UX",
    content: `
### Landing Page Layout Specification

- **Hero Banner:** Displays a bold, medical-grade call-to-action: *"Intelligent Health Assessment Engine"*. Includes secondary descriptions highlighting the server-side calculations.
- **Interactive Telemetry Panel:** Directly integrates the calculator, allowing users to input metrics and get results without navigating away.
- **Formulas Showcase:** Clean cards outlining the mathematical equations used:
  - **Quetelet's BMI Formula:** $kg / m^2$
  - **Mifflin-St Jeor Equation:** Metric basal metabolic rate.
- **Testimonials Slider:** Fictional quotes from doctors, nutritionists, and everyday users.
- **FAQ Section:** Direct collapsible questions clarifying variables and sleep hygiene targets.
    `
  },
  {
    id: "17",
    title: "17. BMI Calculator Wireframe",
    icon: "Sliders",
    category: "Product & UX",
    content: `
### Calculator Interface Mechanics

- **Interactive Metric/Imperial Inputs:** Users can quickly slide weight and height bars with real-time numeric readouts.
- **Instant Client-Side Calculations:** Shows BMI results, ideal weight targets, and basal metabolic output.
- **Aesthetic Gauge Chart:**
  - Standard dial representing the BMI categories:
    - Blue (< 18.5) Underweight
    - Green (18.5 - 24.9) Healthy Weight
    - Yellow (25.0 - 29.9) Overweight
    - Red (>= 30) Obese
  - Visual pointer slides dynamically as user changes weight or height inputs.
    `
  },
  {
    id: "18",
    title: "18. AI Health Report Details",
    icon: "FileText",
    category: "AI & Features",
    content: `
### Generated Diagnostics Modules

- **Biometric Gauge Summary:** Highlights calculations for BMI, BMR, and TDEE.
- **Clinical Assessment Card:** Shows the BMI category and a personalized metabolic risk rating (Low, Moderate, High).
- **Ideal Metric Targets:** Recommends target weight ranges and calculated timelines for safe change.
- **Lifestyle Overview:** Renders water hydration checklists and age-based sleep hygiene suggestions.
- **Clinical Insights:** A bulleted list of high-impact medical and physical recommendations.
    `
  },
  {
    id: "19",
    title: "19. Diet Generator Details",
    icon: "Coffee",
    category: "AI & Features",
    content: `
### Culinary Recommendation Engine

- **Preferences Supported:** Vegetarian, vegan, ketogenic, low carb, paleo, and balanced.
- **Target Calories:** Dynamically adjusted according to BMR, activity level, and goals.
- **Daily Culinary Schedule:**
  - **Breakfast:** High-quality protein and complex carbohydrates.
  - **Snacks (Morning/Afternoon):** Healthy fats and hydration.
  - **Lunch:** Balanced lean protein and greens.
  - **Dinner:** Low glycemic index nutrition for better sleep.
  - **Bedtime (Optional):** Light protein for muscle recovery.
- **Categorized Grocery Checklist:** Divided into produce, proteins, pantry staples, and healthy oils.
    `
  },
  {
    id: "20",
    title: "20. Exercise Generator Details",
    icon: "Dumbbell",
    category: "AI & Features",
    content: `
### Athletic Routine Engine

- **Routine Levels:** Beginner, Intermediate, Advanced.
- **Weekly Schedule (Days 1 to 7):** Custom-tailored workouts containing sets, reps, duration, and descriptions.
- **Safety Alerts:** Specific cautions based on user-entered health conditions.
- **Progressive Overload Rules:** Actionable strategies to safely increase intensity over time.
    `
  },
  {
    id: "21",
    title: "21. Progress Dashboard Details",
    icon: "LineChart",
    category: "Product & UX",
    content: `
### Health Logging Module

- **User Metric Logger:** Form allowing users to enter dates, weights, and daily calories.
- **Interactive Tracking Graph:** Responsive, high-contrast line chart showing weight fluctuations and caloric targets over time.
- **Biometric Logs Table:** Lists historical logs, with edit and delete options.
- **Milestone Indicators:** Congratulatory status badges for hitting healthy milestones.
    `
  },
  {
    id: "22",
    title: "22. Admin Dashboard",
    icon: "Settings2",
    category: "Marketing & Security",
    content: `
### System Operations Terminal

- **Platform Telemetry Monitors:**
  - Active chart showing server resource logs (Simulated Node.js memory, CPU, and network traffic).
  - API performance tracking (Simulated response latency in milliseconds).
- **Core Parameters Control:** Dynamic sliders to adjust medical constants (like the underweight and overweight limits).
- **Database Schema Viewer:** Visual interactive display of PostgreSQL database layouts.
    `
  },
  {
    id: "23",
    title: "23. SEO Strategy",
    icon: "Globe",
    category: "Marketing & Security",
    content: `
### Search Engine Optimization Plan

- **High-Intent Keywords:** Target key phrases like *"AI health assessment portal"*, *"scientific BMI meal builder"*, and *"custom calorie fitness planner"*.
- **Structured Schema Markup:**
  - MedicalWebPage schema markup.
  - Collapsible FAQ schema directly visible on Google search pages.
- **Technical Checklists:**
  - High performance score (>95) on Google Lighthouse.
  - Next-gen image formats and static metadata configurations.
    `
  },
  {
    id: "24",
    title: "24. Security Architecture",
    icon: "Lock",
    category: "Marketing & Security",
    content: `
### Security Implementation Guide

- **Server-Side API Keys:** The proprietary Google Gemini API key is accessed strictly through \`process.env.GEMINI_API_KEY\` on the server.
- **Data Validation:** Strict JSON schema validation for all incoming POST bodies prevents injection attacks.
- **Rate Limiting:** Protects endpoints with rate-limiting middleware to prevent denial-of-service attempts.
- **Regulatory Compliance:** Adheres to GDPR rules by processing biometric data directly in the active session without storing sensitive user details in cookies.
    `
  },
  {
    id: "25",
    title: "25. Testing Strategy",
    icon: "ShieldCheck",
    category: "Project Lifecycle",
    content: `
### Verification Framework

- **Unit Testing:** Focuses on verifying key calculations, including the Mifflin-St Jeor BMR formulas.
- **Integration Testing:** Tests endpoint routing, API payloads, and error handling.
- **Accessibility Testing:** Automated and manual color contrast evaluations.
- **User Acceptance (UAT):** Real-world testing with different user personas to ensure the UI is intuitive and easy to use.
    `
  },
  {
    id: "26",
    title: "26. Deployment Strategy",
    icon: "Server",
    category: "Project Lifecycle",
    content: `
### CI/CD Deployment Process

- **Vercel & Cloud Run Deployments:** Configured as a unified Node container.
- **Production Builds:**
  - Frontend compiled and optimized using Vite.
  - Server-side TypeScript bundled into a single file with \`esbuild\`.
- **System Backup Protocols:** Automatically schedules nightly backups of database records.
- **Rollback System:** One-click rollback configurations in case of critical production bugs.
    `
  },
  {
    id: "27",
    title: "27. Product Roadmap",
    icon: "Milestone",
    category: "Project Lifecycle",
    content: `
### Project Roadmap Milestones

- **Phase 1: MVP Core (Current):**
  - High-fidelity real-time BMI calculations.
  - Server-side Gemini API health, diet, and exercise reports.
  - Fully interactive sitemap, telemetry charts, and mock admin terminals.
- **Phase 2: Wearable Integrations:**
  - Automated syncing with Fitbit, Apple Health, and Google Fit.
  - Weekly progress emails.
- **Phase 3: Conversational Coaching:**
  - 24/7 AI-driven chatbot health coach.
  - Photo-based meal and recipe scanner.
    `
  },
  {
    id: "28",
    title: "28. KPIs & Success Metrics",
    icon: "PieChart",
    category: "Marketing & Security",
    content: `
### Performance Indicators

- **Active User Retention:** Monthly active return rates (>40%).
- **Diagnostics Success Rate:** Ratio of completed reports to overall visits.
- **Nutritional Adherence:** Frequency of shopping checklist completions.
- **Customer Satisfaction (CSAT):** Goal is an overall rating of 4.8 out of 5 stars.
- **Net Promoter Score (NPS):** Targeting a score of +70.
    `
  },
  {
    id: "29",
    title: "29. Future Enhancements",
    icon: "Sparkles",
    category: "AI & Features",
    content: `
### Anticipated Upgrades

- **Meal Image Recognition:** Uses vision models to calculate plate macronutrients from a photo.
- **Barcode Food Scanner:** Integrates item scanning to easily log food items.
- **Telemedicine Integration:** Connects users directly with licensed nutritionists and doctors.
- **Gamified Rewards:** Offers achievement badges for hitting hydration and sleep consistency goals.
    `
  },
  {
    id: "30",
    title: "30. Appendices & Formulas",
    icon: "BookOpen",
    category: "Technical Design",
    content: `
### Mathematical Equations Reference

#### Quetelet's Body Mass Index (BMI) Formula:
$$\\text{BMI} = \\frac{\\text{Weight (kg)}}{\\text{Height (m)}^2}$$

#### Basal Metabolic Rate (BMR) - Mifflin-St Jeor:
- **Male:**
  $$\\text{BMR} = 10 \\times \\text{Weight (kg)} + 6.25 \\times \\text{Height (cm)} - 5 \\times \\text{Age (years)} + 5$$
- **Female:**
  $$\\text{BMR} = 10 \\times \\text{Weight (kg)} + 6.25 \\times \\text{Height (cm)} - 5 \\times \\text{Age (years)} - 161$$

#### Total Daily Energy Expenditure (TDEE):
$$\\text{TDEE} = \\text{BMR} \\times \\text{Physical Activity Factor}$$

#### Activity Factors:
- Sedentary: 1.2
- Light: 1.375
- Moderate: 1.55
- Active: 1.725
- Very Active: 1.9
    `
  }
];
