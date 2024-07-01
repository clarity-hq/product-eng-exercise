import { FeedbackDataTable } from './components/FeedbackDataTable';
import { FeedbackFilter } from './components/FeedbackFilter';
import { FeedbackFilterDisplay } from './components/FeedbackFilterDisplay';
import { FeedbackData, useFeedbackQuery } from './lib/hooks';
import {
  ActiveFilter,
  AddFilterType,
  RemoveFilterType,
  UpdateFilterType,
  useFeedbackFilter,
} from './lib/useFeedbackFilter';

function App() {
  const { filter, activeFilters, updateFilter, removeFilter, addFilter } =
    useFeedbackFilter();
  const dataReq = useFeedbackQuery(filter);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 h-4/5 flex flex-col gap-4">
        <h1 className="scroll-m-20 text-4xl tracking-wide lg:text-5xl">
          Feedback
        </h1>
        <FeedbackFiltersSection
          removeFilter={removeFilter}
          addFilter={addFilter}
          updateFilter={updateFilter}
          activeFilters={activeFilters}
        />
        <FeedbackContent
          isLoading={dataReq.isLoading}
          data={dataReq.data?.data}
        />
      </div>
    </div>
  );
}

type FeedbackContentProps = {
  isLoading: boolean;
  data: FeedbackData | undefined;
};

function FeedbackContent({ isLoading, data }: FeedbackContentProps) {
  return isLoading ? <div>Loading...</div> : <FeedbackDataTable data={data!} />;
}

type FeedbackFiltersSectionProps = {
  removeFilter: RemoveFilterType;
  addFilter: AddFilterType;
  updateFilter: UpdateFilterType;
  activeFilters: ActiveFilter[];
};

function FeedbackFiltersSection({
  removeFilter,
  addFilter,
  updateFilter,
  activeFilters,
}: FeedbackFiltersSectionProps) {
  return (
    <div className="flex row items-center gap-3">
      {activeFilters && (
        <FeedbackFilterDisplay
          filters={activeFilters}
          removeFilter={removeFilter}
          updateFilter={updateFilter}
        />
      )}
      <FeedbackFilter addFilter={addFilter} />
    </div>
  );
}

export default App;
