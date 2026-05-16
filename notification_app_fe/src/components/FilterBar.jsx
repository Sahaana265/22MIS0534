import React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import { Log } from '../../../logging_middleware/logger';

const TYPES = ['All', 'Placement', 'Result', 'Event'];

const FilterBar = ({ selectedType, onTypeSelect }) => {
  const handleSelect = (type) => {
    Log('frontend', 'info', 'component', `Filter changed to ${type}`);
    onTypeSelect(type);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
        {TYPES.map((type) => (
          <Chip
            key={type}
            label={type}
            onClick={() => handleSelect(type)}
            color={selectedType === type ? 'primary' : 'default'}
            variant={selectedType === type ? 'filled' : 'outlined'}
            sx={{
              fontWeight: selectedType === type ? 600 : 400,
              px: 1,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FilterBar;
