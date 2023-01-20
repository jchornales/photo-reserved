import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Geolocation } from '../config/Types/initialize';

async function fetchProvinces(): Promise<Geolocation[]> {
  return axios
    .get('https://psgc.gitlab.io/api/provinces')
    .then((response) => response.data);
}

export default function GetProvinces(): Geolocation[] | undefined {
  const { data: provinces } = useQuery(['province'], fetchProvinces);

  return provinces;
}
