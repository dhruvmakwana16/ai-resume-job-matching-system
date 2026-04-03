from fastapi import FastAPI, UploadFile, File, Form
import pdfplumber
import spacy
import shutil
import os

from utils.matcher import calculate_match_score

app = FastAPI()

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# Skills database
skills_db = [
    "python",
    "java",
    "react",
    "node",
    "mongodb",
    "html",
    "css",
    "javascript",
    "express",
    "sql"
]

# -------------------------------
# Extract text from PDF
# -------------------------------
def extract_text(file_path):
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text.lower() + " "

    return text


# -------------------------------
# Extract skills from text
# -------------------------------
def extract_skills(text):
    text = text.lower()

    found_skills = [
        skill
        for skill in skills_db
        if skill.lower() in text
    ]

    return list(set(found_skills))


# -------------------------------
# Home Route
# -------------------------------
@app.get("/")
def home():
    return {"message": "AI API working ✅"}


# -------------------------------
# Analyze Resume + Job Description
# -------------------------------
@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form("")
):
    try:
        file_path = f"temp_{file.filename}"

        # Save uploaded PDF
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text from resume
        resume_text = extract_text(file_path)

        # Extract skills
        resume_skills = extract_skills(resume_text)
        jd_skills = extract_skills(job_description)

        # Calculate score
        result = calculate_match_score(
            resume_skills,
            jd_skills
        )

        # Debug logs
        print("================================")
        print("Resume Skills:", resume_skills)
        print("Job Description:", job_description)
        print("JD Skills:", jd_skills)
        print("Match Score:", result["match_score"])
        print("Missing Skills:", result["missing_skills"])
        print("================================")

        # Remove temp file
        if os.path.exists(file_path):
            os.remove(file_path)

        return {
            "skills": resume_skills,
            "job_skills": jd_skills,
            "match_score": result["match_score"],
            "missing_skills": result["missing_skills"],
            "message": "✅ JD Matching Complete"
        }

    except Exception as e:
        return {
            "error": str(e),
            "message": "❌ Error analyzing resume"
        }







# from fastapi import FastAPI, UploadFile, File, Form
# import pdfplumber
# import spacy
# import shutil
# import os

# from utils.matcher import calculate_match_score

# app = FastAPI()

# # Load NLP model
# nlp = spacy.load("en_core_web_sm")

# # Skills database
# skills_db = [
#     "python", "java", "react", "node", "mongodb",
#     "html", "css", "javascript", "express", "sql"
# ]

# # -------------------------------
# # Extract text from PDF
# # -------------------------------
# def extract_text(file_path):
#     text = ""

#     with pdfplumber.open(file_path) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text.lower()

#     return text

# # -------------------------------
# # Extract skills
# # -------------------------------
# def extract_skills(text):
#     found_skills = []
#     text = text.lower()

#     for skill in skills_db:
#         if skill in text:
#             found_skills.append(skill)

#     return found_skills

# # -------------------------------
# # Home Route
# # -------------------------------
# @app.get("/")
# def home():
#     return {"message": "AI API working"}

# # -------------------------------
# # Analyze Resume + JD
# # -------------------------------
# @app.post("/analyze")
# async def analyze_resume(
#     file: UploadFile = File(...),
#     job_description: str = Form("")
# ):
#     file_path = f"temp_{file.filename}"

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # Extract text
#     resume_text = extract_text(file_path)

#     # Extract skills
#     resume_skills = extract_skills(resume_text)
#     jd_skills = extract_skills(job_description)

#     # Call matcher utility
#     result = calculate_match_score(
#         resume_skills,
#         jd_skills
#     )

#     # Delete temp file
#     if os.path.exists(file_path):
#         os.remove(file_path)

#     return {
#         "skills": resume_skills,
#         "job_skills": jd_skills,
#         "match_score": result["match_score"],
#         "missing_skills": result["missing_skills"],
#         "message": "✅ JD Matching Complete"
#     }