import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { appError } from "./src/common/helper/appError.helper.js";
import { logAPI } from "./src/common/middleware/log-api.middleware.js";
import rootRouter from "./src/routers/root.router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/common/swagger/init.swagger.js";


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "*" }));

app.use(logAPI);

app.use(express.static("public"));

app.use("/api", rootRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(appError);

const PORT = 3069;
app.listen(PORT, () => {
    console.log(`Server online at port: ${PORT}`);
});