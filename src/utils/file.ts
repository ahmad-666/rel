import { write, read, readFile, utils } from 'xlsx';

//? Basics ------------------------------------------
export const mimeToIcon = (mime: string) => {
    //we use vs-code icon pack which has color too
    if (mime.includes('image')) return 'vscode-icons:file-type-image';
    else if (mime.startsWith('video')) return 'vscode-icons:file-type-video';
    else if (mime === 'text/plain') return 'vscode-icons:file-type-text';
    else if (mime === 'application/pdf') return 'vscode-icons:file-type-pdf2';
    else if (
        mime === 'application/msword' ||
        mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
        return 'vscode-icons:file-type-word';
    else if (
        mime === 'application/vnd.ms-powerpoint' ||
        mime === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    )
        return 'vscode-icons:file-type-powerpoint';
    else if (
        mime === 'text/csv' ||
        mime === 'application/vnd.ms-excel' ||
        mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
        return 'vscode-icons:file-type-excel';
    else return 'vscode-icons:default-folder'; //default icon if mime not found
};
export const downloadFile = ({ blob, filename, extension }: { blob: Blob; filename: string; extension: string }) => {
    const url = URL.createObjectURL(blob); //generate url from blob which can be use on <a href /> , <img src />
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${extension}`;
    link.click();
    link.remove();
};
//? Excel -------------------------------------

//? get excel rows count from path
export const getExcelRowsCountFromPath = (filePath: string) => {
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const range = utils.decode_range(worksheet['!ref']!);
    const rows = range.e.r + 1; // range.e.r is the last row index, so add 1 to get the count
    return rows;
};

//? get excel file rows/rows count from file
//? Usage: <input type='file' onChange={async (e) => {await parseExcelFile(e.target.files[0])}} />
export const parseExcelFile = (file: File): Promise<{ rows: unknown[][]; rowsCount: number }> => {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const result = e.target?.result;
                if (result) {
                    const data = new Uint8Array(result as ArrayBuffer);
                    const workbook = read(data, {
                        type: 'array',
                        codepage: 65001 // ensures UTF-8 decoding
                    });
                    const firstSheetName = workbook.SheetNames[0]; //first sheet name
                    const sheet = workbook.Sheets[firstSheetName]; //first sheet
                    const jsonData = utils.sheet_to_json(sheet, { header: 1, defval: '---', blankrows: false });
                    //e.g consider this excel file:
                    /*
                    Name    Age
                    n1	    10
                    n2	    20
                    */
                    //jsonData will be --> [['Name','Age'],['n1',100],['n2',200]]
                    //each cell has content of one row so we can say 1st cell is list of headers(1st row) and after that each cell is content of one record
                    resolve({
                        rows: jsonData as unknown[][],
                        rowsCount: jsonData.length
                    });
                }
            };
            reader.readAsArrayBuffer(file);
        } else reject('No File was provided');
    });
};

//? Generate new excel file(.xlsx)
export const generateExcel = async ({
    data = [],
    colsWidth = []
}: {
    data: unknown[][];
    colsWidth?: number[]; //unit of each index is not 'px' and its character length of that columns
}): Promise<Blob> => {
    //data schema should be something like [['name','age'],['n1',10],['n2',20]] means first cell is array of headers and after each cell represent a row
    return new Promise((resolve, reject) => {
        try {
            const worksheet = utils.aoa_to_sheet(data); // Create a worksheet from the data
            const workbook = utils.book_new(); // Create a new workbook
            worksheet['!cols'] = colsWidth.map((w) => ({ wch: w }));
            utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' }); // Write workbook to binary data
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' }); // Create a Blob from the binary data
            resolve(blob);
        } catch (err: unknown) {
            reject((err as Error).message || 'Error happens generating excel file');
        }
    });
};
