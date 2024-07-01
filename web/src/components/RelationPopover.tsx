import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ActiveFilter,
  Relation,
  UpdateFilterType,
} from '@/lib/useFeedbackFilter';
import { filterConfig } from '@/lib/utils';
import { Button } from './ui/button';

type RelationPopoverProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  activeFilter: ActiveFilter;
  updateFilter: UpdateFilterType;
};

export function RelationPopover({
  open,
  setOpen,
  activeFilter,
  updateFilter,
}: RelationPopoverProps) {
  const config = filterConfig[activeFilter.attribute];
  const relations = config.relations;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant="ghost" className="rounded-none text-xs px-2">
          {relations[activeFilter.relation]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[204px] p-0 origin-top-left" align="start">
        <Command>
          <CommandGroup>
            <CommandList>
              {Object.keys(relations).map((relation) => (
                <CommandItem
                  key={relation}
                  className="text-xs gap-2"
                  onSelect={() => {
                    updateFilter(activeFilter.id, {
                      relation: relation as Relation,
                    });
                    setOpen(false);
                  }}
                >
                  {/* <relation.icon size="12px" /> */}
                  <p>{relations[relation as Relation]}</p>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
