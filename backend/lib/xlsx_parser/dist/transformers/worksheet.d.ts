import { XlsxTransformer } from './transformer_factory';
import { ICell, IUnzipperFile, IXlsxMergedCell, IXlsxSheet, IXmlData, IXmlFlowResultItem } from '../common/interfaces';
/**
 * Processes worksheet of an XLSX document
 * 18.3.1.99 of OpenXML spec.
 */
export declare class WorksheetTransformer extends XlsxTransformer {
    constructor();
    transform(entry: IUnzipperFile): Promise<IUnzipperFile>;
    /**
     * Process cell content, see:
     * OpenXML Spec:
     * 18.3.1.4
     * Annex A.2
     * @param {IxmlData} data - XML data representation of cell
     * @returns {string|number} cells content
     */
    getCellContent(data: IXmlData): string | number;
    /**
     * Gets information regarding merged cells in the document.
     * @param {IXmlFlowResultItem} xml - XmlFlow result item
     * @param {ICell[][]} rows - Collection of row cells
     * @returns {IXlsxMergedCell[]} Array of mergeds cells
     */
    getMergeCells(xml: IXmlFlowResultItem, rows: ICell[][]): IXlsxMergedCell[];
}
/**
 * Creates empty worksheet
 * @returns {IXlsxSheet}
 */
export declare const createWorkSheet: () => IXlsxSheet;
