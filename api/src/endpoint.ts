import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import json from './data.json';

type Feedback = {
  name: string;
  description: string;
  importance: 'High' | 'Medium' | 'Low';
  type: 'Sales' | 'Customer' | 'Research';
  customer: 'Loom' | 'Ramp' | 'Brex' | 'Vanta' | 'Notion' | 'Linear' | 'OpenAI';
  date: string;
};

type FeedbackData = Feedback[];

type AttributeGranularFilter<T> = T[];
type AttributeFilter<T> = {
  include?: AttributeGranularFilter<T>;
  exclude?: AttributeGranularFilter<T>;
};
type FeedbackFilter = {
  name?: AttributeFilter<string>;
  description?: AttributeFilter<string>;
  importance?: AttributeFilter<'High' | 'Medium' | 'Low'>;
  type?: AttributeFilter<'Sales' | 'Customer' | 'Research'>;
  customer?: AttributeFilter<
    'Loom' | 'Ramp' | 'Brex' | 'Vanta' | 'Notion' | 'Linear' | 'OpenAI'
  >;
  date?: AttributeFilter<string>;
};

export const router = express.Router();
router.use(bodyParser.json());

router.post('/query', queryHandler);

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
      const filterItem = filter[attributeKey];

      if (!filterItem) {
        return true;
      }
      const { include, exclude } = filterItem;
      const feedbackValue = feedback[attributeKey];

      const includeCheck =
        ignoreFilter(include) ||
        include?.some((includedValue) =>
          matches(attributeKey, feedbackValue, includedValue)
        );
      const excludeCheck =
        ignoreFilter(exclude) ||
        !exclude?.every((excludedValue) =>
          matches(attributeKey, feedbackValue, excludedValue)
        );

      return includeCheck && excludeCheck;
    })
  );
}

function ignoreFilter(filter?: AttributeGranularFilter<any>) {
  return !filter || filter.length === 0;
}

function matches(
  attributeKey: string,
  value: string,
  comparison: string
): boolean {
  const softMatch = ['name', 'description'].includes(attributeKey);

  if (attributeKey === 'date') {
    const valueDate = new Date(value);
    const comparisonDate = new Date(comparison);
    // matches dates, ignoring times
    return (
      valueDate.toISOString().slice(0, 10) ===
      comparisonDate.toISOString().slice(0, 10)
    );
  } else if (softMatch) {
    return value.toLowerCase().includes(comparison.toLowerCase());
  } else {
    return value.toLowerCase() === comparison.toLowerCase();
  }
}
