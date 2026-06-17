from fastapi import APIRouter, HTTPException
import os
import asyncio

from extractors.pdf_extractor import extract_pdf_text
from extractors.docx_extractor import extract_docx_text
from extractors.image_extractor import extract_image_text

from llm.ollama_client import run_extraction

router = APIRouter()

UPLOAD_DIR = os.path.abspath("uploads")


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
        "structured_data": structured_data
    }