
export class SpreadSheet {

    /**
     * Converts the letter coordinate of a cell into the
     * cell number. (i.e, BA returns 53)
     * @param {string} letter - Cell letter coordinate
     * @returns {number} Cell number
     */
    static letterToNumber( letter: string ): number {
        const A = 65;
        const letterRange = 26;
        const chars = letter.split('');
        return chars
            .map( char => char.charCodeAt(0) - A + 1 )
            .reverse()
            .map( (char, index) => char * letterRange**index )
            .reduce( (acc,val) => acc + val, 0);
    }

    /**
     * Converts the cell number into the letter coordinate.
     * (i.e, 53 returns BA)
     * @param {number} cellNum - Cell number
     * @returns {string} Cell letter
     */
    static numberToLetter ( cellNum: number ): string {
        const letterRange = 26;
        const A = 65;
        let num = cellNum;
        let letters: string[] = [];
        while ( num > 0 ) {
            let index = ( num - 1 ) % letterRange; 
            letters.push( String.fromCharCode( index + A ) );
            num = Math.floor( ( num - 1 ) / letterRange );
        }
        return letters.reverse().join('');
    }
}