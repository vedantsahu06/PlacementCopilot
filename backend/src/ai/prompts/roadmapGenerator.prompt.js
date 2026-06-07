import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
import {jsonrepair} from "jsonrepair";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Full comprehensive schema restored with descriptive labels
const roadmapGeneratorSchema = z.object({
  role: z.string().describe(
    "The desired role for which the roadmap is generated"
  ),

  estimatedDuration: z.string().describe(
    "Estimated total duration to complete the roadmap"
  ),

  roadmap: z.array(
    z.object({
      phase: z.number().describe(
        "Learning order of the phase"
      ),

      skill: z.string().describe(
        "Skill to focus on in this phase"
      ),

      reason: z.string().describe(
        "Reason why this skill should be learned at this stage"
      ),

      estimatedTime: z.string().describe(
        "Estimated time required for this phase"
      ),

      learningOutcomes: z.array(z.string()).describe(
        "Expected outcomes after completing this phase"
      ),

      resources: z.array(
        z.object({
          name: z.string().describe(
            "Name of the recommended resource"
          ),
          type: z.enum([
            "Course",
            "Book",
            "Article",
            "Video",
            "Project",
            "Documentation"
          ])
        })
      ).describe("Suggested learning resources")
    })
  ),

  finalOutcome: z.string().describe(
    "Expected result after completing the roadmap"
  )
});

const generateRoadmap = async (role, criticalSkills, importantSkills, optionalSkills, knownSkills) => {
  // Extremely explicit JSON template to force Gemini to follow structure
  const jsonTemplate = {
    role: "string_value_here",
    estimatedDuration: "string_value_here",
    roadmap: [
      {
        phase: 1,
        skill: "string_value_here",
        reason: "string_value_here",
        estimatedTime: "string_value_here",
        learningOutcomes: ["string_value_here"],
        resources: [
          {
            name: "string_value_here",
            type: "Course"
          }
        ]
      }
    ],
    finalOutcome: "string_value_here"
  };

  const prompt = `You are a learning roadmap generator. Return ONLY valid JSON that matches this exact structure - no markdown, no explanations, just pure JSON:

${JSON.stringify(jsonTemplate, null, 2)}

Generate a roadmap for: ${role}

Known skills: ${JSON.stringify(knownSkills)}
Critical skills needed: ${JSON.stringify(criticalSkills)}
Important skills needed: ${JSON.stringify(importantSkills)}
Optional skills: ${JSON.stringify(optionalSkills)}

STRICT REQUIREMENTS:
1. role: "${role}" (exact string)
2. estimatedDuration: realistic time estimate as string (e.g., "3-6 months")
3. roadmap: array of 4-6 learning phases, each with:
   - phase: integer (1, 2, 3, etc.)
   - skill: exact skill name (string)
   - reason: why this skill at this stage (string)
   - estimatedTime: duration (string, e.g., "2-3 weeks")
   - learningOutcomes: array of 2-3 strings describing what they can do
   - resources: array of objects with name (string) and type (ONLY: "Course", "Book", "Article", "Video", "Project", or "Documentation")
4. finalOutcome: what they can achieve after roadmap (string)

CRITICAL: ALL fields must be populated with actual strings/numbers. NO null, undefined, or empty values.
Return ONLY the JSON object. NO markdown code blocks, NO explanations.
ROADMAP PRIORITIZATION RULES:

1. Critical skills MUST be prioritized before Important skills whenever possible.
2. Important skills MUST be prioritized before Optional skills whenever possible.
3. If a skill is a prerequisite for another skill, the prerequisite must appear earlier in the roadmap even if both belong to the same priority category.
4. Do NOT create learning phases for skills already present in Known Skills.
5. Each roadmap phase should focus on a single primary skill.
6. The roadmap should follow a logical dependency order rather than only skill priority.

Common prerequisite examples:
- Git before CI/CD
- Linux before Docker
- Docker before Kubernetes
- Cloud Fundamentals before AWS Advanced Services
- SQL before Database Optimization
- Backend Fundamentals before Distributed Systems

When conflicts occur:
- Prerequisites take precedence over frequency and priority.
- Within the same dependency level, Critical skills should be learned first.
- Within the same priority level, place the most commonly required skills earlier.

The roadmap should progress from foundational skills → deployment skills → cloud skills → advanced/scaling skills.`;

  // Convert schema to JSON schema
  const schemaDefinition = zodToJsonSchema(roadmapGeneratorSchema);
  delete schemaDefinition.$schema;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2000,
      },
    });

    console.log("Raw AI Response:", response.text);

    // Parse and validate the response
    let jsonText = response.text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    let parsed = JSON.parse(jsonText);
    
    // Validate with schema
    const validatedResponse = roadmapGeneratorSchema.parse(parsed);
    return validatedResponse;

  } catch (error) {
    console.error("Error generating or parsing structured roadmap:", error);
    console.error("Full error details:", error.message);
    throw error;
  }
};

export default generateRoadmap;