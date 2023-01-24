import { Select } from '@mantine/core';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { useAddressFieldStore } from '../../../config/StateManagement/initialize';
import { BarangayForm, FormData } from '../../../config/Types/initialize';

type Props = {
  form: UseFormReturn<FormData>;
  barangays: BarangayForm[] | undefined;
};

export default function BarangayField({ form, barangays }: Props) {
  const { control } = form;
  return (
    <>
      {barangays ? (
        <Controller
          control={control}
          name="barangay"
          render={({ field }) => (
            <Select
              label="Barangay"
              placeholder="Select Barangay"
              searchable
              clearable
              withAsterisk
              data={barangays}
              {...field}
            />
          )}
        />
      ) : (
        <Select
          disabled
          label="Barangay"
          placeholder="Select Barangay"
          data={[]}
        />
      )}
    </>
  );
}
