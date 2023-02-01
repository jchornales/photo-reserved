import {
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { AddPackageData } from '../../../../config/Types/PhotographerForm';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPesoSign } from '@fortawesome/free-solid-svg-icons';

type Props = {
  form: UseFormReturn<AddPackageData>;
};

const OccasionOptions = [
  { label: 'Birthday', value: 'Birthday' },
  { label: 'Christening', value: 'Christening' },
  { label: 'Graduation', value: 'Graduation' },
  { label: 'Recognition', value: 'Recognition' },
  { label: 'Wedding', value: 'Wedding' },
];

function StaticInputFields({ form }: Props) {
  const { register, control } = form;
  return (
    <Group grow mb="md" mt="md">
      <TextInput
        required
        label="Package Label"
        placeholder="Example: Debut Package A"
        {...register('occasion')}
      />
      <Controller
        control={control}
        name="rate"
        render={({ field, fieldState: { error } }) => (
          <NumberInput
            withAsterisk
            label="Rate"
            icon={<FontAwesomeIcon icon={faPesoSign} />}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value ? value : ''))
                ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : ''
            }
            defaultValue={0}
            error={error && error.message}
            {...field}
          />
        )}
      />
    </Group>
  );
}

function DynamicSelectField({ form }: Props) {
  const [data, setData] = useState(OccasionOptions);
  const { control } = form;
  return (
    <Controller
      control={control}
      name="occasion"
      render={({ field }) => (
        <Select
          label="Occasion"
          placeholder="Select Occasion / Add if not in the options"
          data={data}
          searchable
          creatable
          clearable
          withAsterisk
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            const item = { label: query, value: query };
            setData((current) => [...current, item]);
            return item;
          }}
          {...field}
        />
      )}
    />
  );
}

function InclusionField() {}

export default function AddNewPackage() {
  const form = useForm<AddPackageData>();
  return (
    <Paper>
      <form>
        <Stack>
          <StaticInputFields form={form} />
          <DynamicSelectField form={form} />
        </Stack>
      </form>
    </Paper>
  );
}
