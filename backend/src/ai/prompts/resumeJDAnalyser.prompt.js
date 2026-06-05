import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
import {jsonrepair} from "jsonrepair";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const resumeJDAnalyserSchema = z.object({
  role: z.string().describe("The desired role of the candidate"),

  company: z.string().describe("The company offering the job"),

  matchScore: z.number().describe("A score indicating how well the candidate matches the job description").min(0).max(100),

  requiredSkills: z.array(z.string()).describe("List of skills required for the role"),

  matchedSkills: z.array(z.string()).describe("List of skills from the resume that match the required skills for the role"),

  missingSkills: z.array(z.string()).describe("List of skills that are required for the role but are missing from the resume")  ,

  strengths: z.array(z.string()).describe("List of strengths of the candidate"),

  weaknesses: z.array(z.string()).describe("List of weaknesses of the candidate"),

  hiringLikelihood: z.enum([
    "Low",
    "Medium",
    "High"
  ]).describe("The likelihood of the candidate being hired"),

  matchReason: z.string().describe("Reason for the match score")
});


const analyseResumeJD = async (role, resumeData, JD,company) => {
    const prompt = `
    we will be providing you with a resume of a candidate along with job role and job description for that role.
    you are senior recruiter with 20 years of experience in the required role field. 
    your task is to analyse the resume based on the job description and provide a match score between 0 to 100 indicating how well the candidate matches the job description.

    ANALYSIS REQUIREMENTS

Generate ALL of the following fields exactly as requested:
1. role
   - The role provided in the input.
2. company
   - The company offering the job.
3. matchScore
   - A score indicating how well the candidate matches the job description.
4. requiredSkills
   - List of skills required for the role.
5. matchedSkills
   - List of skills from the resume that match the required skills for the role.
6. missingSkills
   - List of skills that are required for the role but are missing from the resume.
7. strengths
   - List of strengths of the candidate.
8. weaknesses
   - List of weaknesses of the candidate.
9. hiringLikelihood
   - The likelihood of the candidate being hired.
   - Must be one of: "Low", "Medium", "High"
10. matchReason
    - Reason for the match score.
IMPORTANT:
- Every score must be realistic.
- Do not inflate scores.
- A candidate with limited relevant experience should not receive extremely high scores.
- Ensure consistency between scores, strengths, weaknesses, and hiring recommendation.
- Return ONLY valid JSON matching the provided schema.
- Do not include markdown.
- Do not include explanations outside the JSON response.
-Only evaluate weaknesses relevant to the target role.
-Do not mention irrelevant technologies or responsibilities.

here is the job description:
${JD}

here is the resume data:
${JSON.stringify(resumeData)}

here is the targeted role:
${role}

here is the company offering the job:
${company}
    `


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config:{
            text:{
                mimeType:"application/json",
                schema: zodToJsonSchema(resumeJDAnalyserSchema)
            }
        }
    })
    // console.log("Raw response from AI:", response.text);
    const cleanedResponse = jsonrepair(response.text);
    // console.log("Cleaned response===============================:", cleanedResponse);
    const parsedResponse = resumeJDAnalyserSchema.parse(JSON.parse(cleanedResponse));
    // console.log("Parsed response:===================================", parsedResponse);
    return parsedResponse;
}

export default analyseResumeJD;