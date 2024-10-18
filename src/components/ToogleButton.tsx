import { ToggleButton as MuiToggleButton } from '@mui/material';

interface ToggleButtonProps {
  value: string;
}

export default function ToggleButton({ value }: ToggleButtonProps) {
  return (
    <MuiToggleButton
      value={value}
      disableRipple
      sx={{
        flexGrow: 1,
        px: 3,
        fontSize: '12px',
      }}
    >
      {value}
    </MuiToggleButton>
  );
}
