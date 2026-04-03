def calculate_match_score(candidate_skills, job_skills):
    # Normalize skills
    candidate_skills = [skill.strip().lower() for skill in candidate_skills]
    job_skills = [skill.strip().lower() for skill in job_skills]

    matched_skills = list(
        set(candidate_skills) & set(job_skills)
    )

    missing_skills = list(
        set(job_skills) - set(candidate_skills)
    )

    if len(job_skills) == 0:
        score = 0
    else:
        score = round(
            (len(matched_skills) / len(job_skills)) * 100,
            2
        )

    return {
        "match_score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
    }