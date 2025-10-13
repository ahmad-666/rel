import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import AutoComplete, { type Props as AutoCompleteProps, type Option } from '@/components/AutoComplete/Mui';
import Icon from '@/components/Icon';
import countries from '@/data/countries.json';
import { type SxProps } from '@mui/material/styles';

export type CountryOption = Option & { name?: string; code?: string };
type LabelVariant = 'code' | 'full-name';
type Props<Multiple extends undefined | boolean = false> = Omit<
    AutoCompleteProps<CountryOption, Multiple, false, false>,
    'options' | 'renderOption' | 'renderValue'
> & {
    labelVariant?: LabelVariant;
    chipSx?: SxProps;
};

const CountrySelect = <Multiple extends undefined | boolean = false>({
    multiple,
    onChange,
    size,
    labelVariant = 'full-name',
    chipSx,
    ...rest
}: Props<Multiple>) => {
    const options: CountryOption[] = countries.map((country) => ({
        value: country.code,
        label: labelVariant === 'code' ? country.code : country.name,
        name: country.name, //because value/label can be changed we use separate field to always store country name
        code: country.code //because value/label can be changed we use separate field to always store country code
    })); //for labelVariant==='full-name' option can be something like {value:'us',label:'United States'} ... for labelVariant==='code' option can be something like {value:'us',label:'us'}
    const isSmall = size === 'sm' || size === 'md';
    const filterOptionsHandler = (options: CountryOption[], search: string) => {
        //return all countries that part of their names/codes are inside search
        return options.filter(
            (opt) =>
                opt.name?.toLowerCase().includes(search.toLowerCase()) ||
                opt.code?.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <AutoComplete
            size={size}
            multiple={multiple}
            onChange={(e, newVal) => {
                onChange?.(e, newVal);
            }}
            options={options}
            filterSelectedOptions={multiple}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            filterOptions={(options, state) => filterOptionsHandler(options, state.inputValue)}
            renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                    <ListItem key={key} {...rest} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Icon icon={`flag:${option.value}-4x3`} size='sm' className='shrink-0' />
                        <Typography
                            flexGrow={1}
                            component='span'
                            typography='bodySm'
                            color='neutral.dark4'
                            textTransform={labelVariant === 'code' ? 'uppercase' : 'capitalize'}
                        >
                            {option.label}
                        </Typography>
                    </ListItem>
                );
            }}
            renderValue={(value, getItemProps) => {
                const valueArr: CountryOption[] = multiple
                    ? (value as CountryOption[])
                    : value
                      ? [value as CountryOption]
                      : []; //always convert values to array so even for multiple:false we can loop on it
                return valueArr.map((val, index) => {
                    //@ts-expect-error 'manually get key from getItemProps'
                    const { key, ...rest } = getItemProps({ index });
                    return (
                        <Chip
                            key={multiple ? key : index}
                            {...rest}
                            size={isSmall ? 'small' : 'medium'}
                            label={
                                <Stack direction='row' alignItems='center' gap={2}>
                                    <Icon icon={`flag:${val.value}-4x3`} size={15} className='shrink-0' />
                                    <Typography
                                        flexGrow={1}
                                        component='span'
                                        variant='bodySm'
                                        color='neutral.dark4'
                                        textTransform={labelVariant === 'code' ? 'uppercase' : 'capitalize'}
                                    >
                                        {val.label}
                                    </Typography>
                                </Stack>
                            }
                            {...(!multiple && {
                                onClick: undefined, //remove clickable ability for chip for multiple:false
                                onDelete: undefined //remove closable ability for chip for multiple:false
                            })}
                            sx={{ pointerEvents: multiple ? 'auto' : 'none', ...chipSx }}
                        />
                    );
                });
            }}
            {...rest}
        />
    );
};

export default CountrySelect;

//? Usage:
// const [country, setCountry] = useState<null | CountryOption>(null);
// const [countries, setCountries] = useState<CountryOption[]>([]);
// <CountrySelect value={country} onChange={(e, newVal) => setCountry(newVal)}
//     size='sm' clearable loading prependInnerIcon='mdi:user'
//     chipSx={{ bgcolor: 'transparent' }} sx={{ width: 400 }}
// />
// <CountrySelect value={countries} onChange={(e, newVal) => setCountries(newVal)} multiple
//     sx={{ width: 400, '& .MuiInputBase-root': { height: 'auto !important' } }}
// />
