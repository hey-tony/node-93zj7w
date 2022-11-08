"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkSheet = exports.WorksheetTransformer = void 0;
const cell_1 = require("../grid/cell");
const utils_1 = require("../common/utils");
const transformer_factory_1 = require("./transformer_factory");
/**
 * Processes worksheet of an XLSX document
 * 18.3.1.99 of OpenXML spec.
 */
class WorksheetTransformer extends transformer_factory_1.XlsxTransformer {
    constructor() {
        super();
    }
    transform(entry) {
        return new Promise(async (resolve, reject) => {
            const ALWAYS = 1;
            const fileRegMatch = entry.path.match(/([0-9]+)\.xml$/);
            const sheetIndex = fileRegMatch ?
                parseInt(fileRegMatch[1]) - 1 : 0;
            const tags = [
                'sheetFormatPr',
                'sheetData',
                'cols',
                'mergeCells'
            ];
            const result = await this.parseXML(entry, tags, {
                strict: true,
                simplifyNodes: false,
                normalize: false,
                lowercase: false,
                preserveMarkup: ALWAYS,
            });
            const emptyResult = { children: [] };
            const sheetFormatPr = (0, utils_1.extractXmlData)(result.sheetFormatPr[0] || emptyResult);
            const colsData = (0, utils_1.extractXmlData)(result.cols[0] || emptyResult);
            let cols = {};
            if (colsData.children) {
                colsData.children.map(col => {
                    for (let i = col.min; i <= col.max; i++) {
                        cols[i] = col.width;
                    }
                });
            }
            const sheetData = (0, utils_1.extractXmlData)(result.sheetData[0] || emptyResult);
            const rows = sheetData.children.map(row => {
                const cells = row.children.map(item => {
                    const refId = item.r;
                    const height = item.ht ?? sheetFormatPr.defaultRowHeight;
                    const cell = new cell_1.Cell(refId);
                    const width = cols[cell.colNum] ?? sheetFormatPr.defaultColWidth;
                    cell.content = this.getCellContent(item);
                    cell.height = height;
                    cell.width = width;
                    return cell;
                });
                return cells;
            });
            let mergedCells = [];
            if (result.mergeCells.length) {
                mergedCells = this.getMergeCells(result.mergeCells[0], rows);
            }
            let sheet = entry._xlsxDoc.sheets[sheetIndex];
            if (!sheet) {
                sheet = (0, exports.createWorkSheet)();
                entry._xlsxDoc.sheets.push(sheet);
            }
            sheet.mergedCells = mergedCells;
            sheet.rows = rows;
            resolve(entry);
        });
    }
    /**
     * Process cell content, see:
     * OpenXML Spec:
     * 18.3.1.4
     * Annex A.2
     * @param {IxmlData} data - XML data representation of cell
     * @returns {string|number} cells content
     */
    getCellContent(data) {
        const cellType = data['$attrs'] && data['$attrs']['t'] || data.t;
        const parentTextStrings = (0, utils_1.getText)(data);
        let returnVal;
        data.children.some(child => {
            const childTextStrings = (0, utils_1.getText)(child);
            const value = childTextStrings.join('');
            if (cellType == cell_1.CellType.boolean) {
                returnVal = !!value ? 'TRUE' : 'FALSE';
            }
            if (cellType == cell_1.CellType.sharedString) {
                returnVal = `ss|${value}`;
            }
            if (cellType == cell_1.CellType.inlineStr) {
                returnVal = value;
            }
            // Pass along function and it's result (if any)
            const isFn = child.name == cell_1.CellType.function;
            if (isFn) {
                returnVal = `fn|${parentTextStrings.join('|')}`;
                // stop further processing
                return true;
            }
            // Numeric values have either CellType.number or no type
            if (cellType == cell_1.CellType.number) {
                returnVal = value.indexOf('.') === -1 ?
                    parseInt(value) :
                    parseFloat(value);
            }
            // no cell type defined
            returnVal = returnVal ?? value;
        });
        return returnVal;
    }
    /**
     * Gets information regarding merged cells in the document.
     * @param {IXmlFlowResultItem} xml - XmlFlow result item
     * @param {ICell[][]} rows - Collection of row cells
     * @returns {IXlsxMergedCell[]} Array of mergeds cells
     */
    getMergeCells(xml, rows) {
        const mergeCellsXml = (0, utils_1.extractXmlData)(xml);
        const mergedCells = mergeCellsXml.children.map(child => {
            const [startCellCoord, endCellCoord] = child.ref.split(':');
            const startCell = new cell_1.Cell(startCellCoord);
            const endCell = new cell_1.Cell(endCellCoord);
            const cellLookup = (colIndex, rowIndex) => {
                return rows[rowIndex - 1][colIndex - 1];
            };
            const cellContent = cellLookup(startCell.colNum, startCell.rowNum).content;
            let result = {
                range: {
                    text: child.ref,
                    start: startCell,
                    end: endCell
                },
                height: null,
                width: null,
                content: cellContent
            };
            let totalWidth = 0;
            for (let i = startCell.colNum; i < endCell.colNum; i++) {
                const row = startCell.rowNum;
                totalWidth += cellLookup(i, row).width || 0;
            }
            result.width = totalWidth;
            let totalHeight = 0;
            for (let i = startCell.rowNum; i < endCell.rowNum; i++) {
                const col = startCell.colNum;
                totalHeight += cellLookup(col, i).height || 0;
            }
            result.height = totalHeight;
            return result;
        });
        return mergedCells;
    }
}
exports.WorksheetTransformer = WorksheetTransformer;
/**
 * Creates empty worksheet
 * @returns {IXlsxSheet}
 */
const createWorkSheet = () => ({
    name: '',
    sheetid: 0,
    refId: '',
    mergedCells: [],
    rows: []
});
exports.createWorkSheet = createWorkSheet;
