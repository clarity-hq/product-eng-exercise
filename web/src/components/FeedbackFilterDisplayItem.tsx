import { Separator } from '@/components/ui/separator';
import { ActiveFilter } from '@/lib/useFeedbackFilter';
import { X } from 'lucide-react';
import { useState } from 'react';
import { RelationPopover } from './RelationPopover';
import { RenderAttribute } from './RenderAttribute';
import { Button } from './ui/button';

type FeedbackFilterDisplayItemProps = {
  activeFilter: ActiveFilter;
  updateFilter: (
    id: string,
    newValues: Partial<Pick<ActiveFilter, 'value' | 'relation'>>
  ) => void;
  removeFilter: (id: string) => void;
};

export function FeedbackFilterDisplayItem({
  activeFilter,
  updateFilter,
  removeFilter,
}: FeedbackFilterDisplayItemProps) {
  const [open, setOpen] = useState(false);
  const { attribute, value, id } = activeFilter;
  return (
    <div
      className="flex items-center border rounded-md h-8 overflow-hidden"
      key={id}
    >
      <div className="text-xs p-2 py-0">
        <RenderAttribute attributeKey={attribute} />
      </div>
      <Separator orientation="vertical" />
      <RelationPopover
        open={open}
        setOpen={setOpen}
        activeFilter={activeFilter}
        updateFilter={updateFilter}
      />
      <Separator orientation="vertical" />
      <Button variant="ghost" className="rounded-none text-xs p-2">
        {value}
      </Button>
      <Button
        variant="ghost"
        className="rounded-l-none text-xs p-2"
        onClick={() => removeFilter(id)}
      >
        <X size="14px" />
      </Button>
    </div>
  );
}
