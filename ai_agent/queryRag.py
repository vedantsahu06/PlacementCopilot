from ai_agent.Rag import vector_store
from ai_agent.geminiIntegration import model

query= "What cooking skills are required?"
results = vector_store.similarity_search(
    query=query,
    k=3
)

# for doc, score in results:
#     print(doc.metadata["company"], score)

context = "\n\n".join([
    doc.page_content

    for doc in results
])

prompt = f"""
Use only the provided context.

Context:
{context}

Question:
{query}
"""

response = model.invoke(prompt)

print(response)