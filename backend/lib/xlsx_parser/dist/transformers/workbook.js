"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkbookTransformer = void 0;
const merge = require("lodash.merge");
const utils_1 = require("../common/utils");
const transformer_factory_1 = require("./transformer_factory");
const worksheet_1 = require("./worksheet");
/**
 * Processes workbook section of an XLSX document
 */
class WorkbookTransformer extends transformer_factory_1.XlsxTransformer {
    constructor() {
        super();
    }
    transform(entry) {
        return new Promise(async (resolve, reject) => {
            const xmlTags = ['sheets'];
            const result = await this.parseXML(entry, xmlTags);
            let xlsxSheets = [];
            const sheets = result.sheets.length ? (0, utils_1.alwaysArray)(result.sheets[0].sheet) : [];
            sheets.forEach(sheet => {
                const sheetRefId = 'r:id';
                let workSheet = (0, worksheet_1.createWorkSheet)();
                workSheet = {
                    ...workSheet,
                    name: sheet.name,
                    sheetid: parseInt(sheet.sheetid),
                    refId: sheet[sheetRefId]
                };
                xlsxSheets.push(workSheet);
            });
            merge(entry._xlsxDoc.sheets, xlsxSheets);
            resolve(entry);
        });
    }
}
exports.WorkbookTransformer = WorkbookTransformer;
