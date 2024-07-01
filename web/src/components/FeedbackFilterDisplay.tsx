import { useFeedbackFilterContext } from '@/lib/FeedbackFilterContext';
import { FeedbackFilterDisplayItem } from './FeedbackFilterDisplayItem';

export function FeedbackFilterDisplay() {
  const { activeFilters } = useFeedbackFilterContext();
  return (
    <div className="flex row gap-2">
      {activeFilters.map((activeFilter, index) => (
        <FeedbackFilterDisplayItem activeFilter={activeFilter} key={index} />
      ))}
    </div>
  );
}
