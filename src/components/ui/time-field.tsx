import { Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface TimeFieldProps {
  value: number | undefined;
  onChange: (newHour: number | undefined) => void;
}

export function TimeField({ value, onChange }: TimeFieldProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleHourChange = (hour: string) => {
    onChange(parseInt(hour));
  };

  return (
    <div className="flex items-center space-x-2">
      <Clock className="h-4 w-4 text-gray-500" />
      <Select onValueChange={handleHourChange} value={value?.toString()}>
        <SelectTrigger className="w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour.toString()}>
              {hour.toString().padStart(2, '0')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

