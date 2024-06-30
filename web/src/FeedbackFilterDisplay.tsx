import { FeedbackFilter } from './hooks';

type FeedbackFilterDisplayProps = {
  filters: FeedbackFilter;
};

// TODO: handle dismissing filters
export function FeedbackFilterDisplay({ filters }: FeedbackFilterDisplayProps) {
  console.log('filters', filters);
  return <>xyz filter</>;
}
