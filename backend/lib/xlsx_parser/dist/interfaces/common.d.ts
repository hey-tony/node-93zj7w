import * as Unzipper from 'unzipper';
export interface IXmlFlowResult {
    $name?: string;
    $attrs?: {
        [key: string]: any;
    };
    $text?: string;
    [key: string]: any;
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
export interface ISheetDataCell {
    [key: string]: {
        [key: string]: string;
    }[];
}
export interface IUnzipperFile extends Unzipper.Entry {
    _xlsxDoc: IXlsxDocument;
}
export interface IXlsxMergedCell {
    range: string;
    height: number;
    width: number;
    content: any;
}
export interface IXlsxDocument {
    sharedStrings: [];
    refs: object;
    sheets: IXlsxSheet[];
}
export interface IXlsxSheet {
    name: string;
    sheetid: string;
    refId: string;
    mergedCells: IXlsxMergedCell[];
}
export interface IXlsxTransformer {
    transform: (stream: IUnzipperFile) => Promise<IUnzipperFile>;
}
export interface Constructable<T> {
    new (...args: any): T;
}
