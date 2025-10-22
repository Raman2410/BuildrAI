

// controller for ai

import { response } from "express";
import Resume from "../models/Resume.js";
import openai from "../configs/ai.js";


export const enhanceSummary = async (req, res) => {
  console.log("✅ AI Enhance API called");
  console.log("🧠 Request body:", req.body);

  try {
    const { userContent } = req.body;
    if (!userContent) {
      console.warn("⚠️ Missing userContent in request");
      return res.status(400).json({ message: "missing required fields" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return plain text.",
        },
        { role: "user", content: userContent },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    console.log("✅ OpenAI response received");
    res.status(200).json({ enhanceContent });
  } catch (error) {
    console.error("❌ AI Enhance API Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};


// enhancejob decription

export const enhanceDescription = async(req,res)=>{
    try {
         const {userContent} = req.body;
         if(!userContent){
            return res.status(400).json({message:"missing required fields"});

         }

  const response =  await openai.chat.completions.create({
             model: process.env.OPENAI_MODEL,
    messages: [
        { role: "system", content: "You are a expert in resume writing.Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options a or anything else." },
        {
            role: "user",
            content: userContent,
        },
    ],
         }) 

         const enhanceContent = response.choices[0].message.content;
       return  res.status(200).json({enhanceContent});

           } catch (error) {
        return res.status(400).json({message:error.message});
    }
}
// uploading a resume to the database


export const uploadResume = async(req,res)=>{
    try {
          const {resumeText ,title} = req.body;
          const userId = req.userId;
          
          if(!resumeText){
             return res.status(400).json({message:"missing required fields"});
          }

          const systemPrompt = "You are an expert AI Agent to extract data from resume";

          const userPrompt = `extract data from this resume: ${resumeText}
          Provide data in the following JSON format with no additional text before and after:
          {
           professional_summary:{
        type: String,
        default: ''
    },
    skills:[{type: String}],
    personal_info:{
        image:{
            type: String,
            default: ''
        },
        full_name:{
            type: String,
            default: ''
        },
        profession:{
            type: String,
            default: ''
        },
        email:{
            type: String,
            default: ''
        },
        phone:{
            type: String,
            default: ''
        },
        location:{
            type: String,
            default: ''
        },
        linkedin:{
            type: String,
            default: ''
        },
        website:{
            type: String,
            default: ''
        }
    },
    experience:[{
        company:{type:String},
        position:{type:String},
        start_date:{type:String},
        end_date:{type:String},
        description:{type:String},
        is_current:{type:Boolean}

    }],
    project:[{
        name:{type:String},
        type:{type:String},
        description:{type:String},
    }],
     education:[{
        institution:{type:String},
        degree:{type:String},
        field:{type:String},
        graduation_date:{type:String},
        gpa:{type:String},

    }]}`


  const response =  await openai.chat.completions.create({
             model: process.env.OPENAI_MODEL,
    messages: [
        { role: "system", content: systemPrompt },
        {
            role: "user",
            content: userPrompt,
        },
    ],
    response_format: {type:'json_object'}
         }) 

         const extractData = response.choices[0].message.content;
         const parsedData = JSON.parse(extractData);
         const newResume = await Resume.create({userId,title,...parsedData})
         res.json({resumeId : newResume._id});

           } catch (error) {
        return res.status(400).json({message:error.message});
    }
}