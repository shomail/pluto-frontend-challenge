import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface ProgressBarProps extends LinearProgressProps {
  value: number;
  label: string;
  barColor: string;
  onToggle: () => void;
}

export default function ProgressBar({ barColor, onToggle, ...props }: ProgressBarProps) {
  const [show, setShow] = useState(false);

  const handleToggleVisibility = () => {
    setShow((prev) => !prev);
    onToggle();
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box sx={{ minWidth: 35, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            backgroundColor: barColor,
            borderRadius: '50%',
            display: 'inline-block',
            mr: 1,
          }}
        />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {props.label}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            borderRadius: 10,
            height: 5,
            backgroundColor: '#eeeeee',
            '& .MuiLinearProgress-bar': {
              backgroundColor: barColor,
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <IconButton size="small" sx={{ ml: 1 }} onClick={handleToggleVisibility}>
        {show ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
      </IconButton>
    </Box>
  );
}
