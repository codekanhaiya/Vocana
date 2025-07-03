from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.translator import translate, LANGUAGES

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to ["http://localhost:3000"] for frontend security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

@app.get("/")
def read_root():
    return {"message": "M2M-100 Translation API is running."}

@app.get("/languages")
def get_languages():
    return LANGUAGES

@app.get("/status")
def model_status():
    from app.translator import MODEL_STATUS
    return {"status": MODEL_STATUS}


@app.post("/translate")
def perform_translation(req: TranslationRequest):
    if req.source_lang not in LANGUAGES or req.target_lang not in LANGUAGES:
        raise HTTPException(status_code=400, detail="Unsupported language code.")
    result = translate(req.text, req.source_lang, req.target_lang)
    return {
        "source_lang": req.source_lang,
        "target_lang": req.target_lang,
        "original_text": req.text,
        "translated_text": result
    }
