import express from "express";

import resumeRouter from "./modules/resume/resume.routes.js";
import jdRouter from "./modules/jd/jd.routes.js";
import globalErrorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/jd", jdRouter);

app.use(globalErrorHandler);

export default app;