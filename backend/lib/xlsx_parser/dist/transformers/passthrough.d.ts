import { XlsxTransformer } from './transformer_factory';
import { IUnzipperFile } from '../common/interfaces';
/**
 * Noop transformer
 */
export declare class PassThroughTransformer extends XlsxTransformer {
    constructor();
    transform(entry: IUnzipperFile): Promise<IUnzipperFile>;
}
