import { Checkbox } from '@/components/ui/checkbox';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Feedback } from '@/lib/hooks';
import { AddFilterType } from '@/lib/useFeedbackFilter';
import { filterConfig } from '@/lib/utils';

type FilterDrilldownProps = {
  placeholder: string;
  addFilter: AddFilterType;
  drilldownKey: keyof Feedback;
  setOpen: (val: boolean) => void;
};

export function FilterDrilldown({
  placeholder,
  addFilter,
  drilldownKey,
  setOpen,
}: FilterDrilldownProps) {
  return (
    <>
      <CommandInput placeholder={placeholder} autoFocus />
      <CommandEmpty>No filter found.</CommandEmpty>
      <CommandGroup>
        <CommandList>
          {filterConfig[drilldownKey].subfilters?.map((subfilter) => (
            <CommandItem
              onSelect={() => {
                // TODO: this is hacky
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
                      addFilter(drilldownKey, subfilter);
                    } else {
                      // TODO: remove filter
                      console.log('remove filter');
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
