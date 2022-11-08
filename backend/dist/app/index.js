"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../../lib/xlsx_parser/dist");
const axios = require('axios');
async function main() {
    const sampleFile = 'https://raw.githubusercontent.com/hey-tony/node-93zj7w/main/sample/sample.xlsx';
    const response = await axios({
        method: 'get',
        url: sampleFile,
        responseType: 'stream'
    });
    const stream = response.data;
    const { sheets, sharedStrings } = await new dist_1.default().parse(stream);
    sheets.forEach(sheet => {
        let { mergedCells } = sheet;
        mergedCells = mergedCells.map(cell => {
            const sharedString = 'ss';
            const { content } = cell;
            const isString = typeof content === 'string';
            const isSharedString = isString && content.startsWith(sharedString);
            if (isSharedString) {
                const delimiter = '|';
                const indexPos = 1;
                const stringIndex = parseInt(content.split(delimiter)[indexPos]);
                cell.content = sharedStrings[stringIndex];
            }
            return cell;
        });
        console.log(`\n\nWorksheet: ${sheet.name}`);
        console.log('-------------------------\n');
        console.log('  Merged cells:');
        for (let cell of mergedCells) {
            console.log();
            console.log(`    >> Range: ${cell.range.text}`);
            console.log(`       Content: ${cell.content || 'empty'}`);
            console.log(`       Height: ${cell.height || 'default'}`);
            console.log(`       Width: ${cell.width || 'default'}`);
        }
    });
}
main();
