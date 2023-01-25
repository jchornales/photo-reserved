import { TextInput } from '@mantine/core';
import {
  GetBarangays,
  GetCities,
  GetProvinces,
} from '../../../../api/GetPMCBT';
import { useAddressFieldStore } from '../../../../config/StateManagement/initialize';
import { FormProps } from '../../../../config/Types/initialize';
import BarangayField from '../BarangayField';
import CityField from '../CityField';
import ProvinceField from '../ProvinceField';

export default function AddressFields({ form }: FormProps) {
  const { register } = form;
  const [{ currentProvinceCode, currentCityCode }] = useAddressFieldStore(
    (state) => [state]
  );
  const provinces = GetProvinces();
  const cities = GetCities(currentProvinceCode);
  const barangays = GetBarangays(currentCityCode[0], currentCityCode[1]);

  return (
    <>
      <ProvinceField form={form} provinces={provinces} />
      <CityField form={form} cities={cities} />
      <BarangayField form={form} barangays={barangays} />
      <TextInput
        label="Address"
        placeholder="Example: Blk 7 Lot 9 Rafaela Homes"
        mt="md"
        {...register('address')}
      />
    </>
  );
}
