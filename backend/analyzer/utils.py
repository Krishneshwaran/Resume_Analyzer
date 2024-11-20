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
    return f"""You are an ATS (Applicant Tracking System) analyzer. Analyze the following resume against the job description and provide a structured response.

    Job Description:
    {job_description}

    Resume:
    {resume_text}

    Respond ONLY with a JSON object in the following format, without any additional text or explanation:

    {{
        "overall_match_percentage": <number between 0-100>,
        "keyword_analysis": {{
            "matched_keywords": ["keyword1", "keyword2"],
            "missing_keywords": ["keyword1", "keyword2"],
            "keyword_match_score": <number between 0-100>
        }},
        "skills_analysis": {{
            "hard_skills": {{
                "matched": ["skill1", "skill2"],
                "missing": ["skill1", "skill2"],
                "score": <number between 0-100>
            }},
            "soft_skills": {{
                "matched": ["skill1", "skill2"],
                "missing": ["skill1", "skill2"],
                "score": <number between 0-100>
            }}
        }},
        "experience_analysis": {{
            "relevance_score": <number between 0-100>,
            "years_of_experience": <number>,
            "relevant_positions": ["position1", "position2"]
        }},
        "education_analysis": {{
            "relevance_score": <number between 0-100>,
            "qualifications": ["qualification1", "qualification2"]
        }},
        "formatting_score": <number between 0-100>,
        "section_scores": {{
            "skills_section": <number between 0-100>,
            "experience_section": <number between 0-100>,
            "education_section": <number between 0-100>
        }},
        "detailed_feedback": "Provide specific, actionable feedback here"
    }}"""

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
        "overall_match_percentage": 0,
        "keyword_analysis": {
            "matched_keywords": [],
            "missing_keywords": [],
            "keyword_match_score": 0
        },
        "skills_analysis": {
            "hard_skills": {
                "matched": [],
                "missing": [],
                "score": 0
            },
            "soft_skills": {
                "matched": [],
                "missing": [],
                "score": 0
            }
        },
        "experience_analysis": {
            "relevance_score": 0,
            "years_of_experience": 0,
            "relevant_positions": []
        },
        "education_analysis": {
            "relevance_score": 0,
            "qualifications": []
        },
        "formatting_score": 0,
        "section_scores": {
            "skills_section": 0,
            "experience_section": 0,
            "education_section": 0
        },
        "detailed_feedback": "Error analyzing resume. Please try again."
    }

def analyze_resume(resume_text: str, job_description: str, api_key: str) -> Dict:
    try:
        configure_genai(api_key)
        model = genai.GenerativeModel('gemini-pro')
        prompt = create_analysis_prompt(resume_text, job_description)
        response = model.generate_content(prompt)
        
        analysis_result = extract_json_from_response(response.text)
        
        required_fields = [
            "overall_match_percentage",
            "keyword_analysis",
            "skills_analysis",
            "experience_analysis",
            "education_analysis",
            "formatting_score",
            "section_scores",
            "detailed_feedback"
        ]
        
        for field in required_fields:
            if field not in analysis_result:
                raise ValueError(f"Missing required field: {field}")
        
        return analysis_result
    except Exception as e:
        raise Exception(f"Error during analysis: {str(e)}")