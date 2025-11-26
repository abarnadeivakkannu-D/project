import UploadModel from "../model/upload.model.js";

// Upload file
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const newUpload = await UploadModel.create({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });

        res.status(200).json({
            message: "File uploaded successfully",
            data: newUpload
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Fetch all upload records
export const getAllUploads = async (req, res) => {
    try {
        const uploads = await UploadModel.findAll();
        res.status(200).json(uploads);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
