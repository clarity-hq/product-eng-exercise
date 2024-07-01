import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { useFeedbackFilterContext } from '@/lib/FeedbackFilterContext';
import { Feedback } from '@/lib/hooks';
import { filterConfig } from '@/lib/utils';
import { useState } from 'react';
import { SubfilterItem } from './SubfilterItem';

type FilterDrilldownProps = {
  placeholder: string;
  drilldownKey: keyof Feedback;
  setOpen: (val: boolean) => void;
};

export function FilterDrilldown({
  placeholder,
  drilldownKey,
  setOpen,
}: FilterDrilldownProps) {
  const { addFilter, removeFilter } = useFeedbackFilterContext();
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
              drilldownKey={drilldownKey}
              setOpen={setOpen}
              subfilter={subfilter}
            />
          ))}
        </CommandList>
      </CommandGroup>
    </>
  );
}
