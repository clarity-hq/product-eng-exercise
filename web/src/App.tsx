import { FeedbackDataTable } from "./FeedbackDataTable";
import { FeedbackFilter } from "./FeedbackFilter";
import { useFeedbackFilter, useFeedbackQuery } from "./hooks";

function App() {
  const { filter } = useFeedbackFilter();
  const dataReq = useFeedbackQuery(filter);

  if (dataReq.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 h-4/5">
        <FeedbackFilter />
        <FeedbackDataTable data={dataReq.data!.data} />
      </div>
    </div>
  );
}

export default App;
