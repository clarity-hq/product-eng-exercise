import { ActiveFilter } from '@/lib/useFeedbackFilter';
import { FeedbackFilterDisplayItem } from './FeedbackFilterDisplayItem';

type FeedbackFilterDisplayProps = {
  filters: ActiveFilter[];
  updateFilter: (
    id: string,
    newValues: Partial<Pick<ActiveFilter, 'value' | 'relation'>>
  ) => void;
  removeFilter: (id: string) => void;
};

// TODO: handle dismissing filters
export function FeedbackFilterDisplay({
  filters,
  updateFilter,
  removeFilter,
}: FeedbackFilterDisplayProps) {
  return (
    <div className="flex row gap-2">
      {filters.map((activeFilter, index) => (
        <FeedbackFilterDisplayItem
          key={index}
          activeFilter={activeFilter}
          updateFilter={updateFilter}
          removeFilter={removeFilter}
        />
      ))}
    </div>
  );
}
