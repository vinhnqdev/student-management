import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Control, useController } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: SelectOption[];
}

export default function SelectField({ name, label, control, options }: SelectFieldProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={invalid}>
        <InputLabel id="select-field">{label}</InputLabel>
        <Select labelId="select-field" value={value} label="Age" onChange={onChange} onBlur={onBlur}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
}
