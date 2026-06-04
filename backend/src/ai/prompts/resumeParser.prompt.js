import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
import {jsonrepair} from "jsonrepair";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function extractJson(text) {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/i);

  if (match) {
    return match[1].trim();
  }

  return text.trim();
}

const resumeParserSchema = z.object({
  name: z.string().describe("Full name of the candidate"),
  email: z.string().email().describe("Email address of the candidate"),
  phone: z.string().describe("Phone number of the candidate"),

  skills: z.array(z.string()).describe(
    "List of skills possessed by the candidate"
  ),

  experience: z
    
    .array(
      z.object({
        company: z.string().describe("Name of the company"),
        role: z.string().describe("Role held at the company"),
        duration: z.string().describe("Duration of employment"),
      })
    )
    .optional()
    .describe("List of work experiences")
    .optional(),

  education: z
    
    .array(
      z.object({
        degree: z.string().describe("Degree obtained"),
        institution: z
          .string()
          .describe("Institution where the degree was obtained"),
        year:  z.union([
  z.string(),
  z.number()
]).describe("Year of graduation")
.optional()
.nullable(),
      })
    )
    .describe("List of educational qualifications"),

  projects: z
    .array(
      z.object({
        name: z.string().describe("Name of the project"),
        description: z.string().describe("Description of the project"),
        techStack: z
          .array(z.string())
          .describe("Technologies used in the project"),
      })
    )
    .describe("List of projects undertaken by the candidate")
    .optional()
    .nullable(),
});

const resumeParserPrompt = async (resumeText) => {
  const prompt = `
You are a resume parser.

Return ONLY a JSON object matching the provided schema.

IMPORTANT RULES:

- skills must be an array of strings
- experience must contain only:
  - company
  - role
  - duration
- education must contain only:
  - degree
  - institution
  - year
- projects must contain only:
  - name
  - description
  - techStack

DO NOT include:
- address
- links
- nationality
- date_of_birth
- summary
- driving_license
- start_date
- end_date
- skill levels

If information is missing, return null.
The response MUST be parseable by JSON.parse().

Do not omit brackets.
Do not omit commas.
Do not use markdown.
Resume:
${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseFormat: {
        text: {
          mimeType: "application/json",
          schema: zodToJsonSchema(resumeParserSchema),
        },
      },
    },
  });

  console.log("RAW RESPONSE:");
  console.log(response.text);

  const cleanedJson = jsonrepair(response.text);

  console.log("CLEANED JSON:");
  console.log(cleanedJson);

  const parsedData = resumeParserSchema.parse(
    JSON.parse(cleanedJson)
  );

  return parsedData;
};

export default resumeParserPrompt;