import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

export async function generateShortTips(profile) {
    const { name, gender, age, mainGoal, specificGoal } = profile;

    const prompt = `ROLE:
You are a certified wellness and fitness coach with expertise in nutrition, sleep science, mental wellness, and exercise.

TASK:
Generate exactly 5 personalized wellness tips based on the user profile and goals. Each tip should be short, motivational, and actionable.

CONTEXT:
User Profile:
- Name: ${name}
- Gender: ${gender}
- Age: ${age}
- Main Goal: ${mainGoal}
- Specific Focus : ${specificGoal}

Make sure the tips are relevant for the user's age category , user's gender and their selected goal.

REASONING:
First analyze the user's goal and age. Then map the goal to proper wellness categories (nutrition, lifestyle, sleep, fitness, mental wellness). Ensure variety: the 5 tips must not be repetitive.

RULES:
- Do NOT provide medical advice or guaranteed results.
- Do NOT mention exact timelines like "in 10 days".
- You MAY give safe estimations like "most people notice changes in 2–4 weeks".
- Tips must be safe, general, and easy to follow .
- No extreme diets, dangerous exercises, or unrealistic promises.
- All tips must be related to the chosen goal.
- The "icon" must be EXACTLY ONE REAL emoji (e.g., 💡, 🧘‍♀️, 🥗, 🏃‍♂️).
- NEVER return words, labels, or placeholders like child_friendly, running, yoga_pose instead of icon.
- If unsure which icon to choose, use the fallback icon 💡.

STOP CONDITION:
Stop after generating exactly 5 tips.

OUTPUT FORMAT:
Return strictly in the following JSON format:

{
  "tips": [
    {
      "title": "",
      "icon": "",
      "short_description": ""
    }
  ]
}

Make sure there are exactly 5 objects in the array.

IMPORTANT: Output ONLY valid JSON. No explanations, no text outside the JSON.

`;

    try {
        const result = await model.generateContent(prompt);
        let response = result.response.text();

        response = response
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .replace(/\*\*(.*?)\*\*/g, "$1")        // remove **bold**
            .replace(/\*(.*?)\*/g, "$1")            // remove *italic*
            .replace(/_{1,3}(.*?)_{1,3}/g, "$1")    // remove _italic_ or __bold__
            .replace(/`{1,3}(.*?)`{1,3}/g, "$1")    // remove inline code
            .replace(/#{1,6}\s?/g, "")              // remove markdown headings
            .trim();


        const data = JSON.parse(response);
        // console.log("Generated Tips:", data);
        return data.tips; // return array of 5 tips
    } catch (err) {
        console.error("Short Tips Generation Error:", err);
        throw new Error("Failed to generate tips.");
    }
}

export async function generateDetailedTip(tipTitle, profile) {
    const { name, gender, age, mainGoal, specificGoal } = profile;

    const prompt = `ROLE:
You are a professional health and wellness coach specializing in practical, safe guidance.

TASK:
Expand the selected wellness tip into a detailed explanation and step-by-step actionable plan that a beginner can follow.

CONTEXT:
Selected Tip Title: ${tipTitle}
User Profile:
- Name: ${name}
- Gender: ${gender}
- Age: ${age}
- Main Goal: ${mainGoal}
- Specific Focus: ${specificGoal}

REASONING:
Explain the science or logic behind the tip in simple language.
Then give a step-by-step actionable plan the user can follow daily or weekly.
Finally, explain what improvements they *may* notice with consistent practice.

RULES:
- DO NOT guarantee results.
- DO NOT mention exact timelines or specific promises.
- You MAY say: “you may notice improvements within a few weeks depending on consistency.”
- No medical claims, no dangerous advice.
- Keep the tone positive, supportive, and simple.

STOP CONDITION:
Stop after completing the step-by-step plan and progress expectations.

OUTPUT FORMAT:
Return strictly in this JSON format:

{
  "long_explanation": "",
  "steps": [
    "",
    "",
    ""
  ],
  "expected_progress": ""
}
IMPORTANT:
Respond ONLY with valid JSON. 
Do not add any commentary, markdown, or text outside the JSON.

`;

    try {
        const result = await model.generateContent(prompt);
        let response = result.response.text();

        response = response
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .replace(/\*\*(.*?)\*\*/g, "$1")        // remove **bold**
            .replace(/\*(.*?)\*/g, "$1")            // remove *italic*
            .replace(/_{1,3}(.*?)_{1,3}/g, "$1")    // remove _italic_ or __bold__
            .replace(/`{1,3}(.*?)`{1,3}/g, "$1")    // remove inline code
            .replace(/#{1,6}\s?/g, "")              // remove markdown headings
            .trim();

        const data = JSON.parse(response);
        return data;
    } catch (err) {
        console.error("Detailed Tip Generation Error:", err);
        throw new Error("Failed to generate detailed tip.");
    }
}
