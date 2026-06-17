# Intelligent Form Auto-Filler

Upload a PDF, DOCX, or image — extracts the data, maps it to form fields, and lets you review/edit before finalizing.

## How it works

1. Upload a document (PDF, DOCX, PNG, JPG)
2. Backend extracts text using pdfplumber / python-docx / EasyOCR
3. LLM (Ollama + qwen2.5:1.5b) parses the text into structured fields
4. Frontend displays them in an editable form

## Setup

### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

Make sure Ollama is running locally with the model:

```bash
ollama pull qwen2.5:1.5b
```

Start the server:

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Stack

- **Backend:** FastAPI, pdfplumber, python-docx, EasyOCR, Ollama
- **Frontend:** Next.js, Tailwind CSS, Zustand
