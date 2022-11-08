export interface ICell extends ICellCoord {
    content: string | number;
}
interface ICellCoord {
    rowNum: number;
    colNum: number;
    colLetter: string;
}
/**
 * Spreadsheet Cell
 * @returns {Cell}
 */
export declare class Cell {
    rowNum: number;
    colNum: number;
    colLetter: string;
    content: string | number;
    height: number | null;
    width: number | null;
    /**
     * Constructs Cell instance from cell letter
     * @param {string} cellLetter - Cell letter, i.e, A3
     * @constructor
     */
    constructor(cellLetter: string);
    /**
     * Constructs Cell instance from column and row numbers.
     * Numbers start at 1, just like a spreadsheet.
     * @param {number} col - Cell column number
     * @param {number} row - Cell row number
     * @constructor
     */
    constructor(col: number, row: number);
    /**
     * Takes column and row number of a cell and returns the
     * cell coordinate in letter form. (i.e, 27,3 returns AA3)
     * @param {number} col - Column number
     * @param {number} tow - Row number
     * @returns {ICellCoord} Cell coordinate
     */
    static fromColRow(col: number, row: number): ICellCoord;
    /**
     * Takes letter coordinate of a cell and returns the
     * column and row number. (i.e, AA3 returns 27,3)
     * @param {string} cell - Cell letter coordinate
     * @returns {ICellCoord} Cell coordinate
     */
    static fromLetter(cell: string): ICellCoord;
}
export declare enum CellType {
    boolean = "b",
    date = "d",
    error = "e",
    number = "n",
    inlineStr = "inlineStr",
    sharedString = "s",
    str = "str",
    function = "f"
}
export {};
