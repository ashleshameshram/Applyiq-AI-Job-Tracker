import { generateMockAnalysis } from "./mock-analysis.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const USE_MOCK_AI = false;

export default async function handler(req,res){
    if(req.method !== 'POST') {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { resumeText, jobDescription } = req.body;

    if(!resumeText || !jobDescription) {
        return res.status(400).json({
            message: "Resume text and job description are required"
        });
    }
    
    if(USE_MOCK_AI) {
        return res.status(200).json(
            generateMockAnalysis(resumeText, jobDescription)
        );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if(!apiKey){
        return res.status(500).json({
            message: "Gemini API Key is missing"
        });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model : "gemini-3.6-flash",
        generationConfig: {
            temperature: 0,
            maxOutputTokens: 2500,
            responseMimeType: "application/json",
        },
    });

    const prompt = `You are a resume-to-job-description matcher. Return ONLY valid JSON, no markdown, no explanation.

    Schema:
    {
    "matchScore": number,
    "matchedSkills": string[],
    "missingSkills": string[],
    "strengths": string[],
    "improvementSuggestions": string[]
    }

    Rules:
    - First, extract the required skills for THIS specific role from the job description. The role can be from any field — technical, creative, medical, sales, administrative, or anything else. Do not limit extraction to any one category.
    - For each required skill you extract, silently determine whether the resume demonstrates it or not.
    - matchScore MUST be calculated using this exact formula — do not estimate or adjust it:
    matchScore = round((number of matched required skills / total number of required skills) * 100)
    - Do not adjust matchScore based on experience level, seniority, tone, or any factor outside the formula above.
    - Do not invent skills, companies, or experience not present in the resume.
    - When the JD lists alternatives with "or" (e.g. "React, Next.js, or Angular"), satisfying ONE alternative counts as one matched skill — do not list the others as missing.
    - If the resume satisfies none of an "or" group (e.g. "Sass or Tailwind"), count and list it as ONE missing skill, not separate ones.
    - Only extract skills that are concrete, named tools, technologies, frameworks, languages, certifications, or well-established practices (e.g. "React", "Cross-Browser Testing", "Agile", "Phlebotomy", "Cold Calling") — never paraphrase a JD responsibility or duty sentence into a skill label.
    - Do not list a skill as missing if it is a subset or direct implication of a skill already listed as matched (e.g. do not list "JSON" as missing if "RESTful APIs" is already matched).
    - matchedSkills: max 8. missingSkills: max 6.
    - strengths: 2-3 short bullets, each under 12 words.
    - improvementSuggestions: 2-3 short, actionable bullets, each under 15 words.
    
    RESUME:
    ${resumeText}

    JOB DESCRIPTION:
    ${jobDescription}
    `;

    try{
        const result = await model.generateContent(prompt);
        const response = result.response;
        //text in the json format  (Gets the content)
        const text = response.text();
        //anaysis is here js object (converts that content into something JavaScript can work with.)

        let analysis;
        try {
            analysis = JSON.parse(text);
        } catch {
            console.error("Invalid Gemini JSON:", text);
            
            return res.status(502).json({
                message: "Gemini returned an invalid analysis response. Please try again."
            });
        }
        return res.status(200).json(analysis);
    }
    catch(err) {
        console.error("Gemini analysis failed:", err);

        if (err.status === 429) {
            return res.status(429).json({
                message: "AI analysis is temporarily unavailable because the Gemini usage limit has been reached. Please try again later.",
            });
        }

        return res.status(500).json({
            message: "Failed to analyze resume and job description",
        }); 
    }
}