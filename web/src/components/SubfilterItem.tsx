import { Checkbox } from '@/components/ui/checkbox';
import { Feedback } from '@/lib/hooks';
import { AddFilterType, RemoveFilterType } from '@/lib/useFeedbackFilter';
import { CheckedState } from '@radix-ui/react-checkbox';
import { CommandItem } from 'cmdk';
import { useState } from 'react';

type SubfilterItemProps = {
  addFilter: AddFilterType;
  drilldownKey: keyof Feedback;
  setOpen: (val: boolean) => void;
  removeFilter: RemoveFilterType;
  onCheckedChange: (checked: CheckedState) => void;
  subfilter: string;
};

export function SubfilterItem({
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
