export declare class SpreadSheet {
    /**
     * Converts the letter coordinate of a cell into the
     * cell number. (i.e, BA returns 53)
     * @param {string} letter - Cell letter coordinate
     * @returns {number} Cell number
     */
    static letterToNumber(letter: string): number;
    /**
     * Converts the cell number into the letter coordinate.
     * (i.e, 53 returns BA)
     * @param {number} cellNum - Cell number
     * @returns {string} Cell letter
     */
    static numberToLetter(cellNum: number): string;
}
