/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Select, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Controller, Control, UseFormRegister } from 'react-hook-form';
import { GetBarangays, GetCities, GetProvinces } from '../../../api/GetPMCB';
import { CityForm, FormData } from '../../../config/Types/initialize';

type Props = {
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
};

export default function AddressFields({ control, register }: Props) {
  const [currentProvince, setCurrentProvince] = useState<string | null>('');
  const [currentCity, setCurrentCity] = useState<CityForm | undefined>();
  const provinces = GetProvinces();
  const cities = GetCities(currentProvince);
  const barangays = GetBarangays(currentCity?.value, currentCity?.type);

  useEffect(() => {}, []);
  function getCurrentCityData(citycode: string | null) {
    const filtered = cities?.find((city) => city.value === citycode);
    setCurrentCity(filtered);
  }

  return (
    <>
      {provinces && (
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
              onChange={(event) => {
                setCurrentProvince(event);
              }}
            />
          )}
        />
      )}
      {currentProvince && cities ? (
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select
              label="City"
              placeholder="Select City"
              searchable
              clearable
              withAsterisk
              data={cities}
              {...field}
              onChange={(event) => {
                getCurrentCityData(event);
              }}
            />
          )}
        />
      ) : (
        <Select
          disabled
          value=""
          label="City / Municipality"
          placeholder="Select City / Municipality"
          data={[]}
        />
      )}
      {currentCity && barangays ? (
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

      <TextInput
        label="Address"
        placeholder="Example: Blk 7 Lot 9 Rafaela Homes"
        mt="md"
        {...register(`address`)}
      />
    </>
  );
}
