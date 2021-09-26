import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Control, useController } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export interface RadioFieldValue {
  value: string;
  label: string;
}

export interface RadioFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  options: RadioFieldValue[];
}
export default function RadioField({ control, name, label, options }: RadioFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <FormControl component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row aria-label="gender" name={name} onChange={onChange} onBlur={onBlur} value={value}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
