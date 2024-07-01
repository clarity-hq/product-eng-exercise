import { useFeedbackFilterContext } from '@/lib/FeedbackFilterContext';
import { FeedbackFilter } from './FeedbackFilter';
import { FeedbackFilterDisplay } from './FeedbackFilterDisplay';

export function FeedbackFiltersSection() {
  const { removeFilter, activeFilters, updateFilter } =
    useFeedbackFilterContext();
  return (
    <div className="flex row items-center gap-3">
      <FeedbackFilter />
      {activeFilters && <FeedbackFilterDisplay />}
    </div>
  );
}
