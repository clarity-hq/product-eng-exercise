import { Command } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { filterConfig } from '@/lib/utils';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { DialogContextType, DrilldownKeyType } from './FeedbackFilter';
import { FilterDrilldown } from './FilterDrilldown';
import { FilterSelect } from './FilterSelect';
import { Button } from './ui/button';

type FilterPopoverProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  openDialog: () => void;
  setDialogContext: (val: DialogContextType) => void;
};

export function FilterPopover({
  open,
  setOpen,
  setDialogContext,
  openDialog,
}: FilterPopoverProps) {
  const [drilldownKey, setDrilldownKey] = useState<DrilldownKeyType>(null);

  function onOpenChange(val: boolean) {
    setOpen(val);
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-1 gap-2 h-8 overflow-hidden">
          <ListFilter size="16px" /> <p>Filter</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[204px] p-0 origin-top-left" align="start">
        <Command>
          {drilldownKey ? (
            <FilterDrilldown
              placeholder={filterConfig[drilldownKey].display}
              setOpen={setOpen}
              drilldownKey={drilldownKey}
            />
          ) : (
            <FilterSelect
              setDrilldownKey={setDrilldownKey}
              openDialog={openDialog}
              setDialogContext={setDialogContext}
              setOpen={setOpen}
            />
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
