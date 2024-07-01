import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Feedback } from '@/lib/hooks';
import { AddFilterType, RemoveFilterType } from '@/lib/useFeedbackFilter';
import { filterConfig } from '@/lib/utils';
import { useState } from 'react';
import { SubfilterItem } from './SubfilterItem';

type FilterDrilldownProps = {
  placeholder: string;
  addFilter: AddFilterType;
  drilldownKey: keyof Feedback;
  setOpen: (val: boolean) => void;
  removeFilter: RemoveFilterType;
};

export function FilterDrilldown({
  placeholder,
  addFilter,
  removeFilter,
  drilldownKey,
  setOpen,
}: FilterDrilldownProps) {
  const [currentFilterId, setCurrentFilterId] = useState<string | null>(null);
  return (
    <>
      <CommandInput placeholder={placeholder} autoFocus />
      <CommandEmpty>No filter found.</CommandEmpty>
      <CommandGroup>
        <CommandList>
          {filterConfig[drilldownKey].subfilters?.map((subfilter) => (
            <SubfilterItem
              onCheckedChange={(checked) => {
                if (checked) {
                  if (currentFilterId) {
                    // TODO: in a perfect world, I'll stack filters.
                    addFilter(drilldownKey, subfilter);
                  } else {
                    const newId = addFilter(drilldownKey, subfilter);
                    setCurrentFilterId(newId);
                  }
                } else {
                  if (currentFilterId) {
                    removeFilter(currentFilterId);
                    setCurrentFilterId(null);
                  }
                }
              }}
              addFilter={addFilter}
              drilldownKey={drilldownKey}
              setOpen={setOpen}
              removeFilter={removeFilter}
              subfilter={subfilter}
            />
          ))}
        </CommandList>
      </CommandGroup>
    </>
  );
}
