import { FeedbackData } from '@/lib/hooks';
import { FeedbackDataTable } from './FeedbackDataTable';
import { Button } from './ui/button';

type FeedbackContentProps = {
  isLoading: boolean;
  data: FeedbackData | undefined;
  clearFilters: () => void;
};

export function FeedbackContent({
  isLoading,
  data,
  clearFilters,
}: FeedbackContentProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col w-full items-center gap-4 p-10 border">
        <h3 className="text-2xl font-semibold tracking-tight">Loading...</h3>
      </div>
    );
  }

  if (data!.length === 0) {
    return (
      <div className="flex flex-col w-full items-center gap-4 p-10 border">
        <h3 className="text-2xl font-semibold tracking-tight">
          No feedback matching the filters
        </h3>
        <Button onClick={clearFilters} variant={'secondary'}>
          Clear filters
        </Button>
      </div>
    );
  }

  return <FeedbackDataTable data={data!} />;
}
