import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  Province,
  ProvinceForm,
  City,
  CityForm,
  Barangay,
  BarangayForm,
} from '../config/Types/initialize';

async function fetchProvinces(): Promise<Province[]> {
  const data = await axios
    .get('https://psgc.gitlab.io/api/provinces')
    .then((response) => response.data);

  return data;
}

export async function fetchCities(code: string): Promise<City[]> {
  const cities = await axios
    .get(`https://psgc.gitlab.io/api/provinces/${code}/cities`)
    .then((response) => response.data);

  const municipalities = await axios
    .get(`https://psgc.gitlab.io/api/provinces/${code}/municipalities`)
    .then((response) => response.data);

  const sortedCities = cities.map((city: City) => {
    return { ...city, type: 'city' };
  });

  const sortedMunicipality = municipalities.map((city: City) => {
    return { ...city, type: 'municipality' };
  });

  const data = [...sortedCities, ...sortedMunicipality];
  return data;
}

export async function fetchBarangays(
  code: string | undefined,
  type: string | undefined
): Promise<Barangay[]> {
  let barangays: Barangay[] = [];

  if (type === 'city') {
    barangays = await axios
      .get(`https://psgc.gitlab.io/api/cities/${code}/barangays`)
      .then((response) => response.data);
  }

  if (type === 'municipality') {
    barangays = await axios
      .get(`https://psgc.gitlab.io/api/municipalities/${code}/barangays`)
      .then((response) => response.data);
  }

  return barangays;
}

export function GetProvinces(): ProvinceForm[] | undefined {
  const {
    data: provinces,
    isSuccess,
    isError,
    error,
  } = useQuery<Province[], Error>(['province'], fetchProvinces);
  if (isSuccess) {
    const newProvinces = provinces
      .map((item: Province) => {
        return { value: item.code, label: item.name };
      })
      .sort((first: ProvinceForm, second: ProvinceForm) =>
        first.label < second.label ? -1 : 1
      );
    return newProvinces;
  }
  if (isError) {
    throw new Error(`${error}`);
  }
}

export function GetCities(code: string): CityForm[] | undefined {
  const {
    data: cities,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['cities', code],
    queryFn: () => fetchCities(code),
    enabled: !!code,
  });

  if (isSuccess) {
    const newCities = cities
      .map((item: City): CityForm => {
        return {
          value: item.code,
          label: item.name,
          code: item.provinceCode,
          type: item.type,
        };
      })
      .sort((first: CityForm, second: CityForm) =>
        first.label < second.label ? -1 : 1
      );
    return newCities;
  }
  if (isError) {
    throw new Error(`${error}`);
  }
}

export function GetBarangays(
  code: string | undefined,
  type: string | undefined
): BarangayForm[] | undefined {
  const {
    data: barangay,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['barangay', code],
    queryFn: () => fetchBarangays(code, type),
    enabled: !!code,
  });

  if (isSuccess) {
    const newCities = barangay
      .map((item: Barangay): BarangayForm => {
        return { value: item.code, label: item.name };
      })
      .sort((first: BarangayForm, second: BarangayForm) =>
        first.label < second.label ? -1 : 1
      );
    return newCities;
  }
  if (isError) {
    throw new Error(`${error}`);
  }
}
