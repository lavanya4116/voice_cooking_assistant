from fastapi import APIRouter, UploadFile, File
import uuid
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "uploads"

@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    filename = f"{uuid.uuid4()}.webm"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": filename,
        "path": file_path
    }
