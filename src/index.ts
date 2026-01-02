import express from "express";
import type { Request, Response, Express } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
