import { XlsxTransformer } from './transformer_factory';
import { IUnzipperFile } from '../common/interfaces';
/**
 * Processes sharedstrings of an XLSX document
 */
export declare class SharedStringsTransformer extends XlsxTransformer {
    constructor();
    transform(entry: IUnzipperFile): Promise<IUnzipperFile>;
}
