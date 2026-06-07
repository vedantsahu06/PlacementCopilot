import express from "express";

import resumeRouter from "./modules/resume/resume.routes.js";
import jdRouter from "./modules/jd/jd.routes.js";
import globalErrorHandler from "./middlewares/error.middleware.js";
import skillGapRouter from "./modules/skillGap/skillGap.routes.js";
import analysisReportRouter from "./modules/analysisReport/analysisReport.routes.js";
const app = express();

app.use(express.json());

app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/jd", jdRouter);
app.use("/api/v1/skill-gap", skillGapRouter);
app.use("/api/v1/analysis-report", analysisReportRouter);
app.use(globalErrorHandler);

export default app;