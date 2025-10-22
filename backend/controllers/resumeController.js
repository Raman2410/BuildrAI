import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// controller for creating new resume
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });
    // return success
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

// for deleting a resume

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    //   delete resume
    await Resume.findOneAndDelete({ userId, _id: resumeId });
    // return success
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

// get usre resume by id:

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    //   delete resume
    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // return success
    return res.status(200).json({ resume });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

// get resume by id public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

// updating for resume:

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;

    if(typeof resumeData === "string"){
    resumeDataCopy = await  JSON.parse(resumeData);}
    else{
      resumeDataCopy = structuredClone(resumeData);                
    }

    if (image) {


        const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.jpg",
        folder:'user-resumes',
        transformation:{
            pre:'w-300,h-300,fo-face,z-0.75' +(removeBackground ? 'e-bgremove' : "")
        }
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};
