import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const MODEL_NAME = "gemini-3.5-flash";

// 1. BMI Health Assessment endpoint
app.post("/api/analyze-bmi", async (req, res) => {
  try {
    const {
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
      dietPreference,
      conditions,
    } = req.body;

    if (!weight || !height || !age) {
      return res.status(400).json({ error: "Weight, height, and age are required." });
    }

    const heightInMeters = height / 100;
    const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));

    // BMR formula (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === "male") {
      bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else if (gender === "female") {
      bmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    } else {
      bmr = Math.round(10 * weight + 6.25 * height - 5 * age - 80); // Average multiplier
    }

    // TDEE multipliers
    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    const tdee = Math.round(bmr * (multipliers[activityLevel] || 1.2));

    const prompt = `
      Perform a highly personalized evidence-based clinical and wellness health report based on the following user metrics:
      - Weight: ${weight} kg
      - Height: ${height} cm
      - Age: ${age} years old
      - Gender: ${gender}
      - Calculated BMI: ${bmi}
      - Calculated BMR: ${bmr} kcal/day
      - Calculated TDEE: ${tdee} kcal/day
      - Activity Level: ${activityLevel}
      - Goal: ${goal} (e.g. weight loss, muscle gain, maintenance)
      - Diet Preference: ${dietPreference}
      - Medical or Health Conditions: ${conditions || "None"}

      Provide a detailed assessment including:
      1. Health Category and Risk Level assessment (e.g. Normal, Overweight, Underweight).
      2. Body analysis (estimation of body fat percentage based on US Navy method variables or clinical regressions, lean body mass estimation).
      3. Precise health risks (cardiovascular, metabolic, etc.) related to this BMI and lifestyle.
      4. Targeted healthy weight range (for BMI 18.5 - 24.9) and estimated timeline to reach it if applicable.
      5. Calorie needs breakdown and structured macronutrient suggestions (Protein, Carbs, Fat) in grams and percentages of total energy.
      6. Daily water intake requirement in liters, cups, and specific hydration tactics.
      7. Sleep advice based on age, lifestyle, and goals, with actionable sleep hygiene points.
      8. A list of 4 key high-impact lifestyle recommendations.

      Return the response strictly as a JSON object matching this schema:
      {
        "bmiCategory": "string (e.g., Underweight, Healthy weight, Overweight, Obese)",
        "riskLevel": "string (e.g., Low, Moderate, Elevated, High)",
        "idealWeightRange": {
          "min": "number (kg)",
          "max": "number (kg)",
          "target": "number (kg)"
        },
        "bodyFatEstimate": "number (percentage, e.g. 21.5)",
        "leanMassEstimate": "number (kg, e.g. 58.2)",
        "healthRisks": ["string"],
        "timelineEstimate": "string (e.g., 'Targeting 0.5kg/week, you could reach your ideal weight in 12-16 weeks.')",
        "macronutrients": {
          "calories": "number (recommended daily calorie intake for goal)",
          "protein": { "grams": "number", "percentage": "number" },
          "carbs": { "grams": "number", "percentage": "number" },
          "fat": { "grams": "number", "percentage": "number" }
        },
        "waterIntake": {
          "liters": "number",
          "cups": "number",
          "tips": ["string"]
        },
        "sleepAdvice": {
          "hours": "string (e.g., '7-8 hours')",
          "hygiene": ["string"]
        },
        "keyRecommendations": ["string"]
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bmiCategory: { type: Type.STRING },
            riskLevel: { type: Type.STRING },
            idealWeightRange: {
              type: Type.OBJECT,
              properties: {
                min: { type: Type.NUMBER },
                max: { type: Type.NUMBER },
                target: { type: Type.NUMBER },
              },
              required: ["min", "max", "target"],
            },
            bodyFatEstimate: { type: Type.NUMBER },
            leanMassEstimate: { type: Type.NUMBER },
            healthRisks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            timelineEstimate: { type: Type.STRING },
            macronutrients: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.NUMBER },
                protein: {
                  type: Type.OBJECT,
                  properties: {
                    grams: { type: Type.NUMBER },
                    percentage: { type: Type.NUMBER },
                  },
                },
                carbs: {
                  type: Type.OBJECT,
                  properties: {
                    grams: { type: Type.NUMBER },
                    percentage: { type: Type.NUMBER },
                  },
                },
                fat: {
                  type: Type.OBJECT,
                  properties: {
                    grams: { type: Type.NUMBER },
                    percentage: { type: Type.NUMBER },
                  },
                },
              },
              required: ["calories", "protein", "carbs", "fat"],
            },
            waterIntake: {
              type: Type.OBJECT,
              properties: {
                liters: { type: Type.NUMBER },
                cups: { type: Type.NUMBER },
                tips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["liters", "cups", "tips"],
            },
            sleepAdvice: {
              type: Type.OBJECT,
              properties: {
                hours: { type: Type.STRING },
                hygiene: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["hours", "hygiene"],
            },
            keyRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            "bmiCategory",
            "riskLevel",
            "idealWeightRange",
            "bodyFatEstimate",
            "leanMassEstimate",
            "healthRisks",
            "timelineEstimate",
            "macronutrients",
            "waterIntake",
            "sleepAdvice",
            "keyRecommendations",
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json({
      success: true,
      bmi,
      bmr,
      tdee,
      ...parsedData,
    });
  } catch (error: any) {
    console.error("Error analyzing BMI:", error);
    res.status(500).json({ error: error.message || "Failed to analyze health assessment." });
  }
});

// 2. Meal Plan / Diet Generator endpoint
app.post("/api/generate-diet", async (req, res) => {
  try {
    const {
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
      dietPreference,
      conditions,
      targetCalories,
    } = req.body;

    const calories = targetCalories || 2000;

    const prompt = `
      Create a fully personalized daily meal plan for a user with these parameters:
      - Weight: ${weight} kg, Height: ${height} cm, Age: ${age}, Gender: ${gender}
      - Activity: ${activityLevel}, Goal: ${goal}
      - Dietary Preference: ${dietPreference}
      - Health Conditions: ${conditions || "None"}
      - Daily Energy Target: ${calories} kcal

      Provide exact, appetizing meal options for each time of day with portion sizes and macronutrients.
      Include meals for:
      1. Breakfast
      2. Morning Snack
      3. Lunch
      4. Evening Snack
      5. Dinner
      6. Bedtime (Optional/Light)

      Also provide dietary tips specific to their preferences and a grocery list.

      Return the response strictly as a JSON object matching this schema:
      {
        "meals": {
          "breakfast": { "name": "string", "calories": "number", "protein": "number", "carbs": "number", "fat": "number", "description": "string" },
          "morningSnack": { "name": "string", "calories": "number", "protein": "number", "carbs": "number", "fat": "number", "description": "string" },
          "lunch": { "name": "string", "calories": "number", "protein": "number", "carbs": "number", "fat": "number", "description": "string" },
          "eveningSnack": { "name": "string", "calories": "number", "protein": "number", "carbs": "number", "fat": "number", "description": "string" },
          "dinner": { "name": "string", "calories": "number", "protein": "number", "carbs": "number", "fat": "number", "description": "string" },
          "bedtimeSnack": { "name": "string", "calories": "number", "protein": "number", "carbs": "number", "fat": "number", "description": "string" }
        },
        "dietaryTips": ["string"],
        "groceryList": ["string"]
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meals: {
              type: Type.OBJECT,
              properties: {
                breakfast: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.NUMBER },
                    carbs: { type: Type.NUMBER },
                    fat: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                  },
                  required: ["name", "calories", "protein", "carbs", "fat", "description"],
                },
                morningSnack: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.NUMBER },
                    carbs: { type: Type.NUMBER },
                    fat: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                  },
                  required: ["name", "calories", "protein", "carbs", "fat", "description"],
                },
                lunch: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.NUMBER },
                    carbs: { type: Type.NUMBER },
                    fat: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                  },
                  required: ["name", "calories", "protein", "carbs", "fat", "description"],
                },
                eveningSnack: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.NUMBER },
                    carbs: { type: Type.NUMBER },
                    fat: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                  },
                  required: ["name", "calories", "protein", "carbs", "fat", "description"],
                },
                dinner: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.NUMBER },
                    carbs: { type: Type.NUMBER },
                    fat: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                  },
                  required: ["name", "calories", "protein", "carbs", "fat", "description"],
                },
                bedtimeSnack: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.NUMBER },
                    carbs: { type: Type.NUMBER },
                    fat: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                  },
                  required: ["name", "calories", "protein", "carbs", "fat", "description"],
                },
              },
              required: ["breakfast", "morningSnack", "lunch", "eveningSnack", "dinner"],
            },
            dietaryTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            groceryList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["meals", "dietaryTips", "groceryList"],
        },
      },
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json({ success: true, ...parsedData });
  } catch (error: any) {
    console.error("Error generating diet:", error);
    res.status(500).json({ error: error.message || "Failed to generate diet plan." });
  }
});

// 3. Workout Plan Generator endpoint
app.post("/api/generate-workout", async (req, res) => {
  try {
    const {
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
      conditions,
    } = req.body;

    const prompt = `
      Design an evidence-based exercise and workout program suited for the following user profile:
      - Weight: ${weight} kg, Height: ${height} cm, Age: ${age}, Gender: ${gender}
      - Activity: ${activityLevel}, Goal: ${goal}
      - Existing health conditions: ${conditions || "None"}

      Produce a structured plan including:
      1. A 7-day schedule (routine names for each day, e.g. 'Push Day', 'Rest Day', 'HIIT Cardio', etc., with a list of exercises).
      2. Safety precautions specific to their conditions, BMI, and goals.
      3. Guidelines for progression (how to increase intensity).

      Each day in the routine list must contain:
      - dayName (e.g. Day 1: Strength, Day 2: Rest, etc.)
      - focus (e.g. Upper Body, Cardiovascular Endurance, Recovery)
      - exercises: array of exercise objects, each containing:
        - name (string)
        - duration (string, e.g. '30 mins' or 'N/A')
        - setsReps (string, e.g. '3 sets x 10 reps' or 'N/A')
        - intensity (string, e.g. 'Low', 'Moderate', 'High')
        - description (string)

      Return the response strictly as a JSON object matching this schema:
      {
        "routine": [
          {
            "day": "string (e.g., 'Day 1')",
            "title": "string (e.g., 'Lower Body Resistance')",
            "focus": "string",
            "exercises": [
              { "name": "string", "duration": "string", "setsReps": "string", "intensity": "string", "description": "string" }
            ]
          }
        ],
        "safetyPrecautions": ["string"],
        "progressionTips": ["string"]
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            routine: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  title: { type: Type.STRING },
                  focus: { type: Type.STRING },
                  exercises: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        setsReps: { type: Type.STRING },
                        intensity: { type: Type.STRING },
                        description: { type: Type.STRING },
                      },
                      required: ["name", "duration", "setsReps", "intensity", "description"],
                    },
                  },
                },
                required: ["day", "title", "focus", "exercises"],
              },
            },
            safetyPrecautions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            progressionTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["routine", "safetyPrecautions", "progressionTips"],
        },
      },
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json({ success: true, ...parsedData });
  } catch (error: any) {
    console.error("Error generating workout:", error);
    res.status(500).json({ error: error.message || "Failed to generate exercise plan." });
  }
});

// Setup Vite development server or serve static build
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
