interface CellCoord {
    rowNum: number;
    colNum: number;
    colLetter: string;
}
export declare class Cell {
    rowNum: number;
    colNum: number;
    colLetter: string;
    constructor(cellLetter: string);
    constructor(col: number, row: number);
    static fromColRow(col: any, row: any): CellCoord;
    static fromLetter(cell: any): CellCoord;
}
export {};
