import express from 'express';

import upload from '../../middlewares/upload.middleware.js';
import resumeController from './resume.controller.js';
import {asyncHandler} from "../../utils/asyncHandler.js";

const router = express.Router();


router.post('/upload',upload.single("resume"), asyncHandler(resumeController.uploadResume))
router.get('/:id', asyncHandler(resumeController.getResumeBy_Id))
router.post('/:id/analyse' , asyncHandler(resumeController.analyseResume))
router.post('/:id/job-match', asyncHandler(resumeController.matchJob))
router.get('/:id/matches', asyncHandler(resumeController.getMatches))


export default router;

