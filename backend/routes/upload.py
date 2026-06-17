from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"
MAX_SIZE = 50 * 1024 * 1024
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".png", ".jpg", ".jpeg"}

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    ext = os.path.splitext(
        file.filename or ""
    )[1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            400,
            f"Unsupported file type: {ext}"
        )

    content = await file.read()

    if len(content) > MAX_SIZE:
        raise HTTPException(
            400,
            f"File too large ({len(content) // 1024 // 1024}MB)"
        )

    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(filepath, "wb") as f:
        f.write(content)

    return {
        "filename": filename,
        "filepath": filepath
    }