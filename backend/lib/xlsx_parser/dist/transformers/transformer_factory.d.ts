/// <reference types="node" />
import { Readable } from 'stream';
import * as XmlFlow from 'xml-flow';
import { Constructable, IXlsxTransformer, IXmlFlowResult, IUnzipperFile } from '../common/interfaces';
export declare enum TransformerType {
    PassThrough = "passthrough",
    SharedStrings = "xl/sharedStrings",
    Workbook = "xl/workbook",
    Worksheet = "xl/worksheets/sheet"
}
/**
 * XLSX tranformer factory that uses a dictionary and not
 * logic branching (i.e, switch or if statements)
 * Concept works great with dependency injection.
 */
export declare class XlsxTransformerFactory {
    private readonly transformers;
    /**
     * Factory method, uses transform type as key in lookup.
     * @param {TransformerType} type - Transformer type to create
     */
    createTransformer(type: TransformerType): IXlsxTransformer;
    /**
     * Registers the transformer for later lookup.
     * @param {TransformerType} type - We key off enum for lookup
     * @param {Constructable<IXlsxTransformer>} func - Function to call when creating transformer.
     */
    registerTransformer(type: TransformerType, func: Constructable<IXlsxTransformer>): void;
}
export declare abstract class XlsxTransformer implements IXlsxTransformer {
    /**
     *
     */
    parseXML(stream: Readable, xmlTags: string[], options?: XmlFlow.parserOptions): Promise<IXmlFlowResult>;
    abstract transform(stream: IUnzipperFile): Promise<IUnzipperFile>;
}
