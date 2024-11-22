import cors, { type CorsOptions } from "cors";
import express from "express";
import { apiRouter } from "../router/api-router";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiStorageRouter } from "../router/api-storage-router";
import { apiStaticStorageFileRouter } from "../router/api-static-stroage-file-route";

const web = express();

const whitelist: string[] = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials if needed
  optionsSuccessStatus: 200, // For legacy browser support
};

web.use(cors(corsOptions));
web.use(express.json());
web.use(apiRouter);
web.use(apiStorageRouter);
web.use(apiStaticStorageFileRouter);
web.use(errorMiddleware);

export { web };
