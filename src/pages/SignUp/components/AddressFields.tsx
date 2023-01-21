/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Select, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { GetProvinces } from '../../../api/GetPMCB';
import { FormData } from '../../../config/Types/initialize';

type Props = { form: UseFormReturnType<FormData> };

export default function AddressFields({ form }: Props) {
  const provinces = GetProvinces();

  return (
    <>
      {provinces ? (
        <Select
          label="Province"
          placeholder="Select Province"
          searchable
          clearable
          onChange={(provinceCode) => {
            if (provinceCode) {
              form.setFieldValue('province', provinceCode);
            }
          }}
          data={provinces}
        />
      ) : (
        <Select label="Province" placeholder="Select Province" data={[]} />
      )}
      <Select
        disabled
        label="City / Municipality"
        placeholder="Select City / Municipality"
        data={[]}
      />
      <Select
        disabled
        label="Barangay"
        placeholder="Select Barangay"
        data={[]}
      />
      <TextInput
        label="Address"
        placeholder="Example: Blk 7 Lot 9 Rafaela Homes"
        mt="md"
        {...form.getInputProps('address')}
      />
    </>
  );
}
