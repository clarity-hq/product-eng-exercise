import { useState } from 'react';

import { Dialog } from '@/components/ui/dialog';
import { AddFilterType, RemoveFilterType } from '@/lib/useFeedbackFilter';
import { Feedback, useKeyTrigger } from '../lib/hooks';
import { FilterDialog } from './FilterDialog';
import { FilterPopover } from './FilterPopover';

type FeedbackFilterProps = {
  addFilter: AddFilterType;
  removeFilter: RemoveFilterType;
};

export type DrilldownKeyType = keyof Feedback | null;
export type DialogContextType = {
  key: keyof Feedback;
  type: 'text' | 'date';
} | null;

export function FeedbackFilter({
  addFilter,
  removeFilter,
}: FeedbackFilterProps) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState<DialogContextType>(null);

  useKeyTrigger({
    key: 'f',
    action: () => setOpen(true),
    active: !open && !dialogOpen,
  });

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <FilterPopover
          open={open}
          setOpen={setOpen}
          addFilter={addFilter}
          removeFilter={removeFilter}
          setDialogContext={setDialogContext}
          openDialog={() => setDialogOpen(true)}
        />
        <FilterDialog
          close={() => setDialogOpen(false)}
          onSubmit={(value: string) => {
            if (!dialogContext) {
              return;
            }

            addFilter(dialogContext.key, value);
            setDialogOpen(false);
            setDialogContext(null);
          }}
          context={dialogContext}
        />
      </Dialog>
    </>
  );
}
