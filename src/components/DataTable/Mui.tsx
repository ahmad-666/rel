'use client';

import { type SxProps, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGridPro, type DataGridProProps, type GridValidRowModel } from '@mui/x-data-grid-pro';
import Button from '@/components/Button/Mui';
import { LicenseInfo } from '@mui/x-license';
import envs from '@/configs/env';

type Props<Row extends GridValidRowModel> = Omit<DataGridProProps<Row>, 'onPaginationModelChange'> & {
    /** fires anytime we change pagination of data table  */
    onPaginationModelChange?: ({ page, pageSize }: { page: number; pageSize: number }) => void;
    /** max height of data table flex container ... if we use "auto" then we disable data table virtualization */
    maxHeight?: number | string;
    /** sx of data table flex container */
    containerSx?: SxProps<Theme>;
};

LicenseInfo.setLicenseKey(envs.muiProLicenseKey);

const DataTable = <Row extends GridValidRowModel>({
    columns = [],
    rows = [],
    loading = false,
    columnHeaderHeight = 32,
    rowHeight = 50,
    pagination = false, //enable/show pagination
    paginationMode = 'client',
    rowCount = 0, //total number of records used by pagination ... only pass for paginationMode:'server'
    pageSizeOptions = [10, 20, 50, 100],
    paginationModel = { page: 1, pageSize: 10 }, //e.g {page,pageSize} ... mui DataGrid used 0 based index for page so we manually need to convert it
    onPaginationModelChange,
    slots,
    slotProps,
    maxHeight = '75vh', //if we use "auto" then we disable data table virtualization
    containerSx, //top container sx
    sx, //data table sx
    ...rest
}: Props<Row>) => {
    const totalRecords = paginationMode === 'server' ? rowCount : rows.length;
    const totalPages = Math.ceil(totalRecords / paginationModel.pageSize);
    const isFirstPage = paginationModel.page === 1;
    const isLastPage = totalPages === 0 || paginationModel.page === totalPages;
    const startRowIndex = (paginationModel.page - 1) * paginationModel.pageSize + 1;
    const endRowIndex = Math.min(startRowIndex + paginationModel.pageSize - 1, totalRecords);
    const onPrevPage = () => {
        onPaginationModelChange?.({ page: Math.max(1, paginationModel.page - 1), pageSize: paginationModel.pageSize });
    };
    const onNextPage = () => {
        onPaginationModelChange?.({
            page: Math.min(paginationModel.page + 1, totalPages),
            pageSize: paginationModel.pageSize
        });
    };

    return (
        <Box sx={{ ...containerSx }}>
            <Stack display='flex' direction='column' maxHeight={maxHeight}>
                <DataGridPro
                    columns={columns}
                    rows={rows}
                    loading={loading}
                    columnHeaderHeight={columnHeaderHeight}
                    rowHeight={rowHeight}
                    hideFooter={true}
                    pagination={pagination}
                    paginationMode={paginationMode}
                    rowCount={paginationMode === 'server' ? totalRecords : undefined}
                    // onRowCountChange={newRowCount=>{}}
                    pageSizeOptions={pageSizeOptions}
                    paginationModel={{ page: paginationModel.page - 1, pageSize: paginationModel.pageSize }}
                    // for prevent duplicated pagination update we don't add onPaginationModelChange prop and define onClick event on custom pagination
                    // onPaginationModelChange={(newPagination) =>
                    //     onPaginationModelChange?.({ page: newPagination.page + 1, pageSize: newPagination.pageSize })
                    // }
                    slots={{
                        // footer: pagination ? (props) => <Box {...props}></Box> : undefined, //footer will render inside data-table so we totally move pagination part to outside of data-table
                        noRowsOverlay: (props) => (
                            //rows are empty
                            <Stack height={1} justifyContent='center' alignItems='center' {...props}>
                                <Typography component='p' variant='labelLg' color='neutral.dark4' align='center'>
                                    No Rows Available
                                </Typography>
                            </Stack>
                        ),
                        noResultsOverlay: (props) => (
                            //filter result is empty
                            <Stack height={1} justifyContent='center' alignItems='center' {...props}>
                                <Typography component='p' variant='labelLg' color='neutral.dark4' align='center'>
                                    No Result Found
                                </Typography>
                            </Stack>
                        ),
                        ...slots
                    }}
                    slotProps={{
                        loadingOverlay: {
                            noRowsVariant: 'skeleton', //when loading:true and we don't have any rows in table
                            variant: 'linear-progress' //when loading:true and we have rows in table
                        },
                        ...slotProps
                    }}
                    sx={{
                        border: 1,
                        borderColor: 'neutral.light3',
                        borderRadius: 3,
                        '& .MuiDataGrid-columnHeaders': {
                            '& .MuiDataGrid-columnHeader': {
                                //* change height of headers via 'columnHeaderHeight' prop
                                typography: 'labelMd',
                                color: 'neutral.main',
                                bgcolor: 'neutral.light4',
                                '&:focus, &:focus-within': {
                                    outline: 'none' //disable focus state on headers
                                }
                            },
                            '& .MuiDataGrid-filler,& .MuiDataGrid-scrollbarFiller': {
                                bgcolor: 'neutral.light4'
                            }
                        },
                        '& .MuiDataGrid-virtualScrollerContent': {
                            '& .MuiDataGrid-row': {
                                '& .MuiDataGrid-cell': {
                                    //* change height of cells via 'rowHeight','getRowHeight' prop
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    lineHeight: 'normal',
                                    typography: 'labelMd',
                                    color: 'neutral.dark4',
                                    borderColor: 'neutral.light3',
                                    '&:focus, &:focus-within': {
                                        outline: 'none' //disable focus state on headers
                                    }
                                }
                            }
                        },
                        '& .MuiDataGrid-footerContainer': {
                            '& .MuiTablePagination-root': {
                                '& .MuiTablePagination-select,.MuiTablePagination-selectLabel': {
                                    display: 'inline-flex'
                                }
                            }
                        },
                        ...sx
                    }}
                    {...rest}
                />
            </Stack>
            {pagination && (
                <Stack
                    mt={3}
                    direction={{
                        mobile: 'column',
                        tablet: 'row'
                    }}
                    justifyContent='space-between'
                    alignItems={{ mobile: 'flex-start', tablet: 'center' }}
                    gap={2}
                >
                    <Typography component='p' variant='bodySm' color='neutral'>
                        {startRowIndex} - {endRowIndex} out of {totalRecords}
                    </Typography>
                    <Stack gap={2}>
                        <Button
                            disabled={isFirstPage || loading}
                            variant='outlined'
                            bgColor='white'
                            textColor='neutral.dark4'
                            borderColor='neutral.light4'
                            outlineColor='neutral.dark4'
                            onClick={onPrevPage}
                            className='shadow-xs'
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={isLastPage || loading}
                            variant='outlined'
                            bgColor='white'
                            textColor='neutral.dark4'
                            borderColor='neutral.light4'
                            outlineColor='neutral.dark4'
                            onClick={onNextPage}
                            className='shadow-xs'
                        >
                            Next
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Box>
    );
};

export default DataTable;

//? Usage:
//* #1: Set columns,rows,other important props:
// import {type GridColDef} from '@mui/x-data-grid-pro';
// type User = {id: string;name: string;age: number;status: boolean;};
// const users: User[] = Array.from({ length: 100 }, (_, i) => ({
//     id: `${i}`,name: `name-${i}`,age: i * 10,status: Math.random() < 0.5
// }));
// const columns = useMemo<GridColDef<User>[]>(()=>{
//    return [
//         {
//             type: 'string', //string,number,boolean,date,datetime,actions,singleSelect
//             field: 'name',
//             headerName: 'Name',
//             align: 'left',
//             headerAlign: 'left',
//             width: 200,
//             minWidth: 100,
//             maxWidth: 300,
//             colSpan: 1,
//             flex: 1, //act as flex-grow for filling empty spaces ... normally use on last column with combination of min-width
//             description: 'description',
//             sortable: true,
//             filterable: true,
//             editable: true,
//             resizable: true,
//             groupable: true,
//             pinnable: true,
//             hideable: true,
//             hideSortIcons: true,
//             disableColumnMenu: false,
//             disableExport: false,
//             valueFormatter: (val, row, header, tableRef) => val, //only for showing in ui
//             valueGetter: (val, row, header, tableRef) => val, //will be used for filtering,sorting,... , also can be used for rendering unless we set valueFormatter,renderCell
//             renderCell: ({ id, colDef, field, value, row, api, ...rest }) => value, //custom jsx for cell
//             renderHeader: ({ colDef, field }) => field, //custom jsx for header
//             cellClassName: 'cell-class-name', //we can use --> <DataTable sx={{'.cell-class-name':{color:'red'}}} />
//             headerClassName: 'header-class-name' //we can use --> <DataTable sx={{'.cell-class-name':{color:'red'}}} />
//         },
//         {type: 'number',field: 'age',headerName: 'Age'},
//         {
//             type: 'boolean',field: 'status',headerName: 'Status',flex: 1,
//             renderCell: ({ value }) => value ? <Icon icon='mdi:check' color='success' /> : <Icon icon='mdi:close' color='error' />
//         }
//     ];
// },[])
{
    /* <DataTable getRowId={(row) => row.id} columns={columns} rows={users}
    maxHeight={500} //if we use 'auto' we disable virtualization
    disableVirtualization={false}
    rowHeight={50} //fixed row height
    getRowHeight={() => 'auto'} //dynamic row height
    columnHeaderHeight={45}
    disableColumnResize
    disableColumnMenu={false} onMenuOpen={()=>{}} onMenuClose={()=>{}}
    loading={true} //make table to go to loading state
    showCellVerticalBorder showColumnVerticalBorder
    onRowClick={} onRowDoubleClick={}
    onColumnHeaderClick={} onColumnHeaderDoubleClick={} onColumnResize={}
    onCellClick={} onCellDoubleClick={}
    sx={{'& .cell-class-name': {color: 'red'}}}
    containerSx={{width: 1 / 2,my: 20,mx: 'auto'}}
/> */
}
//* #2: Usings sorts,filters,pagination,selections:
// import {type GridSortModel,type GridFilterModel,type GridRowSelectionModel,type GridPaginationModel} from '@mui/x-data-grid-pro';
// const [sort, setSort] = useState<GridSortModel>([]); //e.g [{field: 'name', sort: 'desc'}]
// const [filter, setFilter] = useState<GridFilterModel>(); //e.g {items:[{field: 'name', operator: 'contains',value: 'search'}]}
// const [search, setSearch] = useState('');
// const quickFilter = useMemo<GridFilterModel>(() => {
//     return {items: [],quickFilterValues: [search],quickFilterExcludeHiddenColumns: true};
// }, [search]);
// const [selections, setSelections] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });
// const [pagination, setPagination] = useState<GridPaginationModel>({ page: 1, pageSize: 10 }); //GridPaginationModel.page starts at 0 and we need to convert it
{
    /* <Textfield value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' /> */
}
{
    /* <DataTable 
    ? Sorting:
    sortingMode='client'
    disableColumnSorting={false}
    disableMultipleColumnsSorting={false}
    sortModel={sort}
    onSortModelChange={(newSort) => setSort(newSort)}
    ? Filtering:
    filterMode='client'
    disableColumnFilter={false}
    disableMultipleColumnsFiltering={false}
    filterModel={quickFilter} //for quick filter --> if we are going to use quick filter we should disable column filter with disableColumnFilter and no need to pass onFilterModelChange
    filterModel={filter} //for column filter
    onFilterModelChange={(newFilter) => setFilter(newFilter)}
    filterDebounceMs={300}
    ? Selection: 
    rowSelection={true}
    rowSelectionModel={selections}
    onRowSelectionModelChange={(newSelections) => setSelections(newSelections)}
    checkboxSelection={true} //show extra checkbox column
    disableRowSelectionOnClick={false} //prevent selecting when clicking on whole row
    disableMultipleRowSelection={false} //prevent multiple selection
    ? Pagination:
    pagination={true} //on free version it's enabled by default and cannot be disabled, on pro version it's disabled by default and we need to manually enable it
    paginationMode='client'
    hideFooterPagination={false}
    rowCount={users.length} //total number of records ... on client pagination we should not set it because its same as rows.length and on server pagination we must always set it
    onRowCountChange={(newRowCount) => {}}
    paginationModel={{ page: pagination.page - 1, pageSize: pagination.pageSize }}
    onPaginationModelChange={(newPagination) => {
        setPagination({ page: newPagination.page + 1, pageSize: newPagination.pageSize });
    }}
    pageSizeOptions={[10, 20]} //[{value:10,label:'10'},{value:20,label:'20'}]
/> */
}
//* #3: Usings ready state,apiRef,slots,slotProps,Footer,Toolbar:
// import {useGridApiRef,type GridApiPro} from '@mui/x-data-grid-pro';
// const tableRef = useGridApiRef(); // OR useRef<GridApiPro>(null!) ... 'ref' prop is just html root element
// --> tableRef.current?.updateRows([{ id, status: 'new status' }]);
// const [isReady, setIsReady] = useState(false); //after we update table data we should set it to false
// const {
//     rootElementRef,getColumnHeaderElement,getRowElement,getCellElement, //? DOM nodes
//     getColumn,getAllColumns,getRow,getAllRowIds, //? get data about rows,cols
//     sortColumn,getSortModel,applySorting, //? sort
//     setPage,setPageSize,setPaginationModel, //? pagination
//     setFilterModel, //? filter
//     selectRow,selectRows,setRowSelectionModel,getSelectedRows, //? selection
//     showColumnMenu,hideColumnMenu, //? menu
//     exportDataAsCsv, //? export,
//     scrollToIndexes({rowIndex,colIndex})
// } = ref?.current || {}
{
    /* <DataTable
    apiRef={tableRef}
    onStateChange={() => setIsReady(true)}
    slots={{
        //? we can customize every single jsx part of table like filter,pagination,sort,selection,menu,toolbar,loading,no-result,...
        noRowsOverlay: (props) => <Box {...props}> no rows </Box>,
        noResultsOverlay: (props) => <Box {...props}> no result </Box>,
        footer: (props) => <Box {...props}> footer </Box>
    }}
    slotProps={{
        //? for tweak props of slots parts
        loadingOverlay: {
            variant: 'circular-progress', //when loading:true and we have rows in table
            noRowsVariant: 'skeleton' //when loading:true and we don't have any rows in table
        }
    }}
    hideFooter={false}
    hideFooterRowCount={false}
    hideFooterSelectedRowCount={false}
    showToolbar //show filters,columns visibility,exports,...
/>; */
}
