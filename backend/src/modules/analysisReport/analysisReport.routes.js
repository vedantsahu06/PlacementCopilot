import analysisReportController from "./analysisReport.controller.js";
import express from "express";
import {asyncHandler} from "../../utils/asyncHandler.js";

const router = express.Router();

router.get("/:id", asyncHandler(analysisReportController.getAnalysisReport));

export default router;