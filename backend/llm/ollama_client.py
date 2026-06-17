import asyncio
from ollama import chat

from llm.prompts import (
    EXTRACTION_PROMPT
)

from llm.parser import (
    parse_llm_response
)


async def run_extraction(
    text: str
):

    prompt = f"""
{EXTRACTION_PROMPT}

DOCUMENT:

{text}
"""

    loop = asyncio.get_event_loop()
    response = await asyncio.wait_for(
        loop.run_in_executor(
            None,
            lambda: chat(
                model="qwen2.5:1.5b",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )
        ),
        timeout=120
    )

    content = response[
        "message"
    ]["content"]

    return parse_llm_response(
        content
    )