import { useMemo, useState } from 'react';
import { AttributeFilter, Feedback, FeedbackFilter } from './hooks';

export type RemoveFilterType = (id: string) => void;
export type UpdateFilterType = (
  id: string,
  newValues: Partial<Pick<ActiveFilter, 'value' | 'relation'>>
) => void;
export type AddFilterType = (
  attribute: keyof Feedback,
  value: Feedback[keyof Feedback]
) => void;

type UseFeedbackFilterReturn = {
  filter: FeedbackFilter;
  activeFilters: ActiveFilter[];
  addFilter: AddFilterType;
  removeFilter: RemoveFilterType;
  updateFilter: UpdateFilterType;
};

export type Relation = 'includes' | 'excludes';
export type ActiveFilter = {
  attribute: keyof Feedback;
  relation: Relation;
  value: Feedback[keyof Feedback];
  id: string;
};

export function useFeedbackFilter(): UseFeedbackFilterReturn {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [currentId, setCurrentId] = useState(0);

  function addFilter(
    attribute: keyof Feedback,
    value: Feedback[keyof Feedback]
  ) {
    const newFilter: ActiveFilter = {
      attribute,
      relation: 'includes',
      value,
      id: `filter-${currentId}`,
    };
    setActiveFilters([...activeFilters, newFilter]);
    setCurrentId(currentId + 1);
  }

  function removeFilter(id: string) {
    setActiveFilters((currentFilters) =>
      currentFilters.filter((filter) => filter.id !== id)
    );
  }

  function updateFilter(
    id: string,
    newValues: Partial<Pick<ActiveFilter, 'value' | 'relation'>>
  ) {
    setActiveFilters((currentFilters) =>
      currentFilters.map((filter) => {
        if (filter.id === id) {
          return { ...filter, ...newValues };
        }
        return filter;
      })
    );
  }
  const filter = useMemo(() => constructFilter(activeFilters), [activeFilters]);
  return {
    filter,
    activeFilters,
    addFilter,
    removeFilter,
    updateFilter,
  };
}

function constructFilter(activeFilters: ActiveFilter[]): FeedbackFilter {
  const filter: FeedbackFilter = {};
  for (const { attribute, relation, value } of activeFilters) {
    if (!filter[attribute]) {
      filter[attribute] = {
        include: [],
        exclude: [],
      };
    }
    const criteria = filter[attribute] as AttributeFilter<
      Feedback[keyof Feedback]
    >;
    if (relation === 'includes') {
      criteria?.include?.push(value);
    } else if (relation === 'excludes') {
      criteria?.exclude?.push(value);
    }
  }
  return filter;
}
