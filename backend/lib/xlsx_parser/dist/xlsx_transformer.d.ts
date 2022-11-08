/// <reference types="node" />
import { Readable } from 'stream';
import { Constructable, IXlsxTransformer, IXmlFlowResult, IUnzipperFile } from './interfaces/common';
export declare enum TransformerType {
    PassThrough = "passthrough",
    SharedStrings = "xl/sharedStrings",
    Workbook = "xl/workbook",
    Worksheet = "xl/worksheets/sheet"
}
export declare class XlsxTransformerFactory {
    private readonly transformers;
    createTransformer(type: TransformerType): IXlsxTransformer;
    registerTransformer(type: TransformerType, func: Constructable<IXlsxTransformer>): void;
}
export declare abstract class XlsxTransformer implements IXlsxTransformer {
    parseXML(stream: Readable, xmlTag: string): Promise<IXmlFlowResult[]>;
    abstract transform(stream: IUnzipperFile): Promise<IUnzipperFile>;
}
