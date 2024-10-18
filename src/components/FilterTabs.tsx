import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ProgressBar from './ProgressBar';
import { DamagePointFilter, DamageType } from '../types';
import ToggleButton from './ToogleButton';

interface FilterTabsProps {
  points: 0 | DamageType;
  handleDamagePointFilterChange: (damagePointFilter: DamagePointFilter) => void;
}

export default function FilterTabs({ points, handleDamagePointFilterChange }: FilterTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
          <Tab label="Skader" />
          <Tab label="Inventar" disabled />
        </Tabs>
      </Box>
      {value === 0 && (
        <Box sx={{ mt: 3, width: '100%' }}>
          <ToggleButtonGroup color="primary" value="point" exclusive aria-label="Platform" sx={{ display: 'flex' }}>
            <ToggleButton value="Point" />
            <ToggleButton value="Kategorier" />
            <ToggleButton value="Akutte huller" />
          </ToggleButtonGroup>

          <Box sx={{ mt: 3 }}>
            {points ? (
              <>
                <ProgressBar
                  onToggle={() => handleDamagePointFilterChange({ point: 1, classNames: points[1].classNames })}
                  value={points[1].score}
                  label="1"
                  barColor="#00FF01"
                />
                <ProgressBar
                  onToggle={() => handleDamagePointFilterChange({ point: 2, classNames: points[2].classNames })}
                  value={points[2].score}
                  label="2"
                  barColor="rgb(53, 175, 109)"
                />
                <ProgressBar
                  onToggle={() => handleDamagePointFilterChange({ point: 3, classNames: points[3].classNames })}
                  value={points[3].score}
                  label="3"
                  barColor="#FFD23D"
                />
                <ProgressBar
                  onToggle={() => handleDamagePointFilterChange({ point: 4, classNames: points[4].classNames })}
                  value={points[4].score}
                  label="4"
                  barColor="#FF9A4A"
                />
                <ProgressBar
                  onToggle={() => handleDamagePointFilterChange({ point: 5, classNames: points[5].classNames })}
                  value={points[5].score}
                  label="5"
                  barColor="#FF443B"
                />
              </>
            ) : null}
          </Box>
        </Box>
      )}
    </Box>
  );
}
