const keywordMap = {
  garbage: "Sanitation",
  waste: "Sanitation",
  drainage: "Sanitation",

  fire: "Emergency Services",
  accident: "Emergency Services",

  road: "Infrastructure",
  pothole: "Infrastructure",
  street: "Infrastructure",

  electricity: "Electricity",
  power: "Electricity",
  transformer: "Electricity",

  water: "Water",
  leakage: "Water",
  supply: "Water",

  hospital: "Health",
  ambulance: "Health",
};

// 🔹 Extract Keywords
function extractKeywords(text) {
  if (!text) return [];

  const words = text.toLowerCase().split(/\s+/);
  const foundKeywords = [];

  for (let word of words) {
    word = word.replace(/[^\w]/g, "");

    if (keywordMap[word]) {
      foundKeywords.push(word);
    }
  }

  return [...new Set(foundKeywords)];
}

// 🔹 Detect Context
function detectContext(keywords) {
  if (!keywords || keywords.length === 0) return "General";
  return keywordMap[keywords[0]];
}

// 🔹 Calculate Urgency (🔥 IMPROVED)
function calculateUrgency(text, keywords, emotion, confidence = 1) {
  let score = 0;

  if (!text) text = "";
  text = text.toLowerCase();

  // 🛑 Prevent garbage input
  if (text.length < 5) return 1;

  // =========================
  // 🔴 TEXT INTENSITY (0–4)
  // =========================
  let textScore = 0;

  if (text.includes("urgent") || text.includes("immediately")) textScore += 2;
  if (text.includes("danger") || text.includes("accident")) textScore += 2;
  if (text.includes("help") || text.includes("serious")) textScore += 1;

  textScore = Math.min(textScore, 4);

  // =========================
  // 🔑 KEYWORD SEVERITY (0–3)
  // =========================
  let keywordScore = 0;

  if (keywords.includes("pothole")) keywordScore += 2;
  if (keywords.includes("garbage")) keywordScore += 1;
  if (keywords.includes("electricity")) keywordScore += 2;
  if (keywords.includes("water")) keywordScore += 1;

  keywordScore = Math.min(keywordScore, 3);

  // =========================
  // 🔥 EMOTION INTENSITY (0–3)
  // =========================
  let emotionScore = 0;

  switch (emotion) {
    case "fearful":
      emotionScore = 3;
      break;
    case "angry":
      emotionScore = 2.5;
      break;
    case "disgust":
      emotionScore = 2;
      break;
    case "sad":
      emotionScore = 1.5;
      break;
    case "surprised":
      emotionScore = 1;
      break;
    case "happy":
    case "calm":
    case "neutral":
      emotionScore = 0;
      break;
    default:
      emotionScore = 0;
  }

  // 🔥 Apply confidence weighting
  emotionScore = emotionScore * confidence;

  // =========================
  // 🚨 CONTEXT / DOMAIN WEIGHT
  // =========================
  let contextScore = 0;

  if (keywords.includes("fire") || keywords.includes("accident")) {
    contextScore = 3;
  } else if (keywords.includes("electricity")) {
    contextScore = 2;
  } else if (keywords.includes("water")) {
    contextScore = 1;
  }

  // =========================
  // 🚨 EMERGENCY BOOST
  // =========================
  let emergencyBoost = 0;

  if (keywords.includes("fire") || keywords.includes("accident")) {
    emergencyBoost = 2; // extra push toward critical
  }

  // =========================
  // ⚖️ FINAL SCORE
  // =========================
  score =
    textScore +
    keywordScore +
    emotionScore +
    contextScore +
    emergencyBoost;

  score = Math.min(Math.round(score), 10);

  return score;
}

// 🔹 Priority Mapping
function getPriority(score) {
  if (score >= 9) return "Critical";
  if (score >= 7) return "High";
  if (score >= 4) return "Medium";
  return "Low";
}

// 🔹 Department Mapping
function assignDepartment(context) {
  const departmentMap = {
    Sanitation: "Municipal Department",
    Infrastructure: "Public Works Department",
    Electricity: "Electricity Board",
    Water: "Water Supply Department",
    Health: "Health Department",
    "Emergency Services": "Emergency Response Unit",
    General: "General Administration",
  };

  return departmentMap[context] || "General Administration";
}

// ✅ EXPORT
export {
  extractKeywords,
  detectContext,
  calculateUrgency,
  getPriority,
  assignDepartment,
};