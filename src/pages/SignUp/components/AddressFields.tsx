/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Select, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useState } from 'react';
import { GetBarangays, GetCities, GetProvinces } from '../../../api/GetPMCB';
import { CityForm, FormData } from '../../../config/Types/initialize';

type Props = { form: UseFormReturnType<FormData> };

export default function AddressFields({ form }: Props) {
  const [currentProvince, setCurrentProvince] = useState('');
  const [currentCity, setCurrentCity] = useState<CityForm | undefined>();
  const provinces = GetProvinces();
  const cities = GetCities(currentProvince);
  const barangays = GetBarangays(currentCity?.value, currentCity?.type);

  function getCurrentCityData(citycode: string) {
    const filtered = cities?.find((city) => city.value === citycode);
    setCurrentCity(filtered);
  }
  return (
    <>
      {provinces && (
        <Select
          label="Province"
          placeholder="Select Province"
          searchable
          clearable
          withAsterisk
          onChange={(provinceCode) => {
            if (provinceCode) {
              form.setFieldValue('province', provinceCode);
              form.setFieldValue('city', '');
              setCurrentProvince(provinceCode);
            }
          }}
          data={provinces}
        />
      )}
      {currentProvince && cities ? (
        <Select
          label="City / Municipality"
          placeholder="Select City / Municipality"
          searchable
          clearable
          onChange={(cityCode) => {
            if (cityCode) {
              form.setFieldValue('city', cityCode);
              getCurrentCityData(cityCode);
            }
          }}
          data={cities}
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
        <Select
          label="Barangay"
          placeholder="Select Barangay"
          searchable
          clearable
          data={barangays}
        />
      ) : (
        <Select
          disabled
          label="Barangay"
          placeholder="Select Barangay"
          data={[]}
          {...form.getInputProps('address')}
        />
      )}

      <TextInput
        label="Address"
        placeholder="Example: Blk 7 Lot 9 Rafaela Homes"
        mt="md"
        {...form.getInputProps('address')}
      />
    </>
  );
}
