import { Checkbox } from '@/components/ui/checkbox';
import { CommandItem } from '@/components/ui/command';
import { useFeedbackFilterContext } from '@/lib/FeedbackFilterContext';
import { Feedback } from '@/lib/hooks';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useState } from 'react';

type SubfilterItemProps = {
  drilldownKey: keyof Feedback;
  setOpen: (val: boolean) => void;
  onCheckedChange: (checked: CheckedState) => void;
  subfilter: string;
};

export function SubfilterItem({
  setOpen,
  drilldownKey,
  onCheckedChange,
  subfilter,
}: SubfilterItemProps) {
  const { addFilter } = useFeedbackFilterContext();
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
          className={`${
            isChecked ? 'opacity-100' : 'opacity-0'
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
