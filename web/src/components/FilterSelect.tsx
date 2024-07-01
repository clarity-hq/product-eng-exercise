import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Feedback } from '@/lib/hooks';
import { filterConfig } from '@/lib/utils';
import { DialogContextType, DrilldownKeyType } from './FeedbackFilter';

type FilterSelectProps = {
  setDrilldownKey: (val: DrilldownKeyType) => void;
  openDialog: () => void;
  setOpen: (val: boolean) => void;
  setDialogContext: (val: DialogContextType) => void;
};

export function FilterSelect({
  setDrilldownKey,
  openDialog,
  setOpen,
  setDialogContext,
}: FilterSelectProps) {
  return (
    <>
      <CommandInput placeholder={'Filter...'} shortcut={'F'} />
      <CommandEmpty>No filter found.</CommandEmpty>
      <CommandGroup>
        <CommandList>
          {Object.keys(filterConfig).map((filter) => {
            const display = filterConfig[filter as keyof Feedback];
            return (
              <CommandItem
                key={filter}
                value={filter}
                onSelect={(selectedFilter) => {
                  // TODO: this needs tons of cleanup
                  const cleanedFilter =
                    selectedFilter.toLowerCase() as keyof Feedback;
                  if (display.triggerDialog) {
                    setDialogContext({
                      key: cleanedFilter as keyof Feedback,
                      type: display.triggerDialog,
                    });
                    openDialog();
                    setOpen(false);
                  } else if (display.subfilters) {
                    setDrilldownKey(cleanedFilter as keyof Feedback);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                <div className="flex gap-2 items-center">
                  <display.icon size="12px" />
                  {display.display}
                </div>
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandGroup>
    </>
  );
}
