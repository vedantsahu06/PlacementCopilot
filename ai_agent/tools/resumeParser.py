from langchain.tools import tool, ToolRuntime
from langchain.messages import HumanMessage, ToolMessage
from langchain_protocol import Command
from ai_agent.stateEx import ResumeState
from ai_agent.geminiIntegration import model
from pydantic import BaseModel, Field
from typing import List, Optional

class PersonalInfo(BaseModel):
     full_name: Optional[str] = None
     email: Optional[str] = None
     phone: Optional[str] = None
     location: Optional[str] = None
     linkedin: Optional[str] = None
     github: Optional[str] = None
     portfolio: Optional[str] = None
class Education(BaseModel):
    institution: str
    degree: str
    branch: Optional[str] = None
    cgpa: Optional[str] = None
    percentage: Optional[str] = None
    start_year: Optional[str] = None
    end_year: Optional[str] = None
    current: Optional[bool] = None
class Experience(BaseModel):
    company: str
    role: str
    employment_type: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    currently_working: Optional[bool] = None
    responsibilities: List[str] = []
    technologies: List[str] = []
    achievements: List[str] = []
class Project(BaseModel):
    name: str
    description: str
    technologies: List[str] = []
    features: List[str] = []
    github: Optional[str] = None
    live: Optional[str] = None
    duration: Optional[str] = None
class Certification(BaseModel):
    name: str
    issuer: Optional[str] = None
    date: Optional[str] = None
class Achievement(BaseModel):
    title: str
    organization: Optional[str] = None
    year: Optional[str] = None
class PositionOfResponsibility(BaseModel): 
    position: str
    organization: str
    responsibilities: List[str] = []
class CompetitiveProgramming(BaseModel):
    platform: str 
    rating: Optional[str] = None
    username: Optional[str] = None
class Skills(BaseModel): 
    programming_languages: List[str] = []
    frontend: List[str] = []
    backend: List[str] = []
    databases: List[str] = []
    ai_llm: List[str] = []
    cloud: List[str] = []
    devops: List[str] = []
    blockchain: List[str] = []
    developer_tools: List[str] = [] 
    core_cs: List[str] = []
    other: List[str] = []
class Resume(BaseModel): 
    personal_info: PersonalInfo 
    summary: Optional[str] = None 
    education: List[Education] = []
    experience: List[Experience] = [] 
    projects: List[Project] = [] 
    skills: Skills 
    certifications: List[Certification] = [] 
    achievements: List[Achievement] = [] 
    positions_of_responsibility: List[PositionOfResponsibility] = [] 
    competitive_programming: List[CompetitiveProgramming] = [] 
    publications: List[str] = [] 
    research: List[str] = [] 
    open_source: List[str] = [] 
    languages_spoken: List[str] = [] 
    interests: List[str] = []


@tool
def resumeParser (runtime: ToolRuntime) -> Command:
    """convert the resume content which is in plain text or pdf format into structured data and extract all valuable information in structured format from it"""

    resumeContent = runtime.state["resumeContent"]
    prompt = f"""

            You are an expert Resume Information Extraction Engine used in an AI-powered recruitment platform.

            Your task is to accurately extract structured information from resumes while preserving factual correctness.

            GENERAL RULES

            - Extract ONLY information explicitly present in the resume.
            - Never hallucinate, infer, assume, or fabricate missing details.
            - If a field is unavailable, return null or an empty list depending on the schema.
            - Preserve original names of technologies, companies, institutions, certifications, and projects.
            - Normalize obvious formatting inconsistencies without changing meaning.
            - Remove duplicate skills while preserving all unique technologies.
            - Ignore decorative sections, icons, separators, colors, page numbers, headers, and footers.
            - Treat the resume as the single source of truth.

            EXTRACT THE FOLLOWING INFORMATION

            1. Personal Information
            - Full Name
            - Email
            - Phone Number
            - LinkedIn
            - GitHub
            - Portfolio Website
            - Location

            2. Professional Summary
            - Candidate summary/objective if present.

            3. Education
            For each education entry extract:
            - Institution
            - Degree
            - Branch / Major
            - CGPA / Percentage
            - Start Year
            - End Year
            - Current Status

            4. Experience
            For every experience extract:
            - Company
            - Job Title
            - Employment Type
            - Start Date
            - End Date
            - Currently Working (true/false)
            - Responsibilities
            - Technologies Used
            - Achievements

            5. Projects
            For each project extract:
            - Project Name
            - Description
            - Technologies Used
            - Features
            - GitHub Link
            - Live Link
            - Duration (if available)

            6. Skills

            Categorize skills into:

            Programming Languages

            Frontend

            Backend

            Databases

            AI / LLM

            Cloud

            DevOps

            Blockchain

            Developer Tools

            Core Computer Science

            Other Technologies

            Remove duplicates.

            7. Certifications

            Extract:
            - Certificate Name
            - Issuing Organization
            - Date (if available)

            8. Achievements

            Extract:
            - Achievement
            - Organization
            - Rank / Position
            - Year

            9. Positions of Responsibility

            Extract:
            - Position
            - Organization
            - Responsibilities

            10. Competitive Programming

            Extract if present:
            - LeetCode
            - CodeChef
            - Codeforces
            - HackerRank
            - Other Platforms

            11. Publications

            Extract all publications if available.

            12. Research

            Extract research experience if available.

            13. Open Source Contributions

            Extract:
            - Repository
            - Contribution Summary

            14. Languages Spoken

            Extract only if explicitly mentioned.

            15. Interests

            Extract only if explicitly mentioned.

            IMPORTANT EXTRACTION RULES

            Projects and experience must preserve every meaningful technology mentioned.

            For example:

            "Developed REST APIs using Node.js, Express.js and MongoDB"

            must extract

            Technologies:
            [
            Node.js,
            Express.js,
            MongoDB,
            REST APIs
            ]

            Do not merge technologies.

            Do not replace technologies with broader categories.

            Keep exact names.

            OUTPUT REQUIREMENTS

            - Follow the provided structured output schema exactly.
            - Return clean structured data.
            - Never explain your reasoning.
            - Never include markdown.
            - Never generate additional text outside the structured response.

            here is the resume content to extract information from:
            {resumeContent}

            
            
"""

    modelWithStructre = model.with_structured_output(Resume)
    response = modelWithStructre.invoke(prompt)

    return Command(
        update={
            "parsedResume": response,
            "messages":[
                ToolMessage(
                    content=f"Resume content extracted acc to schema.",
                    tool_call_id=runtime.tool_call_id,
                )
            ]
        }
    )







    

