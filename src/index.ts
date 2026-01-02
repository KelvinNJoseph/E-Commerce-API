import express from "express";
import type { Request, Response, Express } from "express";
import { PORT } from "./secrets.js";
import rootRouter from "./routes/index.js";
import  { PrismaClient }  from "./generated/prisma/client.js";


const app: Express = express();

app.use(express.json());

app.use('/api/v1', rootRouter)

export const prismaClient = new PrismaClient({
  // accelerateUrl: "none",
  log: ["query"],
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
