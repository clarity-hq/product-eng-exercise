import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DialogContextType } from './FeedbackFilter';
import { Calendar } from './ui/calendar';
import { DialogContent, DialogFooter, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';

type FilterDialogProps = {
  onSubmit: (value: string) => void;
  close: () => void;
  context: DialogContextType;
};

export function FilterDialog({ onSubmit, close, context }: FilterDialogProps) {
  const [date, setDate] = useState<Date>();
  const [input, setInput] = useState('');
  return (
    <DialogContent>
      {context?.type === 'text' ? (
        <>
          <DialogTitle>Filter by content...</DialogTitle>
          <Input onChange={(e) => setInput(e.target.value)} />
          <DialogFooter>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSubmit(input);
              }}
              disabled={!input}
            >
              Apply
            </Button>
          </DialogFooter>
        </>
      ) : (
        <div className="flex w-full flex-col">
          <DialogTitle>Filter by date...</DialogTitle>
          <div className="flex w-full justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                if (date) {
                  onSubmit(date?.toISOString());
                }
              }}
              disabled={!date}
            >
              Apply
            </Button>
          </DialogFooter>
        </div>
      )}
    </DialogContent>
  );
}
