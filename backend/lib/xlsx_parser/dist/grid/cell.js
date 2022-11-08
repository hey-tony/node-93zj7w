"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellType = exports.Cell = void 0;
const spreadsheet_1 = require("./spreadsheet");
/**
 * Spreadsheet Cell
 * @returns {Cell}
 */
class Cell {
    rowNum = 0;
    colNum = 0;
    colLetter = '';
    content = '';
    height = null;
    width = null;
    constructor(param1, param2) {
        let coord = null;
        if (typeof param1 === 'string') {
            coord = Cell.fromLetter(param1);
        }
        else if (typeof param1 === 'number' && typeof param2 === 'number') {
            coord = Cell.fromColRow(param1, param2);
        }
        else {
            throw ('Invalid cell identifier!');
        }
        this.colNum = coord.colNum;
        this.rowNum = coord.rowNum;
        this.colLetter = coord.colLetter;
    }
    /**
     * Takes column and row number of a cell and returns the
     * cell coordinate in letter form. (i.e, 27,3 returns AA3)
     * @param {number} col - Column number
     * @param {number} tow - Row number
     * @returns {ICellCoord} Cell coordinate
     */
    static fromColRow(col, row) {
        const rowNum = row;
        const colNum = col;
        const colLetter = spreadsheet_1.SpreadSheet.numberToLetter(col);
        return {
            rowNum,
            colNum,
            colLetter
        };
    }
    /**
     * Takes letter coordinate of a cell and returns the
     * column and row number. (i.e, AA3 returns 27,3)
     * @param {string} cell - Cell letter coordinate
     * @returns {ICellCoord} Cell coordinate
     */
    static fromLetter(cell) {
        const parts = cell.toUpperCase().match(/^([A-Z]+)(\d+)$/);
        if (!parts) {
            throw (`Invalid cell identifier: ${cell}`);
        }
        const rowNum = parseInt(parts[2]);
        const colNum = spreadsheet_1.SpreadSheet.letterToNumber(parts[1]);
        const colLetter = parts[1];
        return {
            rowNum,
            colNum,
            colLetter
        };
    }
}
exports.Cell = Cell;
var CellType;
(function (CellType) {
    CellType["boolean"] = "b";
    CellType["date"] = "d";
    CellType["error"] = "e";
    CellType["number"] = "n";
    CellType["inlineStr"] = "inlineStr";
    CellType["sharedString"] = "s";
    CellType["str"] = "str";
    CellType["function"] = "f";
})(CellType = exports.CellType || (exports.CellType = {}));
