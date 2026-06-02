import express from 'express';

import upload from '../../middlewares/upload.middleware.js';
import resumeController from './resume.controller.js';
const router = express.Router();


router.post('/upload',upload.single("resume"), resumeController.uploadResume)

export default router;

