import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import json from "./data.json";

type Feedback = {
  id: number;
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
router.post("/groups", groupHandler);

const feedback: FeedbackData = json as any;

function queryHandler(req: Request, res: Response<{ data: FeedbackData }>) {
  const body = req;

  /**
   * TODO(part-1): Implement query handling
   */

  res.status(200).json({ data: feedback });
}

type FeedbackGroup = {
  name: string;
  feedback: Feedback[];
};

async function groupHandler(
  req: Request,
  res: Response<{ data: FeedbackGroup[] }>
) {
  const body = req;

  /**
   * TODO(part-2): Implement filtering + grouping
   */

  const pythonRes = await fetch("http://127.0.0.1:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ feedback }),
  });

  const pythonData = (await pythonRes.json()) as { feedback: Feedback[] };

  res.status(200).json({
    data: [
      {
        name: "All feedback",
        feedback: pythonData.feedback,
      },
    ],
  });
}
