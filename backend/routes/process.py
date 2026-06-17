from fastapi import APIRouter, HTTPException
import os
import asyncio

from extractors.pdf_extractor import extract_pdf_text
from extractors.docx_extractor import extract_docx_text
from extractors.image_extractor import extract_image_text

from llm.ollama_client import run_extraction

router = APIRouter()

UPLOAD_DIR = os.path.abspath("uploads")

CANONICAL_FIELDS = {
    "name": "name",
    "full_name": "name",
    "email": "email",
    "email_address": "email",
    "phone": "phone",
    "phone_number": "phone",
    "mobile": "phone",
    "mobile_number": "phone",
    "address": "address",
    "education": "education",
    "skills": "skills",
    "technical_skills": "skills",
    "experience": "experience",
    "work_experience": "experience",
    "employment": "experience",
    "linkedin": "linkedin",
    "linkedin_profile": "linkedin",
    "linkedin_url": "linkedin",
    "github": "github",
    "github_profile": "github",
    "github_url": "github",
    "summary": "summary",
    "objective": "summary",
    "dob": "date_of_birth",
    "date_of_birth": "date_of_birth",
    "university": "university",
    "college": "college",
    "degree": "degree",
    "student_id": "student_id",
}


def flatten_value(v):
    if v is None:
        return None
    if isinstance(v, str):
        return v
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, list):
        parts = []
        for item in v:
            flat = flatten_value(item)
            if flat:
                parts.append(flat)
        return ". ".join(parts) if parts else None
    if isinstance(v, dict):
        parts = []
        for k, val in v.items():
            flat = flatten_value(val)
            if flat:
                parts.append(f"{k}: {flat}")
        return ", ".join(parts) if parts else None
    return str(v)


def normalize(data):
    if not isinstance(data, dict):
        return data
    result = {}
    for key, value in data.items():
        key_lower = key.lower().replace("-", "_")
        canonical = CANONICAL_FIELDS.get(key_lower)
        if canonical:
            flat = flatten_value(value)
            if flat:
                result[canonical] = flat
        elif key_lower in ("document_type", "type", "document"):
            continue
        else:
            flat = flatten_value(value)
            if flat and len(key_lower) < 30:
                result[key] = flat
    return result


@router.post("/process")
async def process_document(
    payload: dict
):

    filepath = payload["filepath"]

    full_path = os.path.abspath(filepath)
    if not full_path.startswith(
        UPLOAD_DIR + os.sep
    ):
        raise HTTPException(
            400,
            "Invalid file path"
        )

    if not os.path.exists(full_path):
        raise HTTPException(
            404,
            "File not found"
        )

    extension = os.path.splitext(
        filepath
    )[1].lower()

    if extension == ".pdf":

        text = extract_pdf_text(
            filepath
        )

    elif extension == ".docx":

        text = extract_docx_text(
            filepath
        )

    else:

        text = extract_image_text(
            filepath
        )

    structured_data = await run_extraction(
        text
    )

    return {
        "structured_data": normalize(
            structured_data
        )
    }