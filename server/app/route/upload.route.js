import express from "express";
import upload from "../middleware/upload.js";
import {
    uploadFile,
    getAllUploads
} from "../controller/upload.controller.js";

const router = express.Router();

router.get("/", getAllUploads);
router.post("/", upload.single("file"), uploadFile);

export default router;
