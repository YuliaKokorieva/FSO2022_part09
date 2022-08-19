import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { Field, FieldProps } from 'formik';
import { EntryType, HealthCheckRating} from '../types';

export type EntryTypeOption = {
  value: EntryType,
  label: string
};

type EntryTypeSelectFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const EntryTypeSelectField = ({ name, label, options }: EntryTypeSelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

export type RatingOption = {
  value: HealthCheckRating,
  label: string
};

type RatingSelectFieldProps = {
  name: string;
  label: string;
  options: RatingOption[];
};


export const RatingSelectField = ({ name, label, options }: RatingSelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);