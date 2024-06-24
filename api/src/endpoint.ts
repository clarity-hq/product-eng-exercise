import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import json from "./data.json";

type Feedback = {
  name: string;
  description: string;
  importance: "High" | "Medium" | "Low";
  type: "Sales" | "Customer" | "Research";
  customer: "Loom" | "Ramp" | "Brex" | "Vanta" | "Notion" | "Linear" | "OpenAI";
  date: string;
};

type FeedbackData = Feedback[];

export const router = express.Router();
router.use(bodyParser.json());

router.post("/query", queryHandler);

function queryHandler(req: Request, res: Response<{ data: FeedbackData }>) {
  const data: FeedbackData = json as any;
  const body = req;

  /**
   * TODO: Implement query handling
   */

  res.status(200).json({ data });
}
