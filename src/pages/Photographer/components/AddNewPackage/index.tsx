import {
  ActionIcon,
  Button,
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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  AddListFieldsProps,
  AddPackageData,
  ListsProps,
} from '../../../../config/Types/PhotographerForm';
import { UseFormReturn } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPesoSign,
  faPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { addPackage } from '../../../../config/Firebase/handlePhotographerData';
import { zodResolver } from '@hookform/resolvers/zod';
import { photographerPackageSchema } from '../../../../config/Validations/initialize';

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
  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <Group grow>
      <TextInput
        withAsterisk
        label="Package Label"
        placeholder="Example: Debut Package A"
        {...register('title')}
        error={errors.title?.message}
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
            min={0}
            step={100}
            decimalSeparator="."
            precision={2}
            {...field}
            error={error?.message}
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
      render={({ field, fieldState: { error } }) => (
        <Select
          label="Occasion"
          placeholder="Select Occasion / Add if not in the options"
          data={data}
          searchable
          creatable
          withAsterisk
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            const item = { label: query, value: query };
            setData((current) => [...current, item]);
            return item;
          }}
          {...field}
          error={error?.message}
        />
      )}
    />
  );
}

function AddListFields({
  type,
  setInclusions,
  setExlusions,
}: AddListFieldsProps) {
  const [input, setInput] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [lists, setLists] = useState<ListsProps[]>([]);
  const theme = useMantineTheme();

  useEffect(() => {
    if (setInclusions) {
      setInclusions(lists);
    }
    if (setExlusions) {
      setExlusions(lists);
    }
  }, [lists]);

  const handleClick = () => {
    if (input == '') {
      setIsEmpty(true);
    }
    if (input != '') {
      setLists((prevState: ListsProps[]): ListsProps[] => {
        return [...prevState, { id: lists?.length, value: input }];
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (input != '') {
      setIsEmpty(false);
    }
  };
  return (
    <Stack>
      <TextInput
        label={type === 'inclusion' ? 'Inclusions' : 'Exclusions'}
        size="md"
        value={input}
        onChange={handleInputChange}
        error={isEmpty ? "Input field can't be empty" : false}
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
        placeholder={`Add ${
          type === 'inclusion' ? 'inclusion' : 'exlusion'
        } services for package`}
        rightSectionWidth={42}
      />
      <List
        withPadding
        spacing="xs"
        size="md"
        center
        icon={
          <ThemeIcon
            color={type === 'inclusion' ? 'teal' : 'red'}
            size={24}
            radius="xl"
          >
            <FontAwesomeIcon icon={type === 'inclusion' ? faCheck : faX} />
          </ThemeIcon>
        }
      >
        {lists?.map((item) => {
          return <List.Item key={item.id}>{item.value}</List.Item>;
        })}
      </List>
    </Stack>
  );
}

export default function AddNewPackage() {
  const form = useForm<AddPackageData>({
    resolver: zodResolver(photographerPackageSchema),
    defaultValues: {
      title: '',
      occasion: '',
      rate: 0,
    },
  });
  const [inclusions, setInclusions] = useState<ListsProps[]>([]);
  const [exlusions, setExlusions] = useState<ListsProps[]>([]);

  const handleOnSubmit: SubmitHandler<AddPackageData> = (
    data: AddPackageData
  ) => {
    addPackage(data, inclusions, exlusions);
  };

  return (
    <Paper>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Stack>
          <StaticInputFields form={form} />
          <DynamicSelectField form={form} />
          <AddListFields type="inclusion" setInclusions={setInclusions} />
          <AddListFields type="exclusion" setExlusions={setExlusions} />
        </Stack>
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Paper>
  );
}
