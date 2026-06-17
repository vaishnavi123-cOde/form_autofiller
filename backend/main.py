from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.upload import router as upload_router
from routes.process import router as process_router

app = FastAPI(
    title="Intelligent Form Auto-Filler"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(process_router)


@app.get("/")
def root():
    return {
        "message": "Backend Running"
    }