"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedStringsTransformer = void 0;
const transformer_factory_1 = require("./transformer_factory");
/**
 * Processes sharedstrings of an XLSX document
 */
class SharedStringsTransformer extends transformer_factory_1.XlsxTransformer {
    constructor() {
        super();
    }
    transform(entry) {
        return new Promise(async (resolve, reject) => {
            const xmlTags = ['sst'];
            const result = await this.parseXML(entry, xmlTags);
            entry._xlsxDoc.sharedStrings = result.sst[0].si;
            resolve(entry);
        });
    }
}
exports.SharedStringsTransformer = SharedStringsTransformer;
