'use client';

import { useState, useRef, useId, Fragment, type MouseEvent, type ChangeEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { type SxProps, type Theme } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import DashedBorder from '@/components/DashedBorder/Mui';
import { mimeToIcon } from '@/utils/file';

export type Type = 'inline' | 'outline';
export type Mode = 'override' | 'append';
export type FileId = {
    /** identifier of file ... same as its related preview.id */
    id: string;
    /** value that we get from input[type="file"] ... type File cannot be destructed */
    file: File;
};
export type Preview = {
    /** identifier of preview ... same as its related file.id */
    id: string;
    /** name of file */
    name: string;
    /** thumbnail src , only for images,videos files */
    imgSrc?: string;
    /** file icon , for txt,docs,pptx,xlsx,pdf,... files */
    icon?: string;
    /** file size in mb */
    size?: number;
    /** mime type of file --> 'image/png','video/*',... */
    mime?: string;
    /** extension of file --> 'png','mp4',... */
    ext?: string;
};
type Props = Omit<BoxProps, 'onChange'> & {
    /** 'id' of input[type="file"] & 'for' of label */
    id?: string;
    /** name of input[type="file"] */
    name?: string;
    /** 'inline' is for simple button uploader , 'outline' is for adding whole box with title,description,upload button,... */
    type?: Type;
    /** only for multiple:true , 'override' means we clear all old files and only add files , 'append' means we append new files to old files  */
    mode?: Mode;
    /** used as 'multiple' of input[type="file"] */
    multiple?: boolean;
    /** used as 'accept' of input[type="file"] e.g 'image/*, video/mp4' */
    accept?: string;
    /** src of image above title */
    titleImgSrc?: string;
    /** title of type="outline" */
    title?: string;
    /** text of uploader button */
    uploaderBtnText?: string;
    /** description of type="outline" */
    description?: ReactNode;
    /** even for multiple:false we return array */
    onChange?: (newFiles: FileId[]) => void;
    /** show previews */
    showPreviews?: boolean;
    /** previews values ... even for multiple:false we still use array */
    previews?: Preview[];
    /** fires every time we update previews */
    onPreviewsChange?: (newPreviews: Preview[]) => void;
    /** check if previews should be deletable */
    previewsClearable?: boolean;
    error?: boolean;
    helperText?: string;
    uploaderBtnSx?: SxProps<Theme>;
    outlineBoxSx?: SxProps<Theme>;
};

//? FileUploader is special component and we don't use any 'value' prop and we only have onChange,previews,onPreviewsChange
//? Here we use:
{
    /* <Button component='label' htmlFor={id}> 
    Upload 
    <input id={id} type="file" hidden multiple={multiple} accept={accept} onChange={onChange} />
</Button>  */
}

export default function FileUploader({
    id,
    name,
    type = 'inline',
    mode = 'override',
    titleImgSrc = '/imgs/others/file-check-white.png',
    title,
    uploaderBtnText = 'Upload ...',
    description,
    onChange,
    multiple = false,
    accept,
    showPreviews = false,
    previewsClearable = false,
    previews = [], //even for multiple:false we still use array ... always use array even for dropZoneProps:{multiple:false}
    onPreviewsChange,
    error = false,
    helperText,
    uploaderBtnSx,
    outlineBoxSx,
    ...rest
}: Props) {
    const generatedId = useId().replace(/[:«»]/g, '').toLowerCase();
    const inputId = id || generatedId;
    const inputRef = useRef<HTMLInputElement>(null!);
    const dragContainerRef = useRef<HTMLDivElement>(null!);
    const [files, setFiles] = useState<FileId[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const onInputClickHandler = (e: MouseEvent<HTMLInputElement>) => {
        //@ts-expect-error 'manually set value of input to null'
        e.target.value = null; //? now onChange fires if user select same file over again
    };
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onFilesChange(e.target.files);
    };
    const onFilesChange = (filesList: null | FileList) => {
        // 'File' type cannot destructed so we use whole File with separating its name,size,type,etc
        const newFiles = Array.from(filesList || []).map((file) => ({
            id: crypto.randomUUID(),
            file
        }));
        let finalFiles: FileId[] = [];
        if (mode === 'override') finalFiles = newFiles;
        else if (mode === 'append') {
            if (!multiple) finalFiles = newFiles.length ? newFiles : files;
            else finalFiles = [...files, ...newFiles];
        }
        const finalPreviews: Preview[] = finalFiles.map(({ id, file }) => {
            const hasThumbnail = file.type.includes('image');
            return {
                id,
                name: file.name,
                ...(hasThumbnail && { imgSrc: URL.createObjectURL(file) }),
                ...(!hasThumbnail && { icon: mimeToIcon(file.type) }),
                size: file.size / (1024 * 1024),
                mime: file.type,
                ext: file.name.split('.').reverse()[0]?.toLowerCase()
            };
        });
        setFiles(finalFiles);
        onChange?.(finalFiles);
        onPreviewsChange?.(finalPreviews);
    };
    const onPreviewClearHandler = (id: string) => {
        const newPreviews = previews.filter((preview) => preview.id !== id);
        const newFiles = files.filter((file) => file.id !== id);
        setFiles(newFiles);
        onChange?.(newFiles);
        onPreviewsChange?.(newPreviews);
    };

    return (
        <Box {...rest}>
            {type === 'inline' && (
                <Box>
                    <Button
                        component='label'
                        //@ts-expect-error 'using <label>'
                        htmlFor={inputId}
                        variant='contained'
                        size='small'
                        color='primary'
                        className='shadow-xs'
                        sx={{ ...uploaderBtnSx }}
                    >
                        {uploaderBtnText}
                        <input
                            ref={inputRef}
                            id={inputId}
                            name={name}
                            type='file'
                            hidden
                            multiple={multiple}
                            accept={accept}
                            onClick={onInputClickHandler}
                            onChange={onInputChangeHandler}
                        />
                    </Button>
                </Box>
            )}
            {type === 'outline' && (
                <DashedBorder
                    bgcolor='neutral.light4'
                    borderWidth={2}
                    borderColor={isDragging ? 'primary' : 'neutral.light2'}
                    borderRadius={12}
                    strokeDasharray='10 5'
                    strokeDashoffset='0'
                >
                    <Stack
                        ref={dragContainerRef}
                        bgcolor='transparent'
                        p={8}
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        onDragEnter={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault();
                            const isSameNode = dragContainerRef.current.isEqualNode(e.target as HTMLElement);
                            if (isSameNode) {
                                //? onDragLeave can fire even when we leave any of child element while we dragging so we make sure we only care about leaving drag container node.
                                setIsDragging(false);
                            }
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            onFilesChange(e.dataTransfer.files || []);
                        }}
                        sx={{ ...outlineBoxSx }}
                    >
                        <Image
                            src={titleImgSrc}
                            alt='file-uploader'
                            width={200}
                            height={200}
                            style={{
                                maxWidth: '90%',
                                width: 'auto',
                                height: '60px',
                                marginBottom: '8px'
                            }}
                        />
                        {!!title && (
                            <Typography component='h6' mb={2} variant='bodyMd' color='neutral.dark4' align='center'>
                                {title}
                            </Typography>
                        )}
                        <Button
                            component='label'
                            //@ts-expect-error 'using <label>'
                            htmlFor={inputId}
                            variant='contained'
                            size='small'
                            color='primary'
                            className='shadow-xs'
                            sx={{ ...uploaderBtnSx }}
                        >
                            {uploaderBtnText}
                            <input
                                ref={inputRef}
                                id={inputId}
                                name={name}
                                type='file'
                                hidden
                                multiple={multiple}
                                accept={accept}
                                onClick={onInputClickHandler}
                                onChange={onInputChangeHandler}
                            />
                        </Button>
                        {!!description && (
                            <Box mt={3} typography='bodySm' color='neutral.main' textAlign='center'>
                                {!isDragging ? description : 'Dropping ...'}
                            </Box>
                        )}
                    </Stack>
                </DashedBorder>
            )}
            <FormHelperText
                error={error}
                sx={{ mt: 1, ml: 2, typography: 'labelMd', color: error ? 'error.main' : 'neutral.dark2' }}
            >
                {helperText}
            </FormHelperText>
            {!!(showPreviews && previews.length) && (
                <List sx={{ mt: 2 }}>
                    {previews.map((preview, idx) => (
                        <Fragment key={preview.id}>
                            <ListItem sx={{ px: 0 }}>
                                <Stack width={1} justifyContent='space-between' alignItems='center' gap={2}>
                                    <Stack alignItems='center' gap={2} flexGrow={1}>
                                        {preview.imgSrc && (
                                            <a target='_blank' href={preview.imgSrc}>
                                                <Image
                                                    src={preview.imgSrc}
                                                    alt={preview.name}
                                                    width={150}
                                                    height={150}
                                                    style={{
                                                        width: 'auto',
                                                        height: 'auto',
                                                        maxWidth: '80px',
                                                        maxHeight: '80px',
                                                        borderRadius: '8px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </a>
                                        )}
                                        {preview.icon && <Icon icon={preview.icon} size='xl' />}
                                        <Typography
                                            component='span'
                                            variant='labelMd'
                                            color='neutral.dark4'
                                            maxWidth={1}
                                            className='line-clamp-1 break-all'
                                        >
                                            {preview.name}
                                        </Typography>
                                    </Stack>
                                    {previewsClearable && (
                                        <IconButton
                                            type='button'
                                            size='small'
                                            onClick={() => onPreviewClearHandler(preview.id)}
                                        >
                                            <Icon
                                                icon='mdi:close'
                                                color='error'
                                                size='sm'
                                                className='pointer-events-none'
                                            />
                                        </IconButton>
                                    )}
                                </Stack>
                            </ListItem>
                            {idx < previews.length - 1 && (
                                <Divider component='li' sx={{ width: 1, borderColor: 'neutral.light4' }} />
                            )}
                        </Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
}

//? Usage:
//* #1: multiple:false with important props:
// const [files, setFiles] = useState<FileId[]>([]);
// const [previews, setPreviews] = useState<Preview[]>([]);
// <FileUploader type='inline' mode='override' multiple={false} onChange={(newFiles) => setFiles(newFiles)}
//     accept='image/*' showPreviews previewsClearable previews={previews} onPreviewsChange={(newPreviews) => setPreviews(newPreviews)}
//     title='Title' uploaderBtnText='Select' description='Description'
//     uploaderBtnSx={{bgcolor: 'warning.main'}} outlineBoxSx={{bgcolor: 'primary.main'}} mt={5}
// />
//* #2: multiple:true with react-hook-form validation:
// const [previews, setPreviews] = useState<Preview[]>([]);
// const { handleSubmit, reset, control } = useForm<{ files: FileId[] }>({defaultValues: {files: []}});
// const onSubmit = (data: { files: FileId[] }) => {
//     reset();
//     setPreviews([]);
// };
// <Form onSubmit={handleSubmit(onSubmit)}>
//     <Controller control={control} name='files'
//         rules={{
//             validate: (files) => {
//                 if (!files.length) return 'required';
//                 else if (files.length > 5) return 'max is 5 files';
//                 else if (files.find((file) => file.file.size > 1024 * 1024)) return 'files should have 1mb max size ';
//                 return true;
//             }
//         }}
//         render={({ field, fieldState }) => (
//             <FileUploader type='outline' mode='append' multiple={true}
//                 onChange={(newFiles) => field.onChange(newFiles)}
//                 showPreviews previewsClearable previews={previews} onPreviewsChange={(newPreviews) => setPreviews(newPreviews)}
//                 error={!!fieldState.error} helperText={fieldState.error?.message}
//             />
//         )}
//     />
//     <button>submit</button>
// </Form>
