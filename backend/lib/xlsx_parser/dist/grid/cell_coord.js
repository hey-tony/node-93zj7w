"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const spreadsheet_1 = require("./spreadsheet");
class Cell {
    rowNum = 0;
    colNum = 0;
    colLetter = '';
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
