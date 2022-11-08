"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsxTransformer = exports.XlsxTransformerFactory = exports.TransformerType = void 0;
const XmlFlow = require("xml-flow");
var TransformerType;
(function (TransformerType) {
    // ContentType = '[Content_Types]',
    TransformerType["PassThrough"] = "passthrough";
    TransformerType["SharedStrings"] = "xl/sharedStrings";
    TransformerType["Workbook"] = "xl/workbook";
    TransformerType["Worksheet"] = "xl/worksheets/sheet";
    // Can add new types as needed
    // the enum value is path of XML file
})(TransformerType = exports.TransformerType || (exports.TransformerType = {}));
/**
 * XLSX tranformer factory that uses a dictionary and not
 * logic branching (i.e, switch or if statements)
 * Concept works great with dependency injection.
 */
class XlsxTransformerFactory {
    transformers = {};
    /**
     * Factory method, uses transform type as key in lookup.
     * @param {TransformerType} type - Transformer type to create
     */
    createTransformer(type) {
        if (!type) {
            console.error(`Invalid transformer type. ("${type}")`);
        }
        const func = this.transformers[type];
        if (!func) {
            console.error(`Undefined transformer function. (${type})`);
        }
        return new func();
    }
    /**
     * Registers the transformer for later lookup.
     * @param {TransformerType} type - We key off enum for lookup
     * @param {Constructable<IXlsxTransformer>} func - Function to call when creating transformer.
     */
    registerTransformer(type, func) {
        this.transformers[type] = func;
    }
}
exports.XlsxTransformerFactory = XlsxTransformerFactory;
class XlsxTransformer {
    /**
     *
     */
    parseXML(stream, xmlTags, options) {
        return new Promise((resolve, reject) => {
            const opts = options ?? {};
            const xmlStream = XmlFlow(stream, opts);
            let data = {};
            xmlTags.forEach(tagName => {
                data[tagName] = [];
                xmlStream.on(`tag:${tagName}`, (result) => {
                    data[tagName].push(result);
                });
            });
            xmlStream
                .on('error', (error) => {
                console.error(error);
                reject(error);
            })
                .on('end', () => {
                resolve(data);
            });
        });
    }
}
exports.XlsxTransformer = XlsxTransformer;
