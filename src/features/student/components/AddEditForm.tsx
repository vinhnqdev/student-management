import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import InputField from '../../../components/FormField/InputField';
import RadioField from '../../../components/FormField/RadioField';
import SelectField from '../../../components/FormField/SelectField';
import { Student } from '../../../models';
import { selectcityOptions } from '../../city/citySlice';

export interface AddEditFormProps {
  intitalValues: Student;
}

function AddEditForm({ intitalValues }: AddEditFormProps) {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: intitalValues,
  });
  const cityOptions = useAppSelector(selectcityOptions);

  const handleFormSubmit = (value: Student) => {
    console.log('Submitted!!!', value);
  };

  const radioOptions = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="name" control={control} label="Name" />
      <InputField name="age" type="number" control={control} label="Age" />
      <InputField name="mark" type="number" control={control} label="Mark" />

      <RadioField name="gender" label="Gender" control={control} options={radioOptions} />

      <SelectField name="city" control={control} label="City" options={cityOptions} />

      <Button type="submit" variant="contained" fullWidth>
        Update
      </Button>
    </form>
  );
}

export default AddEditForm;
