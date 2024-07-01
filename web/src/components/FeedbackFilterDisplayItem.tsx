import { Separator } from '@/components/ui/separator';
import { useFeedbackFilterContext } from '@/lib/FeedbackFilterContext';
import { Feedback } from '@/lib/hooks';
import { ActiveFilter } from '@/lib/useFeedbackFilter';
import { X } from 'lucide-react';
import { useState } from 'react';
import { RelationPopover } from './RelationPopover';
import { RenderAttribute } from './RenderAttribute';
import { Button } from './ui/button';

type FeedbackFilterDisplayItemProps = {
  activeFilter: ActiveFilter;
};

export function FeedbackFilterDisplayItem({
  activeFilter,
}: FeedbackFilterDisplayItemProps) {
  const [open, setOpen] = useState(false);
  const { updateFilter, removeFilter } = useFeedbackFilterContext();
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
        {formatValue(value, attribute)}
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

function formatValue(value: string, type: keyof Feedback) {
  if (type === 'date') {
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch (error) {
      console.error(error);
      return value;
    }
  }

  return value;
}
