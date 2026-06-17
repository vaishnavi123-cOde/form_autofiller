from ollama import chat

from llm.prompts import (
    EXTRACTION_PROMPT
)

from llm.parser import (
    parse_llm_response
)


def run_extraction(
    text: str
):

    prompt = f"""
{EXTRACTION_PROMPT}

DOCUMENT:

{text}
"""

    response = chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response[
        "message"
    ]["content"]

    return parse_llm_response(
        content
    )