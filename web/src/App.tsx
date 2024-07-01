import { FeedbackContent } from './components/FeedbackContent';
import { FeedbackFiltersSection } from './components/FeedbackFiltersSection';
import { useFeedbackQuery } from './lib/hooks';
import { useFeedbackFilter } from './lib/useFeedbackFilter';

function App() {
  const {
    filter,
    activeFilters,
    updateFilter,
    removeFilter,
    addFilter,
    clearFilters,
  } = useFeedbackFilter();
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
          clearFilters={clearFilters}
          isLoading={dataReq.isLoading}
          data={dataReq.data?.data}
        />
      </div>
    </div>
  );
}

export default App;
