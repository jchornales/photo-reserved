import {
  ActionIcon,
  Group,
  List,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { AddPackageData } from '../../../../config/Types/PhotographerForm';
import { UseFormReturn } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPesoSign, faPlus } from '@fortawesome/free-solid-svg-icons';

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

type InclusionProps = {
  id: number | undefined;
  value: string;
};

function InclusionField() {
  const [input, setInput] = useState('');
  const [inclusions, setInclusions] = useState<InclusionProps[]>([]);
  const theme = useMantineTheme();

  const handleClick = () => {
    setInclusions((prevState) => {
      return [...prevState, { id: inclusions?.length, value: input }];
    });
    console.log(inclusions);
  };

  return (
    <Stack>
      <TextInput
        withAsterisk
        label="Inclusions"
        size="md"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            onClick={() => handleClick()}
          >
            <FontAwesomeIcon icon={faPlus} />
          </ActionIcon>
        }
        placeholder="Add inclusion services for package"
        rightSectionWidth={42}
      />
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <FontAwesomeIcon icon={faCheck} />
          </ThemeIcon>
        }
      >
        {inclusions?.map((item) => {
          return <List.Item key={item.id}>{item.value}</List.Item>;
        })}
      </List>
    </Stack>
  );
}

export default function AddNewPackage() {
  const form = useForm<AddPackageData>();
  return (
    <Paper>
      <form>
        <Stack>
          <StaticInputFields form={form} />
          <DynamicSelectField form={form} />
          <InclusionField />
        </Stack>
      </form>
    </Paper>
  );
}
