'use client';

import { useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ListFilter } from 'lucide-react';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
import { Input } from './components/ui/input';
import { useKeyTrigger } from './hooks';

const filters = [
  {
    key: 'content',
    value: 'Content',
    triggerDialog: true,
  },
  {
    key: 'importance',
    value: 'Importance',
  },
  {
    type: 'type',
    value: 'Type',
  },
  {
    customer: 'customer',
    value: 'Customer',
  },
  {
    type: 'date',
    value: 'Date',
  },
];

interface SubFilters {
  Importance: string[];
  Type: string[];
  Customer: string[];
}

const subFilters: SubFilters = {
  Importance: ['High', 'Medium', 'Low'],
  Type: ['Sales', 'Customer', 'Research'],
  Customer: ['Loom', 'Ramp', 'Brex', 'Vanta', 'Notion', 'Linear', 'OpenAI'],
};

type FeedbackFilterProps = {
  addFilter: (key: string, value: string) => void;
};

export function FeedbackFilter({ addFilter }: FeedbackFilterProps) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInput, setDialogInput] = useState('');
  const [drilldownKey, setDrilldownKey] = useState('');

  useKeyTrigger({
    key: 'f',
    action: () => setOpen(true),
    active: !open && !dialogOpen,
  });

  function onOpenChangeDialog(open: boolean) {
    setDialogOpen(open);
    setDialogInput('');
  }

  function onOpenChangePopover(open: boolean) {
    setOpen(open);
    setDialogInput('');
    setDrilldownKey('');
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={onOpenChangeDialog}>
        <Popover open={open} onOpenChange={onOpenChangePopover}>
          <PopoverTrigger asChild>
            <ListFilter />
          </PopoverTrigger>
          <PopoverContent className="w-[204px] p-0" align="start">
            <Command>
              {drilldownKey && isValidKey(drilldownKey, subFilters) ? (
                <>
                  <CommandInput placeholder={drilldownKey} />
                  <CommandEmpty>No filter found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {subFilters[drilldownKey].map((subfilter) => (
                        <CommandItem
                          onSelect={() => {
                            // TODO: this is hacky
                            addFilter(drilldownKey.toLowerCase(), subfilter);
                            setOpen(false);
                          }}
                          onTouchMove={() => console.log('touch move!')}
                          key={subfilter}
                        >
                          <div className="items-top flex space-x-2">
                            <Checkbox
                              id={drilldownKey}
                              onClick={(e) => e.stopPropagation()}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  // TODO: add filter
                                  addFilter(
                                    drilldownKey.toLowerCase(),
                                    subfilter
                                  );
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
              ) : (
                <>
                  <CommandInput placeholder={'Filter...'} shortcut={'F'} />
                  <CommandEmpty>No filter found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {filters.map((filter) => (
                        <CommandItem
                          key={filter.value}
                          value={filter.value}
                          onSelect={(selectedFilter) => {
                            if (filter.triggerDialog) {
                              setDialogOpen(true);
                              setOpen(false);
                            } else if (
                              Object.keys(subFilters).includes(selectedFilter)
                            ) {
                              console.log("let's drill down here");
                              setDrilldownKey(selectedFilter);
                            } else {
                              console.log('selected', selectedFilter);
                              setOpen(false);
                            }
                          }}
                        >
                          {filter.value}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </>
              )}
            </Command>
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <p>Filter by content...</p>
          </DialogHeader>
          <Input onChange={(e) => setDialogInput(e.target.value)} />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // TODO: apply content filter
                console.log('apply content filter', dialogInput);
              }}
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function isValidKey(key: string, object: SubFilters): key is keyof SubFilters {
  return key in object;
}
