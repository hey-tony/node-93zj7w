import { SpreadSheet } from './spreadsheet';

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
export class Cell {
    rowNum = 0;
    colNum = 0;
    colLetter = '';
    content: string|number = '';
    height: number|null = null;
    width: number|null = null;
    
    /**
     * Constructs Cell instance from cell letter
     * @param {string} cellLetter - Cell letter, i.e, A3
     * @constructor
     */
    constructor( cellLetter: string );
    /**
     * Constructs Cell instance from column and row numbers.
     * Numbers start at 1, just like a spreadsheet.
     * @param {number} col - Cell column number
     * @param {number} row - Cell row number
     * @constructor
     */
    constructor( col: number, row: number );
    constructor( param1: string|number, param2?: number) {
        let coord: ICellCoord|null = null;
        
        if ( typeof param1 === 'string' ) {
            coord = Cell.fromLetter( param1 );
        }
        else if ( typeof param1 === 'number' && typeof param2 === 'number' ) {
            coord = Cell.fromColRow( param1, param2 );
        }
        else {
            throw('Invalid cell identifier!');
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
    static fromColRow( col: number, row: number ): ICellCoord {
        const rowNum = row;
        const colNum = col;
        const colLetter = SpreadSheet.numberToLetter( col );
        return {
            rowNum,
            colNum,
            colLetter
        }
    }
    
    /**
     * Takes letter coordinate of a cell and returns the
     * column and row number. (i.e, AA3 returns 27,3)
     * @param {string} cell - Cell letter coordinate
     * @returns {ICellCoord} Cell coordinate
     */
    static fromLetter( cell:string ): ICellCoord {
        const parts = cell.toUpperCase().match(/^([A-Z]+)(\d+)$/);
        if ( !parts ) {
            throw(`Invalid cell identifier: ${cell}`); 
        }
        
        const rowNum = parseInt( parts[2] );
        const colNum = SpreadSheet.letterToNumber( parts[1] );
        const colLetter = parts[1];

        return {
            rowNum,
            colNum,
            colLetter
        }
    }
}

export enum CellType {
  boolean = 'b',
  date = 'd',
  error = 'e',
  number = 'n',
  inlineStr = 'inlineStr',
  sharedString = 's',
  str = 'str',
  function = 'f'
}