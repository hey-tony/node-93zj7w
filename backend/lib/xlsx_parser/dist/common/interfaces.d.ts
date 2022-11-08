import * as Unzipper from 'unzipper';
export interface Constructable<T> {
    new (...args: any): T;
}
export interface ICell {
    rowNum: number;
    colNum: number;
    colLetter: string;
    content: string | number;
    height: number | null;
    width: number | null;
}
export interface IHashTable {
    [key: string]: any;
}
export interface ISheetDataCell {
    [key: string]: {
        [key: string]: string;
    }[];
}
export interface IUnzipperFile extends Unzipper.Entry {
    _xlsxDoc: IXlsxDocument;
}
export interface IWorksheetResult {
    cols: {
        min: string;
        max: string;
        width: string;
    };
    mergecells: {
        mergecell: string[];
        $attrs: {
            count: number;
        };
    };
    sheetdata: ISheetDataCell[];
}
export interface IXlsxDocument {
    sharedStrings: [];
    refs: object;
    sheets: IXlsxSheet[];
}
export interface IXlsxMergedCell {
    range: {
        start: ICell;
        end: ICell;
        text: string;
    };
    height: number | null;
    width: number | null;
    content: string | number;
}
export interface IXlsxSheet {
    name: string;
    sheetid: number;
    refId: string;
    mergedCells: IXlsxMergedCell[];
    rows: ICell[][];
}
export interface IXlsxTransformer {
    transform: (stream: IUnzipperFile) => Promise<IUnzipperFile>;
}
export interface IXmlData extends IHashTable {
    name: string;
    children: IXmlData[];
}
export interface IXmlFlowResult {
    [key: string]: IXmlFlowResultItem[];
}
export interface IXmlFlowResultItem extends IHashTable {
    $name?: string;
    $attrs?: {
        [key: string]: any;
    };
    $text?: string;
}
