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
import { useForm, Controller } from 'react-hook-form';
import { AddPackageData } from '../../../../config/Types/PhotographerForm';
import { UseFormReturn } from 'react-hook-form';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPesoSign,
  faPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';

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

type ListsProps = {
  id: number | undefined;
  value: string;
};

type AddListFieldsProps = {
  type: string;
  setInclusions?: Dispatch<SetStateAction<ListsProps[]>>;
  setExlusions?: Dispatch<SetStateAction<ListsProps[]>>;
};

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
        withAsterisk
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
  const form = useForm<AddPackageData>();
  const [inclusions, setInclusions] = useState<ListsProps[]>([]);
  const [exlusions, setExlusions] = useState<ListsProps[]>([]);

  return (
    <Paper>
      <form>
        <Stack>
          <StaticInputFields form={form} />
          <DynamicSelectField form={form} />
          <AddListFields type="inclusion" setInclusions={setInclusions} />
          <AddListFields type="exclusion" setExlusions={setExlusions} />
        </Stack>
        <Group position="right" mt="md">
          <Button>Submit</Button>
        </Group>
      </form>
    </Paper>
  );
}
