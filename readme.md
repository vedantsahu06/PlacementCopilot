# AI Placement Copilot


An AI-powered Career Intelligence Platform designed to bridge the gap between a candidate's current skill set and the requirements of real-world software engineering roles.
just a project made to learn Agentic AI, can be a future Product :)

Unlike traditional resume analyzers that simply compare keywords and generate a score, AI Placement Copilot aims to answer a much deeper question:

> What should a candidate learn next, why should they learn it, and how much will it improve their chances of getting hired?

The long-term vision is to build a data-driven career copilot powered by real job market intelligence, retrieval systems, vector databases, and agentic AI workflows.

---

# Problem Statement

Most candidates struggle with:

* Understanding why they are being rejected
* Identifying the highest-impact skills to learn
* Distinguishing important skills from optional skills
* Finding reliable learning paths
* Adapting to rapidly changing job market requirements

Current solutions often provide:

* Generic resume scores
* AI-generated advice without evidence
* No prioritization strategy
* No market-backed recommendations

AI Placement Copilot addresses these limitations by combining Resume Analysis, Job Description Intelligence, Skill Gap Detection, Market Insights, and Learning Roadmaps into a single platform.

---

# Current Version (V1)

V1 focuses on building a complete end-to-end analysis pipeline.

## Resume Parsing Engine

Upload a resume and automatically extract:

* Personal Information
* Skills
* Experience
* Education
* Projects

Supported Inputs:

* PDF Resumes

---

## Resume ↔ Job Description Matching

Analyzes a candidate against a target role and generates:

* Match Score
* Required Skills
* Matched Skills
* Missing Skills
* Strengths
* Weaknesses
* Hiring Likelihood
* Match Reasoning

The system attempts to simulate a recruiter-style evaluation process rather than relying solely on keyword overlap.

---

## Role Insight Engine

One of the core components of the platform.

Instead of treating all missing skills equally, the system:

* Collects multiple job descriptions
* Normalizes skill names
* Aggregates skill frequencies
* Generates role-specific demand insights

Example:

Backend Engineer

* Docker → 92%
* AWS → 88%
* Kubernetes → 75%
* Node.js → 46%

This creates a market-backed understanding of skill importance.

---

## Skill Gap Analysis Engine

Missing skills are categorized into:

### Critical Skills

Skills that frequently appear across target roles and significantly impact employability.

### Important Skills

Skills that improve competitiveness but are not immediate blockers.

### Optional Skills

Nice-to-have skills that can be learned later.

This enables candidates to focus on high-impact learning rather than random upskilling.

---

## Roadmap Generation Engine

Generates personalized learning roadmaps using:

* Candidate's current skills
* Missing skills
* Skill priorities
* Prerequisite relationships

Example:

Git
↓
Linux
↓
Docker
↓
AWS
↓
Kubernetes

instead of random skill recommendations.

Each roadmap includes:

* Learning Phases
* Skill Prioritization
* Estimated Timelines
* Learning Outcomes
* Recommended Resources
* Final Career Outcome

---

## Career Report Generation

Aggregates all platform outputs into a single report.

Generated Report Includes:

* Parsed Resume
* Job Match Analysis
* Skill Gap Analysis
* Personalized Roadmap

This serves as a centralized career intelligence dashboard.

---

# System Architecture

Resume Upload
↓
Resume Parser
↓
Structured Resume Storage
↓
Job Description Analysis
↓
Resume ↔ JD Matching
↓
Role Insight Aggregation
↓
Skill Gap Detection
↓
Roadmap Generation
↓
Career Report API

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## AI Layer

* Google Gemini

## Validation

* Zod
* JSON Schema

## File Processing

* Multer
* PDF Parsing

---

# Future Roadmap

The current version establishes the foundation.

Future versions aim to transform the project into a full-scale Career Intelligence Platform.

---

# V2 — Data-Driven Intelligence Layer

Current role insights are generated from manually collected job descriptions.

V2 introduces:

* Large-scale Job Description Collection
* Automated Skill Trend Tracking
* Skill Frequency Analytics
* Historical Market Analysis

The objective is to replace assumptions with measurable market demand.

---

# V3 — Retrieval Augmented Generation (RAG)

Instead of relying solely on model knowledge:

* Job Descriptions will be embedded
* Learning Resources will be embedded
* Career Knowledge will be embedded

The system will retrieve relevant information before generating recommendations.

Benefits:

* Reduced hallucinations
* More accurate recommendations
* Evidence-backed outputs

---

# V4 — Vector Database Infrastructure

Introduce:

* ChromaDB
* Semantic Search
* Similar JD Retrieval
* Similar Resume Retrieval

Candidates will be matched not only against a single JD but against clusters of similar industry roles.

---

# V5 — Dynamic Learning Intelligence

Roadmaps will evolve from static plans into adaptive learning systems.

Future roadmap generation will consider:

* Candidate progress
* Market demand changes
* Company-specific requirements
* Skill dependencies
* Interview performance

Roadmaps become living documents rather than one-time outputs.

---

# V6 — Company Intelligence Engine

The platform will analyze:

* Google
* Amazon
* Microsoft
* Meta
* Startups

and generate:

* Company-specific skill gaps
* Company-specific roadmaps
* Interview preparation plans
* Resume optimization recommendations

based on real-world hiring patterns.

---

# V7 — Agentic AI System

Introduce specialized AI agents:

### Resume Agent

Analyzes candidate profiles.

### JD Research Agent

Collects and analyzes role requirements.

### Skill Gap Agent

Identifies weaknesses and prioritizes improvements.

### Roadmap Agent

Creates adaptive learning plans.

### Interview Agent

Generates company-specific interview preparation.

Agents collaborate to produce richer and more reliable recommendations.

---

# V8 — Career Knowledge Graph

Build relationships between:

* Roles
* Skills
* Technologies
* Companies
* Learning Resources
* Interview Patterns

This enables:

* Skill dependency analysis
* Career path simulation
* Technology transition planning

Example:

Java Developer
↓
Spring Boot
↓
Microservices
↓
Docker
↓
Kubernetes
↓
Platform Engineer

---

# V9 — Market Intelligence Platform

The long-term vision.

The platform continuously learns from:

* Hiring Trends
* Job Descriptions
* Technology Adoption
* Skill Demand Shifts

and answers:

> What should I learn next?

with recommendations backed by real market data rather than generic AI-generated suggestions.

---

# Key Engineering Challenges Solved

* Resume Parsing Pipeline
* Structured AI Outputs
* Schema Validation
* Job Description Intelligence
* Skill Normalization
* Skill Frequency Aggregation
* Market-Based Prioritization
* Roadmap Generation
* Multi-Collection Data Modeling
* Career Report Aggregation

---

# Author

Vedant Sahu

Computer Science Student | Backend Engineering | AI Systems | Career Intelligence

Building systems that combine AI, data engineering, retrieval systems, and real-world hiring intelligence to help candidates make better career decisions.
