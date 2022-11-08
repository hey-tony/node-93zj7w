import * as Unzipper from 'unzipper';
import { Readable, Transform } from 'stream';
import * as merge from 'lodash.merge';
import { 
  XlsxTransformerFactory, 
  TransformerType 
} from './transformers/transformer_factory';
import {
  PassThroughTransformer,
  SharedStringsTransformer,
  WorkbookTransformer,
  WorksheetTransformer,
} from './transformers';

import { 
  Constructable,
  IUnzipperFile,
  IXlsxDocument,
  IXlsxTransformer, 
} from './common/interfaces';


export default class XlsxParser {

  private transformerFactory: XlsxTransformerFactory;

  private xlsxDoc: IXlsxDocument = {
    sharedStrings: [],
    refs: {},
    sheets: []
  };

  constructor() {
    this.transformerFactory = new XlsxTransformerFactory();
    this.registerTransformers();
  }

  /**
   * Takes in a readable XML file stream and returns a 
   * XLSX document with in a promise.
   * @param {Readable} xlsxStream - XML file stream
   * @returns {Promise<IXlsxDocument>} promise
   */
  parse(xlsxStream: Readable): Promise<IXlsxDocument> {
    const finishEvent = 'finish';
    const dataEvent = 'data';

    return new Promise( (resolve, reject) => {
      xlsxStream
        .pipe( Unzipper.Parse() )
        .pipe( this.parseEntries() )
        .on( dataEvent, ( data ) => {
          merge( this.xlsxDoc, data._xlsxDoc );
        })
        .on( finishEvent, () => {
          resolve( this.xlsxDoc );
        });
    });
  }

  /**
   * Returns a transform pipe to process
   * streamed XML files
   * @returns {Transform} Transform pipe
   */
  private parseEntries(): Transform {
    const { 
      getTransformerType, 
      transformerFactory,
      xlsxDoc
    } = this;

    return new Transform({
      readableObjectMode: true,
      writableObjectMode: true,
      transform( fileEntry: IUnzipperFile, _, callback ) {
        const fileType = getTransformerType( fileEntry.path );
        const transformer = transformerFactory.createTransformer( fileType );
        const update = ( data ) => {
          this.push( data );
          callback();
        };

        fileEntry._xlsxDoc = {
          ...xlsxDoc
        };

        transformer
          .transform( fileEntry )
          .then( (data: IUnzipperFile) => update( data ) )
          .catch( ( err ) => {
            this.push( fileEntry );
            callback();
          });
      }
    });
  }

  /**
   * Registers list of available file transformers
   * for the transformer factory.
   */
  private registerTransformers(): void {
    const transformers: [ TransformerType, Constructable<IXlsxTransformer> ][] = [
      [ TransformerType.Workbook, WorkbookTransformer ],
      [ TransformerType.PassThrough, PassThroughTransformer ],
      [ TransformerType.Worksheet, WorksheetTransformer ],
      [ TransformerType.SharedStrings, SharedStringsTransformer ]
      // Can add more transformers as needed, i.e, file validation
      // Writing a mini library for Dependency Injection would be ideal
      // but outside scope of this test.
    ];

    transformers.forEach( transformer => {
      const [ type, func ] = transformer;
      this.transformerFactory?.registerTransformer( type, func );
    });
  }

  /**
   * Returns a document transformer type based on the 
   * fixed XML document path structure. 
   * (i.e, paths like /xl and /_rels )
   * @param {string} path - XML file path
   * @returns {TransformerType} transformer to process file
   */
  getTransformerType( path: string ): TransformerType {
    const defaultType = TransformerType.PassThrough;
    const isValid = ( val ) => Object.values( TransformerType ).includes( val );

    let filePath = path.match(/^[a-zA-Z_\/\[\]]{0,20}/);

    if ( filePath && isValid( filePath[0] ) ) {
      return filePath[0] as TransformerType;
    }

    return defaultType;
  }
}