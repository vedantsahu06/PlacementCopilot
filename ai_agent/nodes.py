from typing import Literal
from langgraph.graph import StateGraph, START, END
from langgraph.types import interrupt, Command, RetryPolicy
from langchain.messages import HumanMessage
from ai_agent.stateEx import ResumeState
from ai_agent.geminiIntegration import model
from pydantic import BaseModel
from ai_agent.fakeJds import fakeJd

class readResumemodel(BaseModel):
    role: str
    knownSkills: list[str]

class JDmodel(BaseModel):
    role: str
    knownSkills: list[str]
    criticalSkills: list[str]
class advicemodel(BaseModel):
        summary: str
        atsScore: float
        roadmap: list[str]
        advice: str
    


def readResume(state:ResumeState ,) :
    """
    Reads the resume content and extracts known skills from resume .
    """

    prompt=f"""
        You are a resume analyzer. Given the resume content, extract the following information:
        - Role: The job title or position the candidate is applying for.
        - Known Skills: A list of skills the candidate possesses.

        here is the resume content:
        {state['resumeContent']}
        """
    
    modelWithStructre = model.with_structured_output(
        readResumemodel)
    
    response = modelWithStructre.invoke(prompt)

    return {
        
        
        "knownSkills": response.knownSkills
        
    }


def JD(state:ResumeState ,) :
    """
    retrieve the JD for the role from the vector store and extract critical skills from it.
    """
    jds = fakeJd()
    prompt=f"""
        You are a resume analyzer. Given the resume content and the job description,known skills, extract the following information:
       

        here is the resume content:
        {state['resumeContent']}
        known skills: {state['knownSkills']}
        here is the job description:
        {jds}

        """
    
    modelWithStructre = model.with_structured_output(
        JDmodel)
    
    response = modelWithStructre.invoke(prompt)

    return {   
        "missingSkills": response.criticalSkills
       
    }


def advice(state:ResumeState ,) :
    """
    Provide advice to the candidate based on the missing skills and known skills.
    """
    prompt=f"""
        You are a career advisor. Given the known skills and missing skills, provide advice to the candidate on how to improve their skill set and increase their chances of getting the job.
        also provide summary ATS score of the resume based on the job description and known skills.
        also generate a roadmap for the candidate to follow in order to acquire the missing skills and improve their chances of getting the job.

        Known Skills: {state['knownSkills']}
        Missing Skills: {state['missingSkills']}
        """
    modelWithStructre = model.with_structured_output(
        advicemodel)
    response = modelWithStructre.invoke(prompt)

    return {
        "advice": response
    }


workflow = StateGraph(ResumeState, )
workflow.add_node(
    "readResume",
    readResume,)

workflow.add_node(
    "JD",
    JD,
)

workflow.add_node(
   "advice",
    advice,
)

workflow.add_edge(START, "readResume")
workflow.add_edge("readResume", "JD")
workflow.add_edge("JD", "advice")
workflow.add_edge("advice", END)

app =workflow.compile()
resume = """ Aarav Sharma
Email: aarav.sharma@gmail.com
Phone: +91 9876543210
LinkedIn: linkedin.com/in/aaravsharma
GitHub: github.com/aaravsharma

--------------------------------------------------
SUMMARY
--------------------------------------------------

Backend-focused Computer Science student with experience building REST APIs,
database-driven applications, and scalable backend systems using Java and Spring Boot.
Strong understanding of OOP, DSA, SQL, and software engineering fundamentals.
Passionate about distributed systems and cloud-native development.

--------------------------------------------------
EDUCATION
--------------------------------------------------

B.Tech in Computer Science
National Institute of Technology
2022 - 2026

CGPA: 8.8

--------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------

Languages:
Java, Python, SQL

Backend:
Spring Boot, REST APIs, Microservices

Database:
MySQL, PostgreSQL

Tools:
Git, GitHub, Maven

Concepts:
OOP, Data Structures & Algorithms, Operating Systems,
Computer Networks, DBMS

--------------------------------------------------
PROJECTS
--------------------------------------------------

1. E-Commerce Backend System

Tech Stack:
Java, Spring Boot, MySQL

Description:
- Developed RESTful APIs for product, cart, and order management.
- Implemented authentication and role-based authorization.
- Optimized database queries for faster response times.

Key Features:
- JWT Authentication
- Product Management
- Order Tracking
- User Roles

--------------------------------------------------

2. URL Shortener Service

Tech Stack:
Java, Spring Boot, PostgreSQL

Description:
- Built a URL shortening service similar to Bitly.
- Generated unique short URLs and tracked usage analytics.

Key Features:
- URL Encoding
- Click Tracking
- Analytics Dashboard API

--------------------------------------------------

3. Task Management API

Tech Stack:
Spring Boot, PostgreSQL

Description:
- Designed backend APIs for task creation, assignment, and tracking.
- Implemented pagination and filtering support.

--------------------------------------------------
ACHIEVEMENTS
--------------------------------------------------

- Solved 500+ DSA problems on LeetCode.
- Knight on LeetCode.
- 3-Star on CodeChef.

--------------------------------------------------
CERTIFICATIONS
--------------------------------------------------

- Java Programming Masterclass
- Spring Boot Fundamentals
- SQL for Backend Developers

--------------------------------------------------
POSITIONS OF RESPONSIBILITY
--------------------------------------------------

Backend Team Member
Coding Club

- Developed APIs for internal club management tools.
- Conducted backend development workshops for juniors.

--------------------------------------------------
INTERESTS
--------------------------------------------------

Backend Engineering
Distributed Systems
System Design
Cloud Computing"""

response = app.invoke(
     
    {
        "resumeContent": resume,
        "role": "Backend Software Engineer Intern"
    }
    )

print (response)