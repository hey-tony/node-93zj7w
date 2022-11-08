/// <reference types="node" />
import { Readable } from 'stream';
import { TransformerType } from './transformers/transformer_factory';
import { IXlsxDocument } from './common/interfaces';
export default class XlsxParser {
    private transformerFactory;
    private xlsxDoc;
    constructor();
    /**
     * Takes in a readable XML file stream and returns a
     * XLSX document with in a promise.
     * @param {Readable} xlsxStream - XML file stream
     * @returns {Promise<IXlsxDocument>} promise
     */
    parse(xlsxStream: Readable): Promise<IXlsxDocument>;
    /**
     * Returns a transform pipe to process
     * streamed XML files
     * @returns {Transform} Transform pipe
     */
    private parseEntries;
    /**
     * Registers list of available file transformers
     * for the transformer factory.
     */
    private registerTransformers;
    /**
     * Returns a document transformer type based on the
     * fixed XML document path structure.
     * (i.e, paths like /xl and /_rels )
     * @param {string} path - XML file path
     * @returns {TransformerType} transformer to process file
     */
    getTransformerType(path: string): TransformerType;
}
