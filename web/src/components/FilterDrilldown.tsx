import { Checkbox } from '@/components/ui/checkbox';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Feedback } from '@/lib/hooks';
import { AddFilterType, RemoveFilterType } from '@/lib/useFeedbackFilter';
import { filterConfig } from '@/lib/utils';
import { useState } from 'react';

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
            <CommandItem
              onSelect={() => {
                addFilter(drilldownKey, subfilter);
                setOpen(false);
              }}
              key={subfilter}
            >
              <div className="items-top flex space-x-2">
                <Checkbox
                  id={drilldownKey}
                  onClick={(e) => e.stopPropagation()}
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
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {subfilter}
                  </label>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
    </>
  );
}
