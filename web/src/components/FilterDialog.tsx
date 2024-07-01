import { useState } from 'react';
import { Button } from './ui/button';
import { DialogContent, DialogFooter, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';

type FilterDialogProps = {
  onSubmit: (value: string) => void;
  close: () => void;
};

export function FilterDialog({ onSubmit, close }: FilterDialogProps) {
  const [input, setInput] = useState('');
  return (
    <DialogContent>
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
        >
          Apply
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
