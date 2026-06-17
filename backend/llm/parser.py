import json
import re


def parse_llm_response(
    response_text: str
):

    cleaned = response_text.strip()

    if cleaned.startswith("```"):
        cleaned = re.sub(
            r"^```(?:json)?\s*", "", cleaned
        )
        cleaned = re.sub(
            r"\s*```$", "", cleaned
        )
        cleaned = cleaned.strip()

    cleaned = re.sub(
        r",\s*([}\]])", r"\1", cleaned
    )

    try:

        return json.loads(cleaned)

    except Exception:

        match = re.search(
            r"\{.*\}",
            cleaned,
            re.DOTALL
        )

        if match:

            try:

                return json.loads(
                    match.group()
                )

            except Exception:
                pass

    return {
        "error": "JSON parsing failed",
        "raw_response": response_text
    }