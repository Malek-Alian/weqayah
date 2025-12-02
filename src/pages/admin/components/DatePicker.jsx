import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

const DatePicker = ({
  sectionKey,
  field,
  value,
  label,
  isOpen,
  onOpenChange,
  onDateChange,
}) => {
  return (
    <div>
      <Label className='text-sm font-medium text-gray-700'>{label}</Label>
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full justify-start text-left font-normal mt-1'
          >
            <Calendar className='mr-2 h-4 w-4' />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <CalendarComponent
            mode='single'
            selected={value}
            onSelect={(date) => {
              if (date) {
                onDateChange(sectionKey, field, date);
                onOpenChange(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
