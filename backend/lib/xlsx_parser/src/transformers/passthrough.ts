import { XlsxTransformer } from './transformer_factory';
import { IUnzipperFile } from '../common/interfaces';

/**
 * Noop transformer
 */
export class PassThroughTransformer extends XlsxTransformer {
    constructor() {
        super();
    }

    transform( entry: IUnzipperFile ): Promise<IUnzipperFile> {
        return new Promise( async (resolve, reject) => {
            resolve( entry );
        });
    }
}