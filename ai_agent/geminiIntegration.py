import os
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
load_dotenv()

model = init_chat_model(model="google_genai:gemini-2.5-flash-lite",
                        temperature=0.7,
                        timeout=30,
                        max_tokens=1000,
                        max_retries=6,)