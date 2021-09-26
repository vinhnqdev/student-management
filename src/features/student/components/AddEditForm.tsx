import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import InputField from '../../../components/FormField/InputField';
import RadioField from '../../../components/FormField/RadioField';
import SelectField from '../../../components/FormField/SelectField';
import { Student } from '../../../models';
import { selectcityOptions } from '../../city/citySlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().typeError('Must a number').min(18).integer().max(60).required('No age provided'),
  mark: yup.number().typeError('Must a number').positive().max(10).required(),
  city: yup.string().required(),
});

export interface AddEditFormProps {
  intitalValues: Student;
  onAddEditStudent: (student: Student) => void;
  isUpdateMode: boolean;
}

function AddEditForm({ isUpdateMode, intitalValues, onAddEditStudent }: AddEditFormProps) {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: intitalValues,
    resolver: yupResolver(schema),
  });
  const cityOptions = useAppSelector(selectcityOptions);

  const handleFormSubmit = (student: Student) => {
    onAddEditStudent(student);
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

      <Box mt={2}>
        <Button type="submit" variant="contained" fullWidth>
          {isUpdateMode ? 'Update' : 'Add'}
        </Button>
      </Box>
    </form>
  );
}

export default AddEditForm;
