from pypdf import PdfReader
from langgraph.types import Command
from langchain.tools import ToolRuntime, tool
from langchain.messages import ToolMessage
from ai_agent.stateEx import ResumeState

@tool
def read_resume(file_path , runtime: ToolRuntime) -> Command:
    """Read a resume file and extract its text content."""
    reader = PdfReader(file_path)
    writer = runtime.stream_writer
    writer(f"Reading your resume")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return Command(
        update={
            "resumeContent": text,
            "messages":[
                ToolMessage(
                    content=f"Resume content extracted.",
                    tool_call_id=runtime.tool_call_id,
                )
            ]
        }
    )
