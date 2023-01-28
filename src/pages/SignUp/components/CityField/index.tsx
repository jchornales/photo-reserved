import { Select } from '@mantine/core';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { useAddressFieldStore } from '../../../../config/StateManagement/initialize';
import { CityForm, FormData } from '../../../../config/Types/initialize';

type Props = {
  form: UseFormReturn<FormData>;
  cities: CityForm[] | undefined;
};

export default function CityField({ form, cities }: Props) {
  const [{ setCurrentCity }] = useAddressFieldStore((state) => [state]);
  const { control, getValues, watch } = form;

  const getCode = cities?.find((city) => city.label === getValues('city'));
  useEffect(() => {
    if (getCode) {
      setCurrentCity(getCode.code, getCode.type);
    }
  }, [watch('city')]);

  return (
    <>
      {cities ? (
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select
              label="City/Municipality"
              placeholder="Select City/Municipality"
              searchable
              clearable
              withAsterisk
              data={cities}
              {...field}
            />
          )}
        />
      ) : (
        <Select
          disabled
          label="City/Municipality"
          placeholder="Select City/Municipality"
          data={[]}
        />
      )}
    </>
  );
}
