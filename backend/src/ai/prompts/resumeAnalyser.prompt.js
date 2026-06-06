import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
import { jsonrepair } from "jsonrepair";
dotenv.config();


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const resumeAnalyserSchema = z.object({
    role: z.string().describe("The desired role of the candidate"),
    overallScore: z.number().describe("Overall score of the resume based on various factors").min(0).max(100),
    technicalScore: z.number().describe("Score for technical skills").min(0).max(100),

    projectScore: z.number().describe("Score for project experience").min(0).max(100),

    atsScore: z.number().describe("Score for ATS (Applicant Tracking System) compatibility").min(0).max(100),

    hiringRecommendation: z.enum([
        "Strong Reject",
        "Reject",
        "Consider",
        "Interview",
        "Strong Interview"
    ]).describe("Overall hiring recommendation based on the resume analysis"),

    strengths: z.array(
        z.string().describe("List of strengths identified in the resume")
    ).describe("Strengths of the candidate"),
    
    weaknesses: z.array(
        z.string().describe("List of weaknesses identified in the resume")
    ).describe("Weaknesses of the candidate"),

    recommendations: z.array(
        z.string().describe("List of suggestions for improving the resume")
    ).describe("Suggestions for improvement"),

    missingSkills: z.array(
        z.string().describe("List of relevant skills missing from the resume")
    ).describe("Missing skills that could enhance the resume"),
    matchedSkills: z.array(
        z.string().describe("List of relevant skills that are present in the resume")
    ).describe("Matched skills that are relevant to the desired role"),
    technicalReasonForScore: z.string().describe("Explanation for the technical skills score"),
    projectReasonForScore: z.string().describe("Explanation for the project experience score"),
    atsReasonForScore: z.string().describe("Explanation for the ATS compatibility score"),
    reasonForHiringRecommendation: z.string().describe("Explanation for the overall hiring recommendation"),
    // confidenceScore: z.number().describe("Confidence score for the analysis provided, on a scale of 0 to 1")
    overallReasonForScore: z.string().describe("Overall explanation for the scores and recommendation given to the resume")

});


const analyseResume = async (role, resumeData) => {
    const prompt = `
ANALYSIS REQUIREMENTS

Generate ALL of the following fields exactly as requested:

1. role
   - The role provided in the input.

2. overallScore
   - Integer between 0 and 100.
   - Must approximately follow the weighted formula:
     overallScore =
     0.35 * technicalScore +
     0.35 * projectScore +
     0.30 * atsScore

3. technicalScore
   - Integer between 0 and 100.

4. projectScore
   - Integer between 0 and 100.

5. atsScore
   - Integer between 0 and 100.

6. strengths
   - Array of candidate strengths.
   - Focus on skills, projects, achievements, and relevant experience.

7. weaknesses
   - Array of candidate weaknesses.
   - Focus on gaps, missing experience, weak project descriptions, missing impact metrics, etc.

8. recommendations
   - Array of actionable recommendations.
   - Each recommendation should clearly improve the candidate's chances for the target role.

9. missingSkills
   - Array of skills missing specifically for the target role.
   - Do not suggest unrelated skills.

10. matchedSkills
   - Array of skills already present in the resume that are relevant to the target role.

11. hiringRecommendation
   - Must be one of:
     - Strong Reject
     - Reject
     - Consider
     - Interview
     - Strong Interview

12. technicalReasonForScore
   - Explain why the technicalScore was assigned.

13. projectReasonForScore
   - Explain why the projectScore was assigned.

14. atsReasonForScore
   - Explain why the atsScore was assigned.

15. reasonForHiringRecommendation
   - Explain why the hiringRecommendation was assigned.

16. overallReasonForScore
   - Provide an overall summary of the candidate's suitability for the role.
   - Explain the most important strengths and weaknesses that influenced the final score.

IMPORTANT:
- Every score must be realistic.
- Do not inflate scores.
- A candidate with limited relevant experience should not receive extremely high scores.
- Ensure consistency between scores, strengths, weaknesses, and hiring recommendation.
- Return ONLY valid JSON matching the provided schema.
- Do not include markdown.
- Do not include explanations outside the JSON response.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseFormat: {
                text: {
                    mimeType: "application/json",
                    schema: zodToJsonSchema(resumeAnalyserSchema)
                }
            }
        }
    });

    const cleanedResponse = jsonrepair(response.text);

    const parsedResponse = resumeAnalyserSchema.parse(JSON.parse(cleanedResponse));
    parsedResponse.role = role;
    

    return parsedResponse;




}

export default analyseResume;



