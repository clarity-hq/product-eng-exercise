import { FeedbackDataTable } from './FeedbackDataTable';
import { FeedbackFilter } from './FeedbackFilter';
import { FeedbackFilterDisplay } from './FeedbackFilterDisplay';
import { useFeedbackFilter, useFeedbackQuery } from './hooks';

function App() {
  const { filter, addFilter } = useFeedbackFilter();
  const dataReq = useFeedbackQuery(filter);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 h-4/5">
        <FeedbackFilterDisplay filters={filter} />
        <FeedbackFilter addFilter={addFilter} />
        {dataReq.isLoading ? (
          <div>Loading...</div>
        ) : (
          <FeedbackDataTable data={dataReq.data!.data} />
        )}
      </div>
    </div>
  );
}

export default App;
