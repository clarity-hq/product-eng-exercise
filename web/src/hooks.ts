import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Feedback = {
  name: string;
  description: string;
  importance: "High" | "Medium" | "Low";
  type: "Sales" | "Customer" | "Research";
  customer: "Loom" | "Ramp" | "Brex" | "Vanta" | "Notion" | "Linear" | "OpenAI";
  date: string;
};

export type FeedbackFilter = Partial<Feedback>;
export type FeedbackData = Feedback[];

export function useFeedbackQuery(query: FeedbackFilter) {
  return useQuery<{ data: FeedbackData }>({
    queryFn: async () => {
      const res = await fetch("http://localhost:5001/query", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        method: "POST",
      });

      return res.json();
    },
    // The query key is used to cache responses and should represent
    // the parameters of the query.
    queryKey: ["data"],
  });
}

export function useFeedbackFilter() {
  const [filter, setFilter] = useState<FeedbackFilter>({
    name: "Improve",
    customer: "Ramp",
  });
  return {
    filter,
  };
}
