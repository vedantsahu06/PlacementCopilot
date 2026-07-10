from typing import TypedDict, Literal

from ai_agent.tools.resumeParser import Resume

class ResumeState(TypedDict):

    resumeContent: str
    role:str
    parsedResume: Resume | None
    knownSkills: list[str]
    missingSkills: list[str]
    JD: str
    summary: str
    atsScore: float
    roadmap: list[str]
    advice: str

