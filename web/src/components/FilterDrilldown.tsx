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
import { CheckedState } from '@radix-ui/react-checkbox';
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

type SubfilterItemProps = {
  addFilter: AddFilterType;
  drilldownKey: keyof Feedback;
  setOpen: (val: boolean) => void;
  removeFilter: RemoveFilterType;
  onCheckedChange: (checked: CheckedState) => void;
  subfilter: string;
};

function SubfilterItem({
  addFilter,
  setOpen,
  drilldownKey,
  onCheckedChange,
  subfilter,
}: SubfilterItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CommandItem
      className="group"
      onSelect={() => {
        addFilter(drilldownKey, subfilter);
        setOpen(false);
      }}
      key={subfilter}
    >
      <div className="items-top flex space-x-2">
        <Checkbox
          className={`transition-all duration-75 ease-in-out transform scale-60 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${
            isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-60'
          } group-hover:opacity-100`}
          id={drilldownKey}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={(checked) => {
            setIsChecked(checked === true);
            onCheckedChange(checked);
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
  );
}
