export interface UserProfile {
  weight: number; // in kg
  height: number; // in cm
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'maintenance' | 'weight_gain' | 'muscle_gain';
  dietPreference: 'anything' | 'vegetarian' | 'vegan' | 'keto' | 'low_carb' | 'paleo';
  conditions: string;
}

export interface IdealWeightRange {
  min: number;
  max: number;
  target: number;
}

export interface MacroDetail {
  grams: number;
  percentage: number;
}

export interface Macronutrients {
  calories: number;
  protein: MacroDetail;
  carbs: MacroDetail;
  fat: MacroDetail;
}

export interface WaterIntake {
  liters: number;
  cups: number;
  tips: string[];
}

export interface SleepAdvice {
  hours: string;
  hygiene: string[];
}

export interface HealthReport {
  bmi: number;
  bmr: number;
  tdee: number;
  bmiCategory: string;
  riskLevel: string;
  idealWeightRange: IdealWeightRange;
  bodyFatEstimate: number;
  leanMassEstimate: number;
  healthRisks: string[];
  timelineEstimate: string;
  macronutrients: Macronutrients;
  waterIntake: WaterIntake;
  sleepAdvice: SleepAdvice;
  keyRecommendations: string[];
}

export interface MealDetail {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

export interface DietPlan {
  meals: {
    breakfast: MealDetail;
    morningSnack?: MealDetail;
    lunch: MealDetail;
    eveningSnack?: MealDetail;
    dinner: MealDetail;
    bedtimeSnack?: MealDetail;
  };
  dietaryTips: string[];
  groceryList: string[];
}

export interface WorkoutExercise {
  name: string;
  duration: string;
  setsReps: string;
  intensity: string;
  description: string;
}

export interface DayRoutine {
  day: string;
  title: string;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  routine: DayRoutine[];
  safetyPrecautions: string[];
  progressionTips: string[];
}

export interface PdrSection {
  id: string;
  title: string;
  icon: string;
  category: 'Strategic' | 'Product & UX' | 'Technical Design' | 'AI & Features' | 'Marketing & Security' | 'Project Lifecycle';
  content: string;
}

export interface BmiRecord {
  id: string;
  date: string;
  weight: number;
  bmi: number;
  calories: number;
}
