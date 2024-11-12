import { useCallback, useState, useMemo } from 'react';
import { FilterOptions } from '../services/image.service';
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
import { Category } from '../types/Image';

interface SelectedFilterOptions {
  confidence: number[];
  startDate: string;
  endDate: string;
  checks: boolean[];
}

const categoryOptions: {
  id: Category | 'unreviewed';
  label: string;
}[] = [
  {
    id: 'porn',
    label: 'Porn',
  },
  {
    id: 'not_porn',
    label: 'Not Porn',
  },
  {
    id: 'uncertain',
    label: 'Uncertain',
  },
  {
    id: 'unreviewed',
    label: 'Unreviewed',
  },
];

const initialCategoryOptions = categoryOptions.map((c) => false);

const initialSelectedFilters = ((): SelectedFilterOptions => {
  const date = new Date();
  const today = date.toJSON().slice(0, 10);
  date.setDate(date.getDate() - 7);
  const oneWeekAgo = date.toJSON().slice(0, 10);

  return {
    confidence: [0.5, 0.95],
    startDate: oneWeekAgo,
    endDate: today,
    checks: initialCategoryOptions,
  };
})();

function toFilterOptions(filters: SelectedFilterOptions) {
  return {};
}

interface Props {
  setFilters: (filters: FilterOptions) => void;
}

export function FilterPanel({ setFilters }: Props) {
  const [selectedFilters, setSelectedFilters] = useState(
    initialSelectedFilters
  );

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setSelectedFilters((prevState) => ({
        ...prevState,
        confidence: newValue as number[],
      }));
    },
    [setSelectedFilters]
  );

  const handleCheckboxChange = useCallback(
    (index: number) => {
      setSelectedFilters((prevState) => {
        const newChecks = [...prevState.checks];
        newChecks[index] = !newChecks[index];
        return { ...prevState, checks: newChecks };
      });
    },
    [setSelectedFilters]
  );

  const handleClear = useCallback(() => {
    setSelectedFilters(initialSelectedFilters);
  }, [setSelectedFilters]);

  const handleFilter = useCallback(() => {
    setFilters(toFilterOptions(selectedFilters));
  }, [selectedFilters, setFilters]);

  const sliderMarks = useMemo(
    () => [
      { value: 0, label: '0' },
      { value: 1, label: '1' },
      ...selectedFilters.confidence.map((c) => ({
        value: c,
        label: c.toString(),
      })),
    ],
    [selectedFilters.confidence]
  );

  return (
    <Box
      sx={{
        height: 'fit-content',
        backgroundColor: 'white',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container alignItems='center' spacing={2}>
        <Grid size={12} container alignItems='center' spacing={10}>
          <Grid size={2.5}>
            <Typography variant='h6'>Syd Barrett</Typography>
          </Grid>
          <Grid size={4.5}>
            <Typography gutterBottom>Confidence</Typography>
            <Slider
              value={selectedFilters.confidence}
              onChange={handleSliderChange}
              step={0.01}
              min={0}
              max={1}
              valueLabelDisplay='auto'
              marks={sliderMarks}
            />
          </Grid>
          <Grid
            size={5}
            sx={{
              border: '0.7px solid rgba(128, 128, 128, 1)',
              padding: '8px',
            }}
          >
            <FormLabel sx={{ fontSize: '16px', color: 'black' }}>
              Review Result
            </FormLabel>
            <Grid container spacing={1}>
              {categoryOptions.map((category, index) => (
                <Grid key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedFilters.checks[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    }
                    label={category.label}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} container alignItems='center' spacing={2} marginTop={2}>
          <Grid size={4}>
            <TextField
              label='Start Date'
              type='date'
              value={selectedFilters.startDate}
              onChange={(e) =>
                setSelectedFilters((prevState) => ({
                  ...prevState,
                  startDate: e.target.value,
                }))
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label='End Date'
              type='date'
              value={selectedFilters.endDate}
              onChange={(e) =>
                setSelectedFilters((prevState) => ({
                  ...prevState,
                  endDate: e.target.value,
                }))
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid size={2}>
            <Button
              variant='outlined'
              sx={{
                backgroundColor: 'magenta',
                color: 'white',
                height: '100%',
              }}
              onClick={handleClear}
              fullWidth
            >
              Clear
            </Button>
          </Grid>
          <Grid size={2}>
            <Button
              variant='contained'
              sx={{ backgroundColor: 'blue', color: 'white', height: '100%' }}
              onClick={handleFilter}
              fullWidth
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
