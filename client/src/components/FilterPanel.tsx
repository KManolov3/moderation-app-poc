import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  TextField,
  Checkbox,
  Button,
  Grid2 as Grid,
  FormLabel,
  FormControlLabel,
} from '@mui/material';

const FilterPanel: React.FC = () => {
  const [state, setState] = useState({
    confidence: 0.5,
    startDate: '',
    endDate: '',
    checks: [false, false, false, false],
  });

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setState((prevState) => ({
      ...prevState,
      confidence: newValue as number,
    }));
  };

  const handleCheckboxChange = (index: number) => {
    setState((prevState) => {
      const newChecks = [...prevState.checks];
      newChecks[index] = !newChecks[index];
      return { ...prevState, checks: newChecks };
    });
  };

  const handleClear = () => {
    setState({
      confidence: 0.5,
      startDate: '',
      endDate: '',
      checks: [false, false, false, false],
    });
  };

  const handleFilter = () => {
    console.log('Filters applied:', state);
  };

  return (
    <Box
      sx={{
        height: '25vh',
        backgroundColor: 'white',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container alignItems='center' spacing={2}>
        <Grid size={3}>
          <Typography variant='h6'>Syd Barrett</Typography>
        </Grid>
        <Grid size={6}>
          <Typography gutterBottom>Confidence</Typography>
          <Slider
            value={state.confidence}
            onChange={handleSliderChange}
            step={0.01}
            min={0}
            max={1}
            valueLabelDisplay='auto'
          />
          <Grid container spacing={2} marginTop={2}>
            <Grid size={6}>
              <TextField
                label='Start Date'
                type='date'
                value={state.startDate}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    startDate: e.target.value,
                  }))
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label='End Date'
                type='date'
                value={state.endDate}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    endDate: e.target.value,
                  }))
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={3} container>
          <FormLabel sx={{ fontSize: '16px', color: 'black' }}>
            Categories
          </FormLabel>
          <Grid container spacing={1}>
            {state.checks.map((checked, index) => (
              <Grid key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  }
                  label={`Checkbox ${index + 1}`}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={1} marginTop={2}>
            <Grid>
              <Button
                variant='outlined'
                sx={{ backgroundColor: 'magenta', color: 'white' }}
                onClick={handleClear}
              >
                Clear
              </Button>
            </Grid>
            <Grid>
              <Button
                variant='contained'
                sx={{ backgroundColor: 'blue', color: 'white' }}
                onClick={handleFilter}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterPanel;
