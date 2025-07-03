import os
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
import torch

# Define the local model directory
LOCAL_MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models')
MODEL_NAME = "facebook/m2m100_418M"

# Check if model exists locally, otherwise download and save
MODEL_STATUS = "initializing"

try:
    if not os.path.exists(os.path.join(LOCAL_MODEL_PATH, 'pytorch_model.bin')):
        print("Downloading M2M-100 model for the first time...")
        MODEL_STATUS = "downloading"
        tokenizer = M2M100Tokenizer.from_pretrained(MODEL_NAME)
        model = M2M100ForConditionalGeneration.from_pretrained(MODEL_NAME)
        os.makedirs(LOCAL_MODEL_PATH, exist_ok=True)
        tokenizer.save_pretrained(LOCAL_MODEL_PATH)
        model.save_pretrained(LOCAL_MODEL_PATH)
    else:
        print("Loading model from local directory...")
        MODEL_STATUS = "loading"
        tokenizer = M2M100Tokenizer.from_pretrained(LOCAL_MODEL_PATH)
        model = M2M100ForConditionalGeneration.from_pretrained(LOCAL_MODEL_PATH)

    MODEL_STATUS = "ready"
except Exception as e:
    MODEL_STATUS = f"error: {str(e)}"



# Supported languages
LANGUAGES = {
    "af": "Afrikaans",
    "am": "Amharic",
    "ar": "Arabic",
    "az": "Azerbaijani",
    "bn": "Bengali",
    "bg": "Bulgarian",
    "my": "Burmese",
    "zh": "Chinese",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "en": "English",
    "et": "Estonian",
    "fi": "Finnish",
    "fr": "French",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek",
    "gu": "Gujarati",
    "ha": "Hausa",
    "he": "Hebrew",
    "hi": "Hindi",
    "hu": "Hungarian",
    "id": "Indonesian",
    "it": "Italian",
    "ja": "Japanese",
    "jv": "Javanese",
    "kn": "Kannada",
    "kk": "Kazakh",
    "ko": "Korean",
    "ky": "Kyrgyz",
    "lo": "Lao",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "mk": "Macedonian",
    "ml": "Malayalam",
    "mr": "Marathi",
    "mn": "Mongolian",
    "ne": "Nepali",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pa": "Punjabi",
    "ro": "Romanian",
    "ru": "Russian",
    "sr": "Serbian",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "es": "Spanish",
    "sw": "Swahili",
    "sv": "Swedish",
    "tl": "Tagalog",
    "ta": "Tamil",
    "te": "Telugu",
    "th": "Thai",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "xh": "Xhosa",
    "zu": "Zulu"
}



def translate(text: str, source_lang: str, target_lang: str) -> str:
    tokenizer.src_lang = source_lang
    encoded = tokenizer(text, return_tensors="pt")
    generated_tokens = model.generate(
        **encoded, forced_bos_token_id=tokenizer.get_lang_id(target_lang)
    )
    translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
    return translated_text
