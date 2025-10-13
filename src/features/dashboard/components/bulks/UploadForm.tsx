'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import Form from '@/components/Form';
import Textfield from '@/components/Textfield/Mui';
import AutoComplete, { type Option } from '@/components/AutoComplete/Mui';
import FileUploader, { type FileId } from '@/components/FileUploader/Mui';
import { addBulks } from '@dashboard/services/bulk';
import { parseExcelFile } from '@/utils/file';
import { ACCEPTED_BULK_FILE_MIME_TYPES } from '@dashboard/configs';

type Fields = {
    name: string;
    emailColumn: null | Option;
    file: null | FileId;
};
type Props = BoxProps & {
    closable?: boolean;
    onClose?: () => void;
    onBulkSubmit?: () => void;
};

const intl = new Intl.NumberFormat('en-US');

export default function BulkUploadForm({ closable = false, onClose, onBulkSubmit, ...rest }: Props) {
    const totalSteps = 2;
    const [step, setStep] = useState(1);
    const [bulkRecords, setBulkRecords] = useState(0);
    const [fileHeaders, setFileHeaders] = useState<string[]>([]);
    const [fileRows, setFileRows] = useState<unknown[][]>([]);
    const isFirstStep = step === 1;
    const isLastStep = step === totalSteps;
    const prevStep = () => {
        setStep((old) => Math.max(old - 1, 1));
    };
    const nextStep = () => {
        setStep((old) => Math.min(old + 1, totalSteps));
    };
    const getTitle = () => {
        let t;
        switch (step) {
            case 1:
                t = 'Upload File';
                break;
            case 2:
                t = 'Bulk Configuration';
                break;
            default:
                t = 'Upload';
        }
        return t;
    };
    const title = getTitle();
    const showPrevBtn = step > 1;
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async ({ name, emailColumn, file }: Fields) => {
            const bulkFile = file?.file as File;
            const headerIndex = fileHeaders.findIndex((header) => header === emailColumn?.value);
            const targetCells = fileRows.map((row) => (row[headerIndex] as unknown) || '');
            await addBulks({
                name,
                cells: targetCells,
                file: bulkFile
            });
        },
        onSuccess: () => {
            onBulkSubmit?.();
        }
    });
    const { control, watch, setError, clearErrors, reset, handleSubmit } = useForm<Fields>({
        mode: 'onSubmit',
        values: {
            name: '',
            emailColumn: null,
            file: null
        }
    });
    const watchFile = watch('file');
    const fileMime = watchFile?.file?.type;
    const fileFormat = fileMime === 'text/csv' ? 'csv' : fileMime === 'application/vnd.ms-excel' ? 'xls' : 'xlsx';
    const onSubmit = async ({ name, emailColumn, file }: Fields) => {
        await mutateAsync({ name, emailColumn, file });
        reset();
        // setStep(1);
    };

    return (
        <Box {...rest}>
            {!isPending ? (
                <Box>
                    <Stack justifyContent='space-between' alignItems='center' gap={2}>
                        <Stack alignItems='center' gap={0.5}>
                            {showPrevBtn && (
                                <IconButton size='small' onClick={prevStep}>
                                    <Icon icon='solar:arrow-left-outline' size='md' color='neutral.dark4' />
                                </IconButton>
                            )}
                            <Typography component='h6' variant='labelLg' color='neutral.dark4'>
                                {title}
                            </Typography>
                        </Stack>
                        {closable && (
                            <IconButton size='small' onClick={onClose}>
                                <Icon icon='mdi:close' size='sm' color='neutral.light2' />
                            </IconButton>
                        )}
                    </Stack>
                    <Box mt={5}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            {step === 1 && (
                                <Box>
                                    <Controller
                                        control={control}
                                        name='file'
                                        rules={{
                                            required: 'File is required'
                                        }}
                                        render={({ field, fieldState }) => (
                                            <FileUploader
                                                type='outline'
                                                mode='override'
                                                showPreviews={false}
                                                titleImgSrc='/imgs/others/files.png'
                                                title='Drop your file here or'
                                                uploaderBtnText='Select'
                                                description={
                                                    <>
                                                        <Typography component='p' variant='bodySm'>
                                                            xlsx, xls and csv
                                                        </Typography>
                                                        <Typography component='p' variant='bodySm'>
                                                            If your file contains special or non-English characters,
                                                            please upload it as an Excel (.xlsx) file instead of CSV to
                                                            avoid encoding issues.
                                                        </Typography>
                                                    </>
                                                }
                                                accept={ACCEPTED_BULK_FILE_MIME_TYPES.join(', ')}
                                                onChange={async (newFiles) => {
                                                    const file = newFiles[0];
                                                    if (!file) {
                                                        field.onChange(null);
                                                        setError('file', {
                                                            message: 'File is required'
                                                        });
                                                    } else if (
                                                        !ACCEPTED_BULK_FILE_MIME_TYPES.includes(file.file.type)
                                                    ) {
                                                        setError('file', {
                                                            message: 'File should be xlsx, xls, or csv'
                                                        });
                                                    } else {
                                                        const { rowsCount, rows } = await parseExcelFile(file.file);
                                                        if (rowsCount <= 1) {
                                                            setError('file', {
                                                                message: 'File should contains at least 2 rows'
                                                            });
                                                        } else if (rowsCount > 20_000) {
                                                            setError('file', {
                                                                message: 'File should contains less than 20K rows'
                                                            });
                                                        } else {
                                                            field.onChange(file);
                                                            clearErrors('file');
                                                            setBulkRecords(rowsCount - 1);
                                                            //rows[0] is header row , rows[1,...] are data rows
                                                            setFileHeaders((rows[0] as string[]) || []);
                                                            setFileRows(rows.slice(1));
                                                            setStep(2);
                                                        }
                                                    }
                                                }}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                uploaderBtnSx={{
                                                    px: 10,
                                                    bgcolor: 'white',
                                                    color: 'neutral.dark4',
                                                    border: 1,
                                                    borderColor: (theme) => `${theme.palette.neutral.light2} !important`
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                            )}
                            {step === 2 && (
                                <Box>
                                    <Stack
                                        p={3}
                                        borderRadius={2}
                                        bgcolor='info.light5'
                                        justifyContent='space-between'
                                        alignItems='center'
                                        gap={4}
                                    >
                                        <Stack alignItems='center' gap={2}>
                                            <Image
                                                src={`/imgs/others/${fileFormat}.svg`}
                                                alt='file-check'
                                                width={60}
                                                height={60}
                                                style={{ width: '50px' }}
                                            />
                                            <Typography
                                                component='p'
                                                variant='labelLg'
                                                color='info.dark4'
                                                className='wrap-anywhere'
                                            >
                                                {watchFile?.file?.name || 'Bulk File'}
                                            </Typography>
                                        </Stack>
                                        <Typography mt={1} component='p' variant='labelMd' color='info.dark4'>
                                            {intl.format(bulkRecords)} rows available
                                        </Typography>
                                    </Stack>
                                    <Grid mt={8} container spacing={6}>
                                        <Grid size={12}>
                                            <Controller
                                                control={control}
                                                name='name'
                                                rules={{ required: 'Field is required' }}
                                                render={({ field, fieldState }) => (
                                                    <Textfield
                                                        {...field}
                                                        variant='outlined'
                                                        size='sm'
                                                        labelPos='outside'
                                                        label='List Name'
                                                        placeholder='Enter a name...'
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ mobile: 12 }}>
                                            <Controller
                                                control={control}
                                                name='emailColumn'
                                                rules={{ required: 'Field is required' }}
                                                render={({ field, fieldState }) => (
                                                    <AutoComplete
                                                        {...field}
                                                        onChange={(_, val) => field.onChange(val)}
                                                        options={fileHeaders.map((header) => ({
                                                            value: header,
                                                            label: header
                                                        }))}
                                                        variant='outlined'
                                                        size='sm'
                                                        labelPos='outside'
                                                        label='Email'
                                                        placeholder='Select...'
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                            {isLastStep && (
                                <Stack mt={8} justifyContent='flex-end'>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        size='medium'
                                        loading={isPending}
                                        sx={{ px: 12 }}
                                    >
                                        Find
                                    </Button>
                                </Stack>
                            )}
                        </Form>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Stack
                        p={3}
                        borderRadius={2}
                        bgcolor='info.light5'
                        justifyContent='space-between'
                        alignItems='center'
                        gap={4}
                    >
                        <Stack alignItems='center' gap={2}>
                            <Image
                                src={`/imgs/others/${fileFormat}.svg`}
                                alt='file-check'
                                width={60}
                                height={60}
                                style={{ width: '50px' }}
                            />
                            <Typography component='p' variant='labelLg' color='info.dark4' className='wrap-anywhere'>
                                {watchFile?.file.name || 'Bulk File'}
                            </Typography>
                        </Stack>
                        <Typography mt={1} component='p' variant='labelMd' color='info.dark4'>
                            {intl.format(bulkRecords)} rows available
                        </Typography>
                    </Stack>
                    <Box mt={5}>
                        <LinearProgress
                            variant='indeterminate'
                            color='neutral'
                            sx={{
                                height: 12,
                                bgcolor: 'neutral.light4',
                                borderRadius: 2,
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: 'neutral.dark4'
                                }
                            }}
                        />
                    </Box>
                    <Box mt={5}>
                        <Typography component='p' variant='bodySm' color='neutral'>
                            Finding info, this may take a while...
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
