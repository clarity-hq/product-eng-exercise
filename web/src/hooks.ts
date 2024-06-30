import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type Feedback = {
  name: string;
  description: string;
  importance: 'High' | 'Medium' | 'Low';
  type: 'Sales' | 'Customer' | 'Research';
  customer: 'Loom' | 'Ramp' | 'Brex' | 'Vanta' | 'Notion' | 'Linear' | 'OpenAI';
  date: string;
};

// TODO: need to handle exclude/include
export type FeedbackFilter = Partial<Feedback>;
export type FeedbackData = Feedback[];

export function useFeedbackQuery(query: FeedbackFilter) {
  return useQuery<{ data: FeedbackData }>({
    queryFn: async () => {
      const res = await fetch('http://localhost:5001/query', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        method: 'POST',
      });

      return res.json();
    },
    // The query key is used to cache responses and should represent
    // the parameters of the query.
    queryKey: ['data', query],
  });
}

type UseFeedbackFilterReturn = {
  filter: FeedbackFilter;
  addFilter: (key: string, value: string) => void;
};

export function useFeedbackFilter(): UseFeedbackFilterReturn {
  const [filter, setFilter] = useState<FeedbackFilter>({});

  function addFilter(key: string, value: string) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  }

  return {
    filter,
    addFilter,
  };
}

type UseKeyTriggerProps = {
  key: string;
  action: () => void;
  active: boolean;
};

export function useKeyTrigger({ key, action, active }: UseKeyTriggerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key && active) {
        event.preventDefault();
        event.stopPropagation();
        action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, key, action]);
}
