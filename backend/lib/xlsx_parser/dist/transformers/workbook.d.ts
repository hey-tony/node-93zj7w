import { XlsxTransformer } from './transformer_factory';
import { IUnzipperFile } from '../common/interfaces';
/**
 * Processes workbook section of an XLSX document
 */
export declare class WorkbookTransformer extends XlsxTransformer {
    constructor();
    transform(entry: IUnzipperFile): Promise<IUnzipperFile>;
}
