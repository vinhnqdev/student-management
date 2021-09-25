import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, useRef, useState } from 'react';
import { City } from '../../../models';

export interface StudentFilterProps {
  cityList: City[];
  onSearchChange: (text: string) => void;
  onSelectCityChange: (text: string) => void;
  onSelectSortChange: (_sort: string, _order: 'asc' | 'desc') => void;
  onResetFilter: () => void;
}

function StudentFilter({
  onSearchChange,
  onResetFilter,
  cityList,
  onSelectCityChange,
  onSelectSortChange,
}: StudentFilterProps) {
  // State
  const [city, setCity] = useState('');
  const [sort, setSort] = useState('');
  const [input, setInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleSelectCityChange = (e: any) => {
    const city = e.target.value;
    setCity(city);
    onSelectCityChange(city);
  };

  const handleSelectSortChange = (e: any) => {
    const sort = e.target.value;
    setSort(sort);
    const [_sort, _order] = sort.split('.');
    onSelectSortChange(_sort, _order);

    // _sort?
    // _order?
  };

  const handleReset = () => {
    onResetFilter();
    setCity('');
    setSort('');
    setInput('');
  };

  return (
    <Box>
      <Grid container>
        <Grid item md={6} lg={3}>
          <TextField
            label="Search name"
            value={input}
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={6} lg={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-city">City</InputLabel>
            <Select
              labelId="select-city"
              value={city}
              label="City"
              onChange={handleSelectCityChange}
              size="small"
            >
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} lg={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-student">Sort</InputLabel>
            <Select
              labelId="sort-student"
              value={sort}
              label="Sort"
              onChange={handleSelectSortChange}
              size="small"
            >
              <MenuItem value="mark.asc">Mark Asc</MenuItem>
              <MenuItem value="mark.desc">Mark Desc</MenuItem>
              <MenuItem value="name.asc">Name Asc</MenuItem>
              <MenuItem value="name.desc">Mark Asc</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} lg={3} sx={{ textAlign: 'center' }}>
          <Button variant="outlined" color="warning" onClick={handleReset}>
            Clear all
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFilter;
