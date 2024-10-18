import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface DatePickerProps {
  label: string;
  handleChange: (value: number) => void;
  value: number;
  minDate?: number;
}

export default function DatePicker({ label, handleChange, minDate }: DatePickerProps) {
  return (
    <MuiDatePicker
      label={label}
      onChange={(value) => handleChange(dayjs(value).valueOf())}
      disableFuture
      referenceDate={dayjs('2021-01-01')}
      minDate={minDate ? dayjs(minDate) : undefined}
    />
  );
}
