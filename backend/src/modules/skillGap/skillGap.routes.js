import express from "express";
import skillGapController from "./skillGap.controller.js";
import {asyncHandler} from "../../utils/asyncHandler.js";

const router = express.Router();

router.post('/analyse/:id', asyncHandler(skillGapController.analyseSkillGapController));
export default router;