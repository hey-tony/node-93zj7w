import { Readable } from 'stream';
import * as XmlFlow from 'xml-flow';

import { 
    Constructable, 
    IXlsxTransformer,
    IXmlFlowResult,
    IUnzipperFile
} from '../common/interfaces';

interface ITransformerDict {
    [key: string]: Constructable<IXlsxTransformer>;
}

export enum TransformerType {
    // ContentType = '[Content_Types]',
    PassThrough = 'passthrough',
    SharedStrings = 'xl/sharedStrings',
    Workbook = 'xl/workbook',
    Worksheet = 'xl/worksheets/sheet'
    // Can add new types as needed
    // the enum value is path of XML file
}

/**
 * XLSX tranformer factory that uses a dictionary and not
 * logic branching (i.e, switch or if statements)
 * Concept works great with dependency injection.
 */
export class XlsxTransformerFactory {
    private readonly transformers: ITransformerDict = {};

    /**
     * Factory method, uses transform type as key in lookup.
     * @param {TransformerType} type - Transformer type to create
     */
    createTransformer( type: TransformerType ) {
        if ( !type ) {
            console.error(`Invalid transformer type. ("${type}")`);
        }

        const func: Constructable<IXlsxTransformer> = this.transformers[ type ];
        if ( !func ) {
            console.error(`Undefined transformer function. (${type})`);
        }
        return new func();
    }

    /**
     * Registers the transformer for later lookup.
     * @param {TransformerType} type - We key off enum for lookup
     * @param {Constructable<IXlsxTransformer>} func - Function to call when creating transformer.
     */
    registerTransformer( type: TransformerType, func: Constructable<IXlsxTransformer> ): void {
        this.transformers[ type ] = func;
    }
}

export abstract class XlsxTransformer implements IXlsxTransformer {
    /**
     * 
     */
    parseXML( stream: Readable, xmlTags: string[], options?: XmlFlow.parserOptions ): Promise<IXmlFlowResult> {
        return new Promise( (resolve, reject) => {
            const opts = options ?? {};
            const xmlStream = XmlFlow( stream, opts );
            let data: IXmlFlowResult = {};
            
            xmlTags.forEach( tagName => {
                data[ tagName ] = [];
                xmlStream.on( `tag:${tagName}`, ( result: IXmlFlowResult ) => {
                    data[ tagName ].push( result );
                });
            });

            xmlStream
                .on('error', ( error ) => {
                    console.error( error );
                    reject( error );
                })
                .on('end', () => {
                    resolve( data );
                }); 
            });        
    }
    abstract transform( stream: IUnzipperFile): Promise<IUnzipperFile>;
}