import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <TextField
      size="small"
      fullWidth
      margin="normal"
      {...field}
      inputRef={field.ref}
      label={label}
      variant="outlined"
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}

export default InputField;
