import * as merge from 'lodash.merge';
import { alwaysArray } from '../common/utils';
import { XlsxTransformer } from './transformer_factory';
import { createWorkSheet } from './worksheet';

import { IUnzipperFile, IXlsxSheet } from '../common/interfaces';

/**
 * Processes workbook section of an XLSX document
 */
export class WorkbookTransformer extends XlsxTransformer {
    constructor() {
        super();
    }

    transform( entry: IUnzipperFile ): Promise<IUnzipperFile> {
        return new Promise( async (resolve, reject) => {
            const xmlTags = [ 'sheets' ];
            const result = await this.parseXML( entry, xmlTags );
            let xlsxSheets: IXlsxSheet[] = [];
            const sheets = result.sheets.length ? alwaysArray( result.sheets[0].sheet ): [];
            sheets.forEach( sheet => {
                const sheetRefId = 'r:id';
                let workSheet = createWorkSheet();
                workSheet = {
                    ...workSheet,
                    name: sheet.name,
                    sheetid: parseInt( sheet.sheetid ),
                    refId: sheet[ sheetRefId ]
                };
                xlsxSheets.push( workSheet );
            });
            merge( entry._xlsxDoc.sheets, xlsxSheets )
            resolve( entry );
        });
    }
}