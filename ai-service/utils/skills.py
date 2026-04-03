import spacy

nlp = spacy.load("en_core_web_sm")

def extract_skills(text):
    skills = ["python", "java", "react", "node", "mongodb"]
    found = []

    for skill in skills:
        if skill in text.lower():
            found.append(skill)

    return found