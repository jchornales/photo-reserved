import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Province, LocationForm, City } from '../config/Types/initialize';

async function fetchProvinces(): Promise<Province[]> {
  return axios
    .get('https://psgc.gitlab.io/api/provinces')
    .then((response) => response.data);
}

export async function fetchCities() {
  return axios
    .get(`https://psgc.gitlab.io/api/cities/`)
    .then((response) => response.data);
}

export function GetProvinces(): LocationForm[] | undefined {
  const { data: provinces } = useQuery(['province'], fetchProvinces);
  if (provinces) {
    const newProvinces = provinces
      .map((item: Province) => {
        return { value: item.code, label: item.name };
      })
      .sort((first: LocationForm, second: LocationForm) =>
        first.label < second.label ? -1 : 1
      );
    return newProvinces;
  }
}

export function GetCities(): LocationForm[] | undefined {
  const { data: cities } = useQuery(['province'], fetchCities);

  if (cities) {
    const newCities = cities
      .map((item: City) => {
        return { value: item.code, label: item.name };
      })
      .sort((first: LocationForm, second: LocationForm) =>
        first.label < second.label ? -1 : 1
      );
    return newCities;
  }
}
