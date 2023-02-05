import { NumberInputHandlers } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { z } from 'zod';
import { photographerPackageSchema } from '../Validations/initialize';

export type AddPackageData = z.infer<typeof photographerPackageSchema>;

export type ListsProps = {
  id: number | undefined;
  value: string;
};

export type AddListFieldsProps = {
  type: string;
  setInclusions?: Dispatch<SetStateAction<ListsProps[]>>;
  setExlusions?: Dispatch<SetStateAction<ListsProps[]>>;
};
