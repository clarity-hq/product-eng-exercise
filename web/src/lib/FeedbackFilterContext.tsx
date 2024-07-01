import { createContext, useContext } from 'react';
import {
  UseFeedbackFilterReturn,
  useFeedbackFilter,
} from './useFeedbackFilter';

const FeedbackFilterContext = createContext<
  UseFeedbackFilterReturn | undefined
>(undefined);

function FeedbackFilterProvider({ children }: { children: React.ReactNode }) {
  const feedbackFilter = useFeedbackFilter();

  return (
    <FeedbackFilterContext.Provider value={feedbackFilter}>
      {children}
    </FeedbackFilterContext.Provider>
  );
}

export function useFeedbackFilterContext() {
  const context = useContext(FeedbackFilterContext);
  if (context === undefined) {
    throw new Error(
      'useFeedbackFilterContext must be used within a FeedbackFilterProvider'
    );
  }
  return context;
}

export { FeedbackFilterContext, FeedbackFilterProvider };
