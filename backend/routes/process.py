from fastapi import APIRouter
import os

from extractors.pdf_extractor import extract_pdf_text
from extractors.docx_extractor import extract_docx_text
from extractors.image_extractor import extract_image_text

from llm.ollama_client import run_extraction

router = APIRouter()


@router.post("/process")
async def process_document(
    payload: dict
):

    filepath = payload["filepath"]

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

    structured_data = run_extraction(
        text
    )

    return {
        "structured_data": structured_data
    }