"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unzipper = require("unzipper");
const stream_1 = require("stream");
const merge = require("lodash.merge");
const transformer_factory_1 = require("./transformers/transformer_factory");
const transformers_1 = require("./transformers");
class XlsxParser {
    transformerFactory;
    xlsxDoc = {
        sharedStrings: [],
        refs: {},
        sheets: []
    };
    constructor() {
        this.transformerFactory = new transformer_factory_1.XlsxTransformerFactory();
        this.registerTransformers();
    }
    /**
     * Takes in a readable XML file stream and returns a
     * XLSX document with in a promise.
     * @param {Readable} xlsxStream - XML file stream
     * @returns {Promise<IXlsxDocument>} promise
     */
    parse(xlsxStream) {
        const finishEvent = 'finish';
        const dataEvent = 'data';
        return new Promise((resolve, reject) => {
            xlsxStream
                .pipe(Unzipper.Parse())
                .pipe(this.parseEntries())
                .on(dataEvent, (data) => {
                merge(this.xlsxDoc, data._xlsxDoc);
            })
                .on(finishEvent, () => {
                resolve(this.xlsxDoc);
            });
        });
    }
    /**
     * Returns a transform pipe to process
     * streamed XML files
     * @returns {Transform} Transform pipe
     */
    parseEntries() {
        const { getTransformerType, transformerFactory, xlsxDoc } = this;
        return new stream_1.Transform({
            readableObjectMode: true,
            writableObjectMode: true,
            transform(fileEntry, _, callback) {
                const fileType = getTransformerType(fileEntry.path);
                const transformer = transformerFactory.createTransformer(fileType);
                const update = (data) => {
                    this.push(data);
                    callback();
                };
                fileEntry._xlsxDoc = {
                    ...xlsxDoc
                };
                transformer
                    .transform(fileEntry)
                    .then((data) => update(data))
                    .catch((err) => {
                    this.push(fileEntry);
                    callback();
                });
            }
        });
    }
    /**
     * Registers list of available file transformers
     * for the transformer factory.
     */
    registerTransformers() {
        const transformers = [
            [transformer_factory_1.TransformerType.Workbook, transformers_1.WorkbookTransformer],
            [transformer_factory_1.TransformerType.PassThrough, transformers_1.PassThroughTransformer],
            [transformer_factory_1.TransformerType.Worksheet, transformers_1.WorksheetTransformer],
            [transformer_factory_1.TransformerType.SharedStrings, transformers_1.SharedStringsTransformer]
            // Can add more transformers as needed, i.e, file validation
            // Writing a mini library for Dependency Injection would be ideal
            // but outside scope of this test.
        ];
        transformers.forEach(transformer => {
            const [type, func] = transformer;
            this.transformerFactory?.registerTransformer(type, func);
        });
    }
    /**
     * Returns a document transformer type based on the
     * fixed XML document path structure.
     * (i.e, paths like /xl and /_rels )
     * @param {string} path - XML file path
     * @returns {TransformerType} transformer to process file
     */
    getTransformerType(path) {
        const defaultType = transformer_factory_1.TransformerType.PassThrough;
        const isValid = (val) => Object.values(transformer_factory_1.TransformerType).includes(val);
        let filePath = path.match(/^[a-zA-Z_\/\[\]]{0,20}/);
        if (filePath && isValid(filePath[0])) {
            return filePath[0];
        }
        return defaultType;
    }
}
exports.default = XlsxParser;
