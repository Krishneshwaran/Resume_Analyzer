import google.generativeai as genai
import PyPDF2
import json
import re
from typing import Dict

def configure_genai(api_key: str) -> None:
    genai.configure(api_key=api_key)

def parse_pdf_resume(pdf_file) -> str:
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        raise Exception(f"Error parsing PDF: {str(e)}")

def create_analysis_prompt(resume_text: str, job_description: str) -> str:
    return f"""
You are an ATS (Applicant Tracking System) and resume evaluator. Analyze the following resume against the provided job description and evaluate its various aspects based on the following criteria. Provide a detailed assessment and scores for each category. If the resume passes a category, explain why it is good; if it does not pass, explain why it is lacking. Ensure the response is structured strictly in JSON format as shown below.

---

#### Job Description:
{job_description}

#### Resume:
{resume_text}

---

Respond ONLY with a JSON object in the following format, without any additional text or explanation:

{{
    "ats_parse_rate": {{
        "score": <number between 0-100>,
        "reason": "<detailed explanation of why the ATS parse rate is good or not good>"
    }},
    "contact_information": {{
        "score": <number between 0-100>,
        "reason": "<detailed explanation of whether LinkedIn, professional email, and phone number are provided and why the score is given>"
    }},
    "skills_analysis": {{
        "hard_skills": {{
            "matched": ["skill1", "skill2"],
            "not_suited": ["skill1", "skill2"],
            "score": <number between 0-100>
        }},
        "soft_skills": {{
            "matched": ["skill1", "skill2"],
            "not_suited": ["skill1", "skill2"],
            "score": <number between 0-100>
        }},
        "reason": "<detailed explanation of why the skills are or are not suited for the job description>"
    }},
    "description_quality": {{
        "score": <number between 0-100>,
        "reason": "<detailed explanation of whether the description is clear, concise, and well-structured>"
    }},
    "experience_analysis": {{
        "years_of_experience": <number>,
        "score": <number between 0-100>,
        "reason": "<detailed explanation of whether the experience is sufficient for the job and why>"
    }},
    "education_analysis": {{
        "score": <number between 0-100>,
        "reason": "<detailed explanation of whether the qualifications meet the job's requirements>"
    }},
    "projects_analysis": {{
        "score": <number between 0-100>,
        "reason": "<detailed explanation of how well the projects align with the job description>"
    }},
    "overall_summary": {{
        "total_score": <number between 0-100>,
        "summary": "<high-level summary of the resume's strengths and weaknesses>"
    }}
}}
"""

def extract_json_from_response(text: str) -> Dict:
    try:
        return json.loads(text)
    except:
        try:
            json_match = re.search(r'({[\s\S]*})', text)
            if json_match:
                return json.loads(json_match.group(1))
        except:
            pass
    
    return {
        "ats_parse_rate": {"score": 0, "reason": "Error analyzing ATS parse rate."},
        "contact_information": {"score": 0, "reason": "Error analyzing contact information."},
        "skills_analysis": {
            "hard_skills": {"matched": [], "not_suited": [], "score": 0},
            "soft_skills": {"matched": [], "not_suited": [], "score": 0},
            "reason": "Error analyzing skills."
        },
        "description_quality": {"score": 0, "reason": "Error analyzing description quality."},
        "experience_analysis": {"years_of_experience": 0, "score": 0, "reason": "Error analyzing experience."},
        "education_analysis": {"score": 0, "reason": "Error analyzing education."},
        "projects_analysis": {"score": 0, "reason": "Error analyzing projects."},
        "overall_summary": {"total_score": 0, "summary": "Error generating overall summary."}
    }

def analyze_resume(resume_text: str, job_description: str, api_key: str) -> Dict:
    try:
        configure_genai(api_key)
        model = genai.GenerativeModel('gemini-pro')
        prompt = create_analysis_prompt(resume_text, job_description)
        response = model.generate_content(prompt)
        
        analysis_result = extract_json_from_response(response.text)
        
        required_fields = [
            "ats_parse_rate",
            "contact_information",
            "skills_analysis",
            "description_quality",
            "experience_analysis",
            "education_analysis",
            "projects_analysis",
            "overall_summary"
        ]
        
        for field in required_fields:
            if field not in analysis_result:
                raise ValueError(f"Missing required field: {field}")
        
        return analysis_result
    except Exception as e:
        raise Exception(f"Error during analysis: {str(e)}")
