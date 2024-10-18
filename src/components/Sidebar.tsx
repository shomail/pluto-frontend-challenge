import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';

import DatePicker from './Datepicker';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import FilterContainer from './FilterContainer';
import FilterTabs from './FilterTabs';
import { DamagePointFilter, DamageType } from '../types';
const sidebarWidth = 400;

interface SidebarProps {
  points: 0 | DamageType;
  roadTypeFilter: number[];
  handleRoadTypeFilterChange: (roadType: number) => void;
  handleStartDateChange: (date: number) => void;
  handleEndDateChange: (date: number) => void;
  startDate: number;
  endDate: number;
  handleDamagePointFilterChange: (damagePointFilter: DamagePointFilter) => void;
}

export default function Sidebar({
  points,
  roadTypeFilter,
  handleRoadTypeFilterChange,
  handleStartDateChange,
  handleEndDateChange,
  startDate,
  endDate,
  handleDamagePointFilterChange,
}: SidebarProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f0f0f0',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <FilterContainer label="Optagelsedato">
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <DatePicker label=" -Vælg startdato -" handleChange={handleStartDateChange} value={startDate} />
            <DatePicker
              label=" -Vælg slutdato -"
              handleChange={handleEndDateChange}
              value={endDate}
              minDate={startDate}
            />
          </Box>
        </FilterContainer>

        <FilterContainer label="Vejtyper">
          <FormGroup>
            {[
              { key: 0, label: 'Byvej' },
              { key: 1, label: 'Landevej' },
              { key: 2, label: 'Villavej' },
              { key: 3, label: 'Sti og cykelsti' },
            ].map(({ key, label }) => (
              <FormControlLabel
                key={label}
                control={
                  <Checkbox
                    value={key}
                    checked={roadTypeFilter.includes(key)}
                    size="small"
                    onChange={() => handleRoadTypeFilterChange(key)}
                  />
                }
                label={
                  <Typography variant="body2" color="textSecondary">
                    {label}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </FilterContainer>
        <FilterContainer>
          <FilterTabs points={points} handleDamagePointFilterChange={handleDamagePointFilterChange} />
        </FilterContainer>
      </Drawer>
    </Box>
  );
}
