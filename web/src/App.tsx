import { FeedbackDataTable } from "./FeedbackDataTable";
import { useFeedbackQuery } from "./hooks";

function App() {
  /**
   * TODO: Add filter options
   */

  const dataReq = useFeedbackQuery({
    _: "Update this object to pass data to the /query endpoint.",
  });

  if (dataReq.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 h-4/5">
        <FeedbackDataTable data={dataReq.data!.data} />
      </div>
    </div>
  );
}

export default App;
