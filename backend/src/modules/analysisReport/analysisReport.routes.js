import analysisReportController from "./analysisReport.controller.js";
import express from "express";

const router = express.Router();

router.get("/:id", analysisReportController.getAnalysisReport);

export default router;