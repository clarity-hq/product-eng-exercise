import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export type Feedback = {
  name: string;
  description: string;
  importance: 'High' | 'Medium' | 'Low';
  type: 'Sales' | 'Customer' | 'Research';
  customer: 'Loom' | 'Ramp' | 'Brex' | 'Vanta' | 'Notion' | 'Linear' | 'OpenAI';
  date: string;
};

type AttributeGranularFilter<T> = T[];
export type AttributeFilter<T> = {
  include?: AttributeGranularFilter<T>;
  exclude?: AttributeGranularFilter<T>;
};
export type FeedbackFilter = {
  name?: AttributeFilter<string>;
  description?: AttributeFilter<string>;
  importance?: AttributeFilter<'High' | 'Medium' | 'Low'>;
  type?: AttributeFilter<'Sales' | 'Customer' | 'Research'>;
  customer?: AttributeFilter<
    'Loom' | 'Ramp' | 'Brex' | 'Vanta' | 'Notion' | 'Linear' | 'OpenAI'
  >;
  date?: AttributeFilter<string>;
};
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
    queryKey: ['data', JSON.stringify(query)],
  });
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
