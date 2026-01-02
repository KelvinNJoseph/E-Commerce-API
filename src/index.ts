import express from "express";
import type { Request, Response, Express } from "express";
import { PORT } from "./secrets.js";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
