import express from 'express';

import upload from '../../middlewares/upload.middleware.js';
import resumeController from './resume.controller.js';
const router = express.Router();


router.post('/upload',upload.single("resume"), resumeController.uploadResume)
router.get('/:id', resumeController.getResumeBy_Id)
router.post('/:id/analyse' , resumeController.analyseResume)
router.post('/:id/job-match', resumeController.matchJob)
router.get('/:id/matches', resumeController.getMatches)


export default router;

