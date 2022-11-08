import { XlsxTransformer } from './transformer_factory';
import { IUnzipperFile } from '../common/interfaces';

/**
 * Processes sharedstrings of an XLSX document
 */
export class SharedStringsTransformer extends XlsxTransformer {
    constructor() {
        super();
    }

    transform( entry: IUnzipperFile ): Promise<IUnzipperFile> {
        return new Promise( async (resolve, reject) => {
            const xmlTags = [ 'sst' ];
            const result = await this.parseXML( entry, xmlTags );
            entry._xlsxDoc.sharedStrings = result.sst[0].si;
            resolve( entry );
        });
    }
}