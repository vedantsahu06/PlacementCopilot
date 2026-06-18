from langchain_chroma import Chroma
import os
from uuid import uuid4
from langchain_core.documents import Document

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import getpass
load_dotenv()




if not os.environ.get("GOOGLE_API_KEY"):
  os.environ["GOOGLE_API_KEY"] = getpass.getpass("Enter API key for Google Gemini: ")


embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
vector_store = Chroma(
    collection_name="example_jd_collection",
    embedding_function=embeddings,
    chroma_cloud_api_key=os.getenv("CHROMA_API_KEY"),
    tenant=os.getenv("CHROMA_TENANT"),
    database=os.getenv("CHROMA_DATABASE"),
)

from langchain_core.documents import Document

# documents = [
#     Document(
#         page_content="""
# Software Engineer Intern

# Company: Google

# Requirements:
# - Strong knowledge of Data Structures and Algorithms
# - Proficiency in C++, Java, or Python
# - Understanding of Operating Systems and Computer Networks
# - Experience with Git
# - Pursuing B.Tech in CSE or related field

# Responsibilities:
# - Build scalable backend services
# - Collaborate with senior engineers
# - Write clean and maintainable code
#         """,
#         metadata={
#             "company": "Google",
#             "role": "Software Engineer Intern",
#             "location": "Bangalore",
#             "experience": "0-1 years",
#             "skills": [
#                 "DSA",
#                 "C++",
#                 "Python",
#                 "Operating Systems",
#                 "Computer Networks",
#                 "Git"
#             ]
#         },
#     ),

#     Document(
#         page_content="""
# Frontend Developer Intern

# Company: Razorpay

# Requirements:
# - Strong JavaScript fundamentals
# - Experience with React.js
# - Knowledge of HTML, CSS, Tailwind CSS
# - Familiarity with REST APIs
# - Understanding of responsive design

# Responsibilities:
# - Build reusable UI components
# - Work with backend teams
# - Improve user experience
#         """,
#         metadata={
#             "company": "Razorpay",
#             "role": "Frontend Developer Intern",
#             "location": "Remote",
#             "experience": "0-1 years",
#             "skills": [
#                 "JavaScript",
#                 "React",
#                 "HTML",
#                 "CSS",
#                 "Tailwind",
#                 "REST API"
#             ]
#         },
#     ),

#     Document(
#         page_content="""
# Backend Engineer

# Company: Swiggy

# Requirements:
# - Strong Java and Spring Boot knowledge
# - Experience with PostgreSQL
# - Knowledge of Redis caching
# - Understanding of distributed systems
# - Familiarity with Docker

# Responsibilities:
# - Design scalable APIs
# - Database optimization
# - Performance monitoring
#         """,
#         metadata={
#             "company": "Swiggy",
#             "role": "Backend Engineer",
#             "location": "Bangalore",
#             "experience": "1-3 years",
#             "skills": [
#                 "Java",
#                 "Spring Boot",
#                 "PostgreSQL",
#                 "Redis",
#                 "Docker",
#                 "Distributed Systems"
#             ]
#         },
#     ),

#     Document(
#         page_content="""
# AI/ML Engineer Intern

# Company: OpenAI

# Requirements:
# - Python programming
# - Machine Learning fundamentals
# - Knowledge of Transformers and LLMs
# - Experience with LangChain
# - Vector Databases and RAG systems

# Responsibilities:
# - Build AI applications
# - Prompt engineering
# - Evaluate LLM outputs
#         """,
#         metadata={
#             "company": "OpenAI",
#             "role": "AI/ML Engineer Intern",
#             "location": "Remote",
#             "experience": "0-1 years",
#             "skills": [
#                 "Python",
#                 "Machine Learning",
#                 "LLM",
#                 "LangChain",
#                 "RAG",
#                 "Vector DB"
#             ]
#         },
#     ),

#     Document(
#         page_content="""
# Full Stack Developer

# Company: Zomato

# Requirements:
# - React.js
# - Node.js
# - Express.js
# - PostgreSQL
# - REST APIs
# - Authentication and Authorization

# Responsibilities:
# - Build end-to-end web applications
# - Design APIs
# - Database management
#         """,
#         metadata={
#             "company": "Zomato",
#             "role": "Full Stack Developer",
#             "location": "Gurgaon",
#             "experience": "0-2 years",
#             "skills": [
#                 "React",
#                 "Node.js",
#                 "Express",
#                 "PostgreSQL",
#                 "REST API",
#                 "JWT"
#             ]
#         },
#     ),
# ]
# uuids = [str(uuid4()) for _ in range(len(documents))]

# vector_store.add_documents(documents=documents, ids=uuids)