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
type FeedbackFilter = Partial<Feedback>;

export const router = express.Router();
router.use(bodyParser.json());

router.post("/query", queryHandler);

function queryHandler(req: Request, res: Response<{ data: FeedbackData }>) {
  const data: FeedbackData = json as any;
  const query: FeedbackFilter = req.body.query;

  const filteredData = filterData(data, query);

  res.status(200).json({ data: filteredData });
}

function filterData(data: FeedbackData, filter: FeedbackFilter): FeedbackData {
  return data.filter((feedback) =>
    Object.keys(filter).every((key) => {
      const attributeKey = key as keyof Feedback;
      const feedbackAttribute = feedback[attributeKey];
      const filterItem = filter[attributeKey];

      if (filterItem === undefined) {
        return true;
      }

      // partial matches
      if (attributeKey === "name" || attributeKey === "description") {
        return feedbackAttribute
          .toLowerCase()
          .includes(filterItem.toLocaleLowerCase());
      }

      // full match
      return feedbackAttribute === filterItem;
    })
  );
}
