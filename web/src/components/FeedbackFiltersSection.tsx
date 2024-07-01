import {
  ActiveFilter,
  AddFilterType,
  RemoveFilterType,
  UpdateFilterType,
} from '@/lib/useFeedbackFilter';
import { FeedbackFilter } from './FeedbackFilter';
import { FeedbackFilterDisplay } from './FeedbackFilterDisplay';

type FeedbackFiltersSectionProps = {
  removeFilter: RemoveFilterType;
  addFilter: AddFilterType;
  updateFilter: UpdateFilterType;
  activeFilters: ActiveFilter[];
};

export function FeedbackFiltersSection({
  removeFilter,
  addFilter,
  updateFilter,
  activeFilters,
}: FeedbackFiltersSectionProps) {
  return (
    <div className="flex row items-center gap-3">
      <FeedbackFilter addFilter={addFilter} removeFilter={removeFilter} />
      {activeFilters && (
        <FeedbackFilterDisplay
          filters={activeFilters}
          removeFilter={removeFilter}
          updateFilter={updateFilter}
        />
      )}
    </div>
  );
}
