from typing import TypedDict, Literal

class ResumeState(TypedDict):

    resumeContent: str
    role:str
    knownSkills: list[str]
    missingSkills: list[str]
    JD: str
    summary: str
    atsScore: float
    roadmap: list[str]
    advice: str

