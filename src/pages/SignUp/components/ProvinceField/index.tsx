import { Select } from '@mantine/core';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { useAddressFieldStore } from '../../../../config/StateManagement/initialize';
import { FormData, ProvinceForm } from '../../../../config/Types/initialize';

type Props = {
  form: UseFormReturn<FormData>;
  provinces: ProvinceForm[] | undefined;
};

export default function ProvinceField({ form, provinces }: Props) {
  const [{ setCurrentProvince }] = useAddressFieldStore((state) => [state]);
  const { control, watch, getValues } = form;
  const getCode = provinces?.find(
    (province) => province.label === getValues('province')
  );
  useEffect(() => {
    if (getCode) {
      setCurrentProvince(getCode.code);
    }
  }, [watch('province')]);

  return (
    <>
      {provinces ? (
        <Controller
          control={control}
          name="province"
          render={({ field }) => (
            <Select
              label="Province"
              placeholder="Select Province"
              searchable
              clearable
              withAsterisk
              data={provinces}
              {...field}
            />
          )}
        />
      ) : (
        <Select
          disabled
          label="Province"
          placeholder="Select Province"
          data={[]}
        />
      )}
    </>
  );
}
