import os
from langchain.chat_models import init_chat_model
from langchain.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field

def RoadmapGenerator(user_input:str , role:str):
    os.environ["GOOGLE_API_KEY"] 

    class roadmap(BaseModel):
        skill: str
        importance: str
        resources: list[str]
        whyToLearn: str
        priority: int

    class ResumeData(BaseModel):
        matchedSkills: list[str]
        criticalSkills: list[str]
        importantSkills: list[str]
        roadMap:list[roadmap] 


    template = ChatPromptTemplate(
        [
            ("system", """Generate a roadmap for: {role}
             
             knownSkills: list of skills they already have extract from user input that can be knownSkii=lls or matched skils somewhat like this
             criticalSkills: list of critical skills for the role that user lacks
                importantSkills: list of important skills for the role that user lacks
                optionalSkills: list of optional skills for the role that user lacks




STRICT REQUIREMENTS:
1. role: "{role}" (exact string)
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

The roadmap should progress from foundational skills → deployment skills → cloud skills → advanced/scaling skills."""),
            
            ("human", "{user_input}"),
        ]
    )
    # prompt_value = template.invoke(
    #     {
    #         "role": role,
    #         # will give the input
    #         "user_input": user_input
    #     }
    # )

    model = init_chat_model(model="google_genai:gemini-2.5-flash-lite",
                            temperature=0.7,
                            timeout=30,
                            max_tokens=1000,
                            max_retries=6,)

    model_with_structure=model.with_structured_output(ResumeData)
    # response = model_with_structure.invoke(prompt_value)  //without chains
    # print(response)

    chain = template | model_with_structure
    response = chain.invoke(
        {
            "role": role,
              
            "user_input": user_input
        }
    )

    print(response)


RoadmapGenerator('{"knownSkills": ["Python", "Data Analysis"], "criticalSkills": ["Machine Learning", "Deep Learning"], "importantSkills": ["Cloud Computing", "Big Data"], "optionalSkills": ["DevOps", "Security"]}', 'Data Scientist')

