import express from "express";
import skillGapController from "./skillGap.controller.js";
const router = express.Router();

router.post('/analyse/:id', skillGapController.analyseSkillGapController);
export default router;